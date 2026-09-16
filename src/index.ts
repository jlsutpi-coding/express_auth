import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import appRouter from "./routes";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser("SutPi@154"));
app.use(
  session({
    secret: "Nawram@1542003",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  }),
);
app.use(express.json());

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
