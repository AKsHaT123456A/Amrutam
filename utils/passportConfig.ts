import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Patient, IPatient } from "../models/Patient.models";
import bcrypt from "bcrypt";
import { roleModel } from "./role";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      const { role, id } = req.body;

      try {
        const user = await (roleModel(role) as typeof Patient)
          .findOne({ email })
          .select("+password +caretaker");
        if (role === "careTaker") {
          
          const caretakerId = user?.id;
          const [updatedPatient, foundPatient] = await Promise.all([
            Patient.findByIdAndUpdate(id, {
              $addToSet: { caretaker: caretakerId },
            }),
            Patient.findById(id).populate({
              path: "caretaker",
              select: "firstName lastName email phone schedule priority",
            }),
          ]);
          return done(null, foundPatient || false);
        }

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: IPatient, done) {
  done(null, user);
});

declare global {
  namespace Express {
    interface User extends IPatient {}
    interface Request {
      user?: IPatient;
    }
  }
}
