import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { prisma } from "../lib/prisma";
import type { User } from "../util/constants";

passport.serializeUser((user, done) => {
  const u = user as User;
  done(null, u.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id as string },
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
  new DiscordStrategy(
    {
      clientID: "1559224360768774355",
      clientSecret: "dySTvdiOBghnovqNrE1KpzvYaYuvykCX",
      callbackURL: "http://localhost:3000/api/auth/discord/redirect",
      scope: ["identify", "email", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1. Look for existing identity
        const existingIdentity = await prisma.socialIdentity.findUnique({
          where: {
            provider_providerId: {
              provider: "DISCORD",
              providerId: profile.id,
            },
          },
          include: { user: true },
        });

        if (existingIdentity) {
          return done(null, existingIdentity.user);
        }

        // 2. Create user + identity
        const newUser = await prisma.user.create({
          data: {
            username: profile.username,
            displayName: profile.global_name || profile.username,
            identities: {
              create: {
                provider: "DISCORD",
                providerId: profile.id,
              },
            },
          },
        });

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    },
  ),
);
