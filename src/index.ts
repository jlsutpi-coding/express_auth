import express from "express";
import cookieParser from "cookie-parser";

import appRouter from "./routes";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser("SutPi@154"));

app.use(express.json());

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
