import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Patient } from "../models/Patient.models";
import { JWT_SECRET } from "./constants";
import bcrypt from "bcrypt";

// Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await Patient.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(user.password, password);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);


// JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (jwtPayload: { id: string }, done: (error: Error | null, user: any | false) => void) => {
      Patient.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((error) => {
          return done(error, false);
        });
    }
  )
);

