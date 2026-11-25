import express, { type Request, type Response } from "express";

import { createUserValidationSchema } from "../util/validationSchema";

import { checkSchema, matchedData, validationResult } from "express-validator";

import { hashPassword } from "../util/helpers";

import { prisma } from "../lib/prisma";

const authRouter = express.Router();

authRouter.post(
  "/register",
  checkSchema(createUserValidationSchema),

  async (req: Request, res: Response) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(400).json({ errors: results.array() });
    }

    const { password, username, displayName } = matchedData(req) as {
      username: string;
      displayName?: string;
      password: string;
    };

    try {
      const hashedPassword = hashPassword(password);
      console.log("Hashed user:", hashedPassword);
      const createdUsers = await prisma.user.create({
        data: {
          username,
          displayName: displayName ?? null,
          password: hashedPassword,
        },
        select: { id: true, username: true, displayName: true },
      });

      console.log("Created user:", createdUsers);
      return res.status(201).send({ msg: `User created: ${createdUsers.id}` });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).send({ msg: "Internal server error." });
    }
  },
);

export default authRouter;
