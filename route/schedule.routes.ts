import express from "express";
import { addSchedule, getSchedule } from "../controller/schedule.controllers";
const scheduleRoute = express.Router();

scheduleRoute.post("/addSchedule/:id", addSchedule);
scheduleRoute.post("/getSchedule/:id", getSchedule);

export default scheduleRoute;