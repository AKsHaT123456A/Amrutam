import { Request, Response } from "express";
import { Patient } from "../models/Patient.models";
import { CareTaker } from "../models/careTaker.models";

const addCareTaker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const careTaker = await CareTaker.create(req.body);
console.log(careTaker);

    const p =await Patient.findByIdAndUpdate(id, {
      $addToSet: { caretaker: careTaker._id },
    });
console.log(p);

    const careTakerIn = await Patient.findById(id).populate({
      path: "caretaker",
      select: "firstName lastName priority schedule email phone -_id",
    });
console.log(careTakerIn);

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
