import mongoose from "mongoose";
import express from "express";
import { DbCon, PORT } from "../utils/constants"; // Update the import for PORT

let isConnected: boolean = false;

export async function connect(app: express.Application): Promise<void> {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(DbCon);

    isConnected = true;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
