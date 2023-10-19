import express from "express";
import { login, register } from "../controller/auth.controller";
const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);

export default authRoute;