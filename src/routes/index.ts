import express from "express";
import userRouter from "./user";
import productsRouter from "./products";

const appRouter = express.Router();

appRouter.use("/api/users", userRouter);
appRouter.use("/api/products", productsRouter);

appRouter.get("/", (req, res) => {
  res.cookie("sessionId", "Nawram@154", {
    httpOnly: true,
    secure: true,
    signed: true,
  });
  res.status(200).send({ msg: "Welcome to the API!" });
});

export default appRouter;
