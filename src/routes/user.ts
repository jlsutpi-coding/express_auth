import express, { type Request, type Response } from "express";
import { createUserValidationSchema } from "../util/validationSchema";
import {
  checkSchema,
  matchedData,
  validationResult,
  query,
} from "express-validator";
import { prisma } from "../lib/prisma";
import { mockUsers } from "../util/constants";

const userRouter = express.Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send({ msg: "User route is working!" });
});

userRouter.get(
  "",

  query("filter").isString().notEmpty(),
  (req: Request<{ filter: string }>, res: Response) => {
    const { filter } = req.query;

    const results = validationResult(req);
    return res.status(200).send({ msg: `Filter applied: ${filter}` });
  },
);

userRouter.post(
  "",
  checkSchema(createUserValidationSchema),

  async (req: Request, res: Response) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(400).json({ errors: results.array() });
    }

    const data = matchedData(req);

    try {
      const createdUsers = await prisma.user.createMany({
        data: [...mockUsers],
      });

      console.log("Created users:", createdUsers);
      return res
        .status(201)
        .send({ msg: `User created: ${createdUsers.count}` });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).send({ msg: "Internal server error." });
    }
  },
);
export default userRouter;
