import express, { Request, Response } from "express";
import passport from "passport";
import session from "express-session";
import compression from "compression";
import { connect } from "./connection/db";
import { SECRET_KEY } from "./utils/constants";
import authRoutes from "./route/auth.routes";
const app = express();

app.use(express.json());

app.use(
  session({ secret: SECRET_KEY, resave: false, saveUninitialized: true })
);
app.use(compression());
app.use(passport.initialize());
app.use(passport.session());
import "./utils/passportConfig";
app.get("/", (req: Request, res: Response) => {
  res.send("Hello,Patient");
});

app.use("/api/v1", authRoutes);

connect(app);
