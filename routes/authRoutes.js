import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByEmail, saveUser } from "../data/user.js";

const router = Router();
const JWT_SECRET = "supersecret";

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  const existing = getUserByEmail(email);
  if (existing) return res.status(400).json({ error: "Email already exists" });

  const hash = bcrypt.hashSync(password, 10);
  saveUser(email, hash);

  res.json({ message: "User registered" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = getUserByEmail(email);
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const match = bcrypt.compareSync(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

export default router;
