import express, { Request, Response } from "express";
import compression from "compression";
import cors from "cors";
import { connect } from "./connection/db";
import authRoutes from "./route/auth.routes";
import careTakerRoute from "./route/careTaker.routes";
import scheduleRoute from "./route/schedule.routes";
const app = express();

app.use(express.json());

app.use(cors());
app.use(compression());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello,Patient");
});

app.use("/api/v1/auth/patient", authRoutes);
app.use("/api/v1/auth/caretaker", careTakerRoute);
app.use("/api/v1/schedule", scheduleRoute);

connect(app);
