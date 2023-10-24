import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISchedule extends Document {
  startDate: string;
  endDate: string;
  time: string[];
  medicineName: string;
  description: string;
}

const scheduleSchema: Schema = new Schema({
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  time: {
    type: Array,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  medicineName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Schedule = mongoose.model<ISchedule>("Schedule", scheduleSchema);
