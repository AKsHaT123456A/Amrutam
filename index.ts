import express, { Request, Response } from "express";
import passport from "passport";
import compression from "compression";
import cors from "cors";
import { connect } from "./connection/db";
import authRoutes from "./route/auth.routes";
import careTakerRoute from "./route/careTaker.routes";
const app = express();

app.use(express.json());

app.use(cors());
app.use(compression());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello,Patient");
});

app.use("/api/v1/auth/patient", authRoutes);
app.use("/api/v1/auth/caretaker", careTakerRoute);

connect(app);
