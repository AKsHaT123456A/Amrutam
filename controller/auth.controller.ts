import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { IPatient, Patient } from "../models/Patient.models";
import { roleModel } from "../utils/role";

// Register Route
export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role } = req.body;

  if (!email || !password || !firstName || !lastName || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userModel  = roleModel(role);
    const existingUser = await (roleModel(role) as typeof Patient).findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ ...req.body, password: hashedPassword });
    await newUser.save();

    // Automatically log in the user after registration
    req.login(newUser as IPatient, (err) => {
      if (err) {
        console.log(err);

        return res
          .status(500)
          .json({
            message: "Registration successful, but login failed",
          });
      }
      return res
        .status(201)
        .json({ message: "Registration and login successful" ,id:newUser._id});
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// Login Route
export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: Error, user: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: "Login failed" });
    }

    // Manually log in the user
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }

      return res.status(200).json({ message: "Login successful",caretaker:user.caretaker });
    });
  })(req, res, next);
};

// Logout Route
export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    return res.status(200).json({ message: "Logout successful" });
  });
};
