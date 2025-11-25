import db from "./database.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  )`
).run();

export const getUsers = () => db.prepare("SELECT * FROM users").all();

export const getUserById = (id) =>
  db.prepare("SELECT * FROM users WHERE id = ?").get(id);

export const getUserByEmail = (email) =>
  db.prepare("SELECT * FROM users WHERE email = ?").get(email);

export const saveUser = (email, password, role = "user") =>
  db
    .prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)")
    .run(email, password, role);

export const updateUser = (id, email, password, role = "user") =>
  db
    .prepare("UPDATE users SET email = ?, password = ?, role = ? WHERE id = ?")
    .run(email, password, role, id);

export const deleteUser = (id) =>
  db.prepare("DELETE FROM users WHERE id = ?").run(id);
