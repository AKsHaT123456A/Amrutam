import express from "express";
import { getDetails, login, register } from "../controller/auth.controller";
const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/details/:id", getDetails);

export default authRoute;
