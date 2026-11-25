import express, { type Request, type Response } from "express";

import userRouter from "./user";
import productsRouter from "./products";
import "../strategies/local-strategy";
import authRouter from "./authRouter";

const appRouter = express.Router();

appRouter.use("/api/users", userRouter);
appRouter.use("/api/products", productsRouter);
appRouter.use("/api/auth", authRouter);

appRouter.get("/", (req, res) => {
  res.cookie("sessionId", "Nawram@154", {
    httpOnly: true,
    secure: true,
    signed: true,
  });
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
