import express, { type Request, type Response } from "express";

const productsRouter = express.Router();

productsRouter.get("/", (req: Request, res: Response) => {
  console.log(req.signedCookies);
  console.log(req.headers.cookie);

  if (
    req.signedCookies.sessionId &&
    req.signedCookies.sessionId === "Nawram@154"
  )
    return res.status(200).send([
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ]);

  return res.status(401).send({
    msg: "Unauthorized access. Please provide a valid sessionId cookie.",
  });
});

export default productsRouter;
