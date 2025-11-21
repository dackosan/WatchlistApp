import { useEffect, useState, useContext } from "react";
import { getMovies } from "../api/movies";
import { addToWatchlist } from "../api/watchlist";
import { AuthContext } from "../context/authContext";
import { FaHeart } from "react-icons/fa";

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
    <div className="page container">
      <h1>Filmek</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <div className="movie-content">
              <h2>{movie.title}</h2>
              <p>
                {movie.year} - {movie.genre}
              </p>
            </div>
            <button
              className="heart-btn"
              onClick={() => {
                handleAddToWatchlist(movie.id);
              }}
            >
              <FaHeart />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
