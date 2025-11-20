import axios from "axios";

const API_URL = "http://localhost:3000/api/watchlist";

export const getWatchlist = (token: string) =>
  axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });

export const addToWatchlist = (token: string, movieId: number) =>
  axios.post(
    API_URL,
    { movieId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const removeFromWatchlist = (token: string, watchlistId: number) =>
  axios.delete(`${API_URL}/${watchlistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
