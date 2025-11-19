import express from "express";
import cors from "cors";

import "./data/movie.js";
import "./data/user.js";
import "./data/watchlist.js";

import moviesRouter from "./routes/moviesRoutes.js";
import authRouter from "./routes/authRoutes.js";
import watchlistRouter from "./routes/watchlistRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);
app.use("/api/auth", authRouter);
app.use("/api/watchlist", watchlistRouter);

app.listen(3000, () => console.log("Server running on 3000"));
