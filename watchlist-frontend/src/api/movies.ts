import axios from "axios";

const API_URL = "http://localhost:3000/api/movies";

export const getMovies = () => axios.get(API_URL);

export const addMovie = (title: string, year: string | number, genre: string) =>
  axios.post(API_URL, { title, year, genre });
