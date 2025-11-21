import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

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
    if (auth) {
      auth.logout();
      navigate("/login");
    }
  };

  return (
    <nav
      style={{
        padding: "1rem 2rem",
        backgroundColor: "#6200ee",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link
          to="/movies"
          style={{ marginRight: "1rem", color: "#fff", textDecoration: "none" }}
        >
          Filmek
        </Link>
        <Link to="/watchlist" style={{ color: "#fff", textDecoration: "none" }}>
          Watchlist
        </Link>
      </div>

      {auth?.token && (
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#fff",
            color: "#6200ee",
            border: "none",
            padding: "0.3rem 0.8rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}
