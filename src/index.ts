import express, { type Request, type Response } from "express";

import { query, validationResult } from "express-validator";

import router from "./routes/user";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", router);

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
