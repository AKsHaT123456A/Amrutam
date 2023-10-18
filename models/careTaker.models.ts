import mongoose, { Schema, Document } from "mongoose";

export interface ICareTaker extends Document {
  firstName: string;
  lastName: string;
  priority: string;
  schedule: string;
}

const careTakerSchema: Schema = new Schema({
  firstName: {
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
  lastName: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  }
});

export const CareTaker = mongoose.model<ICareTaker>(
  "CareTaker",
  careTakerSchema
);
