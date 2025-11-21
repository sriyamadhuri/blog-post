import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";
import { AuthProvider } from "./context/authContext.jsx";

import "./styles/App.css";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="app">
      <Header />
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* NEW: Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* NEW: Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected: Posts List */}
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <BlogPostsPage />
              </ProtectedRoute>
            }
          />

          {/* Single Post */}
          <Route path="/post/:id" element={<IndividualPostPage />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
