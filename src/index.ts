import express from "express";

import appRouter from "./routes";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
