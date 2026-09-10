import express, { type Request, type Response } from "express";
import { query, validationResult, body } from "express-validator";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello, World!" });
});

app.get(
  "/api/users",
  query("filter").isString().notEmpty(),
  (req: Request<{ filter: string }>, res: Response) => {
    const { filter } = req.query;

    const results = validationResult(req);
    console.log("Validation results:", results);
    return res.status(200).send({ msg: `Filter applied: ${filter}` });
  },
);

app.post(
  "/api/users",
  body("name").isString().notEmpty(),
  body("email").isEmail(),
  (req: Request, res: Response) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(400).json({ errors: results.array() });
    }

    const { name, email } = req.body;
    return res.status(201).send({ msg: `User created: ${name}, ${email}` });
  },
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
