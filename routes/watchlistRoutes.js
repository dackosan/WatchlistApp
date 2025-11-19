import { Router } from "express";
import {
  getWatchlistByUser,
  saveWatchlist,
  deleteWatchlist,
} from "../data/watchlist.js";

const router = Router();

router.get("/", (req, res) => {
  const userId = req.query.userId;
  const list = getWatchlistByUser(userId);
  res.json(list);
});

router.post("/", (req, res) => {
  const { userId, movieId } = req.body;

  try {
    saveWatchlist(userId, movieId);
    res.json({ message: "Added to watchlist" });
  } catch (err) {
    res.status(400).json({ error: "Already in watchlist" });
  }
});

router.delete("/:id", (req, res) => {
  deleteWatchlist(req.params.id);
  res.json({ message: "Removed from watchlist" });
});

export default router;
