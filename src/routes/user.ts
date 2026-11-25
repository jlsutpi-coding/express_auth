import express, { type Request, type Response } from "express";
import { createUserValidationSchema } from "../util/validationSchema";
import {
  checkSchema,
  matchedData,
  validationResult,
  query,
} from "express-validator";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../util/helpers";

const userRouter = express.Router();

userRouter.get(
  "/",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Filter is required")
    .isLength({ min: 3, max: 10 })
    .withMessage("Filter must be between 3 and 10 characters long"),
  (req: Request, res: Response) => {
    console.log(req.session.id);

    req.sessionStore.get(req.session.id, (err, sessionData) => {
      if (err) {
        console.error("Error retrieving session:", err);
        throw err;
      }
      console.log("Inside session store get ");
      console.log(sessionData);
    });
    res.status(200).send({ msg: "User route is working!" });
  },
);

userRouter.get(
  "",

  query("filter").isString().notEmpty(),
  (req: Request<{ filter: string }>, res: Response) => {
    const { filter } = req.query;

    const results = validationResult(req);
    return res.status(200).send({ msg: `Filter applied: ${filter}` });
  },
);

export default userRouter;
