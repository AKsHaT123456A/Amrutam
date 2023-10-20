import { Request, Response } from "express";
import { Patient } from "../models/Patient.models";
import { CareTaker } from "../models/careTaker.models";

const addCareTaker = async (req: Request, res: Response) => {
  try {
    const { id } = req.body; // Use req.body to get the ID

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const careTaker = await CareTaker.create(req.body);

    await Patient.findByIdAndUpdate(id, {
      $addToSet: { careTakers: careTaker._id }, // Correct field name to 'careTakers'
    });

    const careTakerIn = await Patient.findById(id).populate({
      path: "careTakers",
      select: "firstName lastName priority schedule email phone -_id",
    });

    return res.status(201).json(careTakerIn);
  } catch (error) {
    console.error("Error in addCareTaker:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getCareTaker = async (req: Request, res: Response) => {
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

export { addCareTaker, getCareTaker };
