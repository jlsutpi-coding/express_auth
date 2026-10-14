// src/config/env.ts
import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  DISCORD_CLIENT_ID: z.string().min(1, "Discord Client ID is required"),
  DISCORD_CLIENT_SECRET: z.string().min(1, "Discord Client Secret is required"),
  DISCORD_CALLBACK_URL: z.string().url("Must be a valid callback URL"),
});

// Infer TypeScript type directly from the Zod schema
export type Env = z.infer<typeof envSchema>;

// Parse and export validated environment variables
export const env = envSchema.parse(process.env);
