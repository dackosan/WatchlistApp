import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MoviesPage from "./pages/MoviesPage";
import WatchlistPage from "./pages/Watchlist";
import { useContext, type JSX } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import AddMovie from "./pages/AddMovie";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  if (!auth?.token) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />

      <Routes>
        <Route path="/movies" element={<MoviesPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <WatchlistPage />
            </ProtectedRoute>
          }
        />

        <Route path="/add-movie" element={<AddMovie />} />

        <Route path="*" element={<Navigate to="/movies" />} />
      </Routes>
    </>
  );
}

export default App;
