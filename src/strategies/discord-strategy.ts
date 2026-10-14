import passport from "passport";
import "dotenv/config";
import { Strategy as DiscordStrategy } from "passport-discord";
import { prisma } from "../lib/prisma";
import type { User } from "../../generated/prisma";
import { env } from "../config/env";

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
      clientID: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      callbackURL: env.DISCORD_CALLBACK_URL,
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
