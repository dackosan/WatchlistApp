import { useEffect, useState, useContext } from "react";
import { getWatchlist, removeFromWatchlist } from "../api/watchlist";
import { AuthContext } from "../context/authContext";

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
  }, []);

  const fetchWatchlist = async () => {
    if (!auth?.token) return;
    try {
      const res = await getWatchlist(auth.token);
      setWatchlist(res.data);
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
    <div>
      <h1>Saját Watchlist</h1>
      {watchlist.length === 0 && <p>Nincs film a watchlistben.</p>}
      <ul>
        {watchlist.map((item) => (
          <li key={item.id}>
            <strong>{item.movie.title}</strong> ({item.movie.year}) -{" "}
            {item.movie.genre}
            <button onClick={() => handleRemove(item.id)}>Törlés</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
