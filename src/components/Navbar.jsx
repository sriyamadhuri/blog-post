import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* Home */}
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Home
      </NavLink>

      {/* Posts */}
      <NavLink
        to="/posts"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Posts
      </NavLink>

      {/* Contact Page */}
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Contact
      </NavLink>

      {/* Theme Toggle */}
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      {/* If logged in → show Logout */}
      {isAuthenticated ? (
        <>
          <span className="welcome-text">Hi, {user?.username}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        /* If not logged in → show Login */
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>
      )}
    </nav>
  );
}
