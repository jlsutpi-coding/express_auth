import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import appRouter from "./routes";
import passport from "passport";
import "./strategies/local-strategy";
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

app.use(passport.initialize());
app.use(passport.session());
app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.status(200).send({ msg: "Authentication successful.", user: req.user });
});

app.get("/api/auth/status", (req, res) => {
  console.log(req.user);
  console.log(req.session);
  if (req.isAuthenticated()) {
    res.status(200).send({ msg: "User is authenticated.", user: req.user });
  } else {
    res.status(401).send({ msg: "User is not authenticated." });
  }
});

app.post("/api/auth/logout", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "User is not authenticated." });
  }
  req.logout((err) => {
    if (err) {
      return res.status(500).send({ msg: "Error occurred while logging out." });
    }
    res.status(200).send({ msg: "User logged out successfully." });
  });
});

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
