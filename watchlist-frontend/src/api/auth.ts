import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const register = (email: string, password: string) =>
  axios.post(`${API_URL}/register`, { email, password });

export const login = (email: string, password: string) =>
  axios.post(`${API_URL}/login`, { email, password });
