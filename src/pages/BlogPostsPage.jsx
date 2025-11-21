import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/BlogPostsPage.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/BlogPostsPage.css";

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const PROXY = "https://corsproxy.io/?";
  const API = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    fetch(`${PROXY}${API}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load posts.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="posts-page">
      <h1>Blog Posts</h1>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="post-card">
            <h3>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h3>
            <p>
              {post.body.length > 150 
                ? post.body.slice(0, 150) + "..." 
                : post.body}
            </p>
            <Link to={`/post/${post.id}`} className="read-more">
              Read full post →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
