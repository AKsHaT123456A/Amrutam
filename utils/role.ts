import { CareTaker, ICareTaker } from "../models/careTaker.models";
import { Patient, IPatient } from "../models/Patient.models";

export const roleModel = (role: string) => {
  if (role === "Patient") return Patient;
  if (role === "careTaker") return CareTaker;

  throw new Error("Unknown role");
};
