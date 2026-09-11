import express, { type Request, type Response } from "express";
import { createUserValidationSchema } from "../util/validationSchema";
import {
  checkSchema,
  matchedData,
  validationResult,
  query,
} from "express-validator";

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
    console.log("Validation results:", results);
    return res.status(200).send({ msg: `Filter applied: ${filter}` });
  },
);

userRouter.post(
  "",
  checkSchema(createUserValidationSchema),

  (req: Request, res: Response) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(400).json({ errors: results.array() });
    }

    const data = matchedData(req);
    const { username, email } = data;
    return res.status(201).send({ msg: `User created: ${username}, ${email}` });
  },
);
export default userRouter;
