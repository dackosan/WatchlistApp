import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./navbar.css";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
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

        {auth?.token && <Link to="/watchlist">Watchlist</Link>}
      </div>

      <div className="navbar-right">
        {/* NOT LOGGED IN */}
        {!auth?.token && (
          <>
            <Link className="navbar-btn" to="/login">
              Login
            </Link>
            <Link className="navbar-btn" to="/register">
              Register
            </Link>
          </>
        )}

        {/* LOGGED IN */}
        {auth?.token && (
          <>
            <span className="navbar-email">Email: {auth.email}</span>

            <button className="navbar-logout" onClick={handleLogout}>
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
