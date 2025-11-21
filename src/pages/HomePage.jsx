import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../styles/HomePage.css";

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-container">
      <h1 className="home-title">WELCOME TO MY BLOG</h1>

      <p className="home-description">
        Discover posts, explore ideas, and share your thoughts.
      </p>

      {!isAuthenticated && (
        <Link to="/login" className="home-login-btn">
          Login
        </Link>
      )}

      {isAuthenticated && (
        <p className="home-user">Logged in as <strong>{user.username}</strong></p>
      )}
    </div>
  );
}
