import { useEffect, useState, useContext } from "react";
import { getWatchlist, removeFromWatchlist } from "../api/watchlist";
import { AuthContext } from "../context/authContext";
import { FaTimes } from "react-icons/fa";

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
}

interface WatchlistItem {
  id: number;
  movie: Movie;
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchWatchlist();
  }, [auth?.token]);

  const fetchWatchlist = async () => {
    if (!auth?.token) return;

    try {
      const res = await getWatchlist(auth.token);

      const formatted = res.data.map((item: any) => ({
        id: item.watchlistId,
        movie: {
          id: item.movieId,
          title: item.title,
          year: item.year,
          genre: item.genre,
        },
      }));

      setWatchlist(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (watchlistId: number) => {
    if (!auth?.token) return;

    try {
      await removeFromWatchlist(auth.token, watchlistId);
      setWatchlist(watchlist.filter((item) => item.id !== watchlistId));
    } catch (err: any) {
      alert(err.response?.data?.error || "Hiba a törlésnél");
    }
  };

  return (
    <div className="page container">
      <h1>Personal Watchlist</h1>
      {watchlist.length === 0 && <p>There is no film in your watchlist.</p>}

      <div className="movies-grid">
        {watchlist.map((item) => (
          <div className="movie-card" key={item.id}>
            <div className="movie-content">
              <h2>{item.movie.title}</h2>
              <p>
                {item.movie.year} - {item.movie.genre}
              </p>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleRemove(item.id)}
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
