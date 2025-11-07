import db from "./database";

db.prepare(
  "CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, year INTEGER, genre STRING)"
);

export const getMovies = () => db.prepare("SELECT * FROM movies").all();

export const getMovieById = (id) =>
  db.prepare("SELECT * FROM movies WHERE id = ?").get(id);

export const saveMovie = (title, year, genre) =>
  db
    .prepare("INSERT INTO movies (title, year, genre) VALUES (?, ?, ?)")
    .run(title, year, genre);

export const updateMovie = (id, title, year, genre) =>
  db
    .prepare("UPDATE movies SET title = ?, year = ?, genre =? WHERE id = ?")
    .run(title, year, genre, id);

export const deleteMovie = (id) =>
  db.prepare("DELETE FROM movies WHERE id = ?").run(id);
