import express, { type Request, type Response } from "express";

import userRouter from "./user";
import authRouter from "./authRouter";

const appRouter = express.Router();

appRouter.use("/api/users", userRouter);
appRouter.use("/api/auth", authRouter);

appRouter.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to the API!" });
});

appRouter.get("/api/status", (req: Request, res: Response) => {
  return req.session.user
    ? res
        .status(200)
        .send({ msg: "User is authenticated.", user: req.session.user })
    : res.status(401).send({ msg: "User is not authenticated." });
});

export default appRouter;
