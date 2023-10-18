import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPatient extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  caretaker: Types.ObjectId[]; 
}

const patientSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  caretaker: [
    {
      type: Schema.Types.ObjectId,
      ref: "CareTaker",
    },
  ],
});

export const Patient = mongoose.model<IPatient>("Patient", patientSchema);
