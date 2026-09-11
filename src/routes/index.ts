import express from "express";
import userRouter from "./user";
import productsRouter from "./products";

const appRouter = express.Router();

appRouter.use("/api/users", userRouter);
appRouter.use("/api/products", productsRouter);

export default appRouter;
