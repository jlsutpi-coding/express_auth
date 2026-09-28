import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { mockUsers } from "../util/constants";

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Deserializing user with ID:", id);
  try {
    const user = mockUsers.find((u) => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    console.log("Authenticating user with email:", email);
    try {
      const user = mockUsers.find((u) => u.email === email);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.password !== password) {
        throw new Error("Invalid password");
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);
