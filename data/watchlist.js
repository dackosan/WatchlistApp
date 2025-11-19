import db from "./database.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS watchlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    movieId INTEGER NOT NULL,
    UNIQUE(userId, movieId),
    FOREIGN KEY(userId) REFERENCES users(id),
    FOREIGN KEY(movieId) REFERENCES movies(id)
  )`
).run();

export const getWachtlists = () => db.prepare("SELECT * FROM watchlist").all();

export const getWatchlistByUser = (userId) =>
  db.prepare("SELECT * FROM watchlist WHERE userId = ?").all(userId);

export const getWatchlistByMovie = (movieId) =>
  db.prepare("SELECT * FROM watchlist WHERE movieId = ?").all(movieId);

export const saveWatchlist = (userId, movieId) =>
  db
    .prepare("INSERT INTO watchlist (userId, movieId) VALUES (?, ?)")
    .run(userId, movieId);

export const deleteWatchlist = (id) =>
  db.prepare("DELETE FROM watchlist WHERE id = ?").run(id);
