import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./navbar.css";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/"
  ) {
    return null;
  }

  const handleLogout = () => {
    auth?.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/movies">Films</Link>
        <Link to="/watchlist">Watchlist</Link>
      </div>

      {auth?.token && (
        <div className="navbar-right">
          <span className="navbar-email">Email: {auth.email}</span>
          <button className="navbar-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </nav>
  );
}
