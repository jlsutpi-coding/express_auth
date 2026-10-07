import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { mockUsers } from "../util/constants";
import { prisma } from "../lib/prisma";

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing user with ID:", id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: id as number },
    });
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("Authenticating user with username:", username);
    try {
      const user = await prisma.user.findFirst({
        where: { username },
      });
      if (!user) {
        return done(null, false, { message: "Invalid username or password." });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Invalid username or password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);
