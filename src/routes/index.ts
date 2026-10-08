import express, { type Request, type Response } from "express";

import userRouter from "./user";
import productsRouter from "./products";
import "../strategies/local-strategy";

import { prisma } from "../lib/prisma";

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

appRouter.get("/api/status", (req: Request, res: Response) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    if (err) {
      console.error("Error retrieving session:", err);
      return res.status(500).send({ msg: "Internal server error." });
    }
  });
  return req.session.user
    ? res
        .status(200)
        .send({ msg: "User is authenticated.", user: req.session.user })
    : res.status(401).send({ msg: "User is not authenticated." });
});

appRouter.post("/api/cart", (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).send({ msg: "User is not authenticated." });
  }

  const { productId, quantity } = req.body;
  const { cart } = req.session;

  if (cart) {
    cart.push({ productId, quantity });
  } else {
    req.session.cart = [{ productId, quantity }];
  }

  return res.status(201).send({
    msg: "Product added to cart.",
    cart: req.session.cart,
  });
});

appRouter.get("/api/cart", async (req: Request, res: Response) => {
  if (!req.session.user) {
    const user = await prisma.user.findMany({});
    return res.status(401).send({ msg: "User is not authenticated." });
  }

  const { cart } = req.session;

  return res.status(200).send({
    msg: "Cart retrieved successfully.",
    cart: cart || [],
  });
});
export default appRouter;
