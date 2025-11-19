import { Router } from "express";
import {
  getWatchlistByUser,
  saveWatchlist,
  deleteWatchlist,
} from "../data/watchlist.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const list = getWatchlistByUser(userId);
  res.json(list);
});

router.post("/", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { movieId } = req.body;

  try {
    saveWatchlist(userId, movieId);
    res.json({ message: "Added to watchlist" });
  } catch (err) {
    res.status(400).json({ error: "Already in watchlist" });
  }
});

router.delete("/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  deleteWatchlist(id);
  res.json({ message: "Removed from watchlist" });
});

export default router;
