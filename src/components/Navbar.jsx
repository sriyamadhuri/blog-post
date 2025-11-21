import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/authContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      
      <div className="nav-left">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>

      <div className="nav-right">
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {isAuthenticated ? (
          <>
            <span>Hi, {user?.username}</span>
            <button className="auth-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className="auth-btn">Login</NavLink>
        )}
      </div>

    </nav>
  );
}