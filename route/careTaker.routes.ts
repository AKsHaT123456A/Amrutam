import express from "express";
import { addCareTaker, getCareTaker } from "../controller/careTaker.controller";
const careTakerRoute = express.Router();

careTakerRoute.post("/addCareTaker/:id", addCareTaker);
careTakerRoute.post("/getCareTaker/:id", getCareTaker);

export default careTakerRoute;