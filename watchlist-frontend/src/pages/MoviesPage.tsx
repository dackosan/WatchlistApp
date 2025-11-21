import { useEffect, useState, useContext } from "react";
import { getMovies } from "../api/movies";
import { addToWatchlist } from "../api/watchlist";
import { AuthContext } from "../context/authContext";

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToWatchlist = async (movieId: number) => {
    if (!auth?.token) return alert("Jelentkezz be!");

    try {
      await addToWatchlist(auth.token, movieId);
      alert("Hozzáadva a watchlisthez!");
    } catch (err: any) {
      alert(err.response?.data?.error || "Hiba a hozzáadásnál");
    }
  };

  return (
    <div className="container">
      <h1>Filmek</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> ({movie.year}) - {movie.genre}{" "}
            <button onClick={() => handleAddToWatchlist(movie.id)}>
              Hozzáadás a watchlisthez
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
