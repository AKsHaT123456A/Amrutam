import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { roleModel } from "../utils/role.utils";
import { JWT_SECRET, TOKEN_EXPIRATION } from "../utils/constants.utils";
import { Patient } from "../models/Patient.models";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } =
      req.body;

    if (!email || !password || !firstName || !lastName || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userModel = roleModel(role);
    const existingUser = await (userModel as typeof Patient).findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();
    const id = newUser._id;
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    return res
      .status(201)
      .json({ message: "Registration successful", token, id });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ message: "Registration failed", err: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { phone, password, role } = req.body;

    if (!phone || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const userModel = roleModel(role);

    const user = await (userModel as typeof Patient).findOne({ phone });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const id = user._id;
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    return res.status(200).json({ message: "Login successful", token, id });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
