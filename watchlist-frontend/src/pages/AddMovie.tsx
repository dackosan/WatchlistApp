import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../api/movies";
import { toast } from "react-toastify";

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addMovie(title, year, genre);
      toast.success("Movie added successfully!");
      navigate("/movies");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to add movie");
    }
  };

  return (
    <div className="page-center">
      <div className="container">
        <h1>Add Movie</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
}
