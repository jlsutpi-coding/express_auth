import express, { type Request, type Response } from "express";

const productsRouter = express.Router();

productsRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send([
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ]);
});

export default productsRouter;
