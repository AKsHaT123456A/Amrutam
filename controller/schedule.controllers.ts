import { Request, Response } from "express";
import { Patient } from "../models/Patient.models";
import { Schedule } from "../models/schedule.models.";

export const addSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, time, medicineName, description ,notType,phone,to} = req.body;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const schedule = await Schedule.create(req.body);
    await Patient.findByIdAndUpdate(id, {
      $addToSet: { schedule: schedule._id },
    });

    const careTakerIn = await Patient.findById(id).populate({
      path: "schedule",
      select: "startDate endDate time medicineName description-_id",
    });

    return res.status(201).json(careTakerIn);
  } catch (error) {
    console.error("Error in addCareTaker:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const careTaker = await Patient.findById(id).populate("caretaker");

    if (!careTaker) {
      return res.status(404).json({ error: "Patient not found" });
    }

    return res.status(200).json({ message: careTaker.caretaker });
  } catch (error) {
    console.error("Error in getCareTaker:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

