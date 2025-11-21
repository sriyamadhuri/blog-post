import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/BlogPostsPage.css";

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch(API, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading posts:", err);

        // TRY AGAIN using backup CORS proxy
        try {
          const backup = await fetch(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(API)}`
          );
          const backupData = await backup.json();
          setPosts(backupData);
        } catch (e) {
          setError("Unable to load posts. Try again later.");
        }

        setLoading(false);
      }
    }

    loadPosts();
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
              {post.body.length > 150 ? post.body.slice(0, 150) + "..." : post.body}
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
