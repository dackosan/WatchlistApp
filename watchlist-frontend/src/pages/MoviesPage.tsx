import { useEffect, useState, useContext } from "react";
import { getMovies } from "../api/movies";
import { addToWatchlist } from "../api/watchlist";
import { AuthContext } from "../context/authContext";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

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
      toast.error("Failed to load movies!");
    }
  };

  const handleAddToWatchlist = async (movieId: number) => {
    if (!auth?.token) {
      toast.warn("Please log in first!");
      return;
    }

    try {
      await addToWatchlist(auth.token, movieId);
      toast.success("Added to watchlist!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to add to watchlist");
    }
  };

  return (
    <div className="page container">
      <h1>Films</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <div className="movie-content">
              <h2>{movie.title}</h2>
              <p>
                {movie.year} - {movie.genre}
              </p>
            </div>
            {auth?.token && (
              <button
                className="heart-btn"
                onClick={() => handleAddToWatchlist(movie.id)}
              >
                <FaHeart />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
