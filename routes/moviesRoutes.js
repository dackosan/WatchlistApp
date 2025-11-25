import { Router } from "express";
import {
  getMovies,
  getMovieById,
  saveMovie,
  updateMovie,
  deleteMovie,
} from "../data/movie.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(getMovies());
});

router.get("/:id", (req, res) => {
  const movie = getMovieById(req.params.id);
  if (!movie) return res.status(404).json({ error: "Movie not found" });
  res.json(movie);
});

router.post("/", (req, res) => {
  const { title, year, genre } = req.body;

  if (!title || !year || !genre) {
    return res.status(400).json({ error: "Missing fields" });
  }

  saveMovie(title, year, genre);

  res.json({ message: "Movie added" });
});

/*router.put("/:id", (req, res) => {
  const { title, year, genre } = req.body;
  const id = req.params.id;

  const movie = getMovieById(id);
  if (!movie) return res.status(404).json({ error: "Movie not found" });

  updateMovie(id, title, year, genre);

  res.json({ message: "Movie updated" });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const movie = getMovieById(id);
  if (!movie) return res.status(404).json({ error: "Movie not found" });

  deleteMovie(id);

  res.json({ message: "Movie deleted" });
});*/

export default router;
