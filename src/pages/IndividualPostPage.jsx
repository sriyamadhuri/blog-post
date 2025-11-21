import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../styles/IndividualPostPage.css";

export default function IndividualPostPage() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const postRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const postData = await postRes.json();
        setPost(postData);

        const userRes = await fetch(
          `https://jsonplaceholder.typicode.com/users/${postData.userId}`
        );
        const userData = await userRes.json();
        setAuthor(userData);

        const commentsRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        const commentsData = await commentsRes.json();
        setComments(commentsData);

        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    setPosting(true);

    const newComment = {
      postId: id,
      name: user.username,
      body: comment,
      email: "user@blogapp.com",
    };

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      }
    );

    const data = await res.json();
    setComments([data, ...comments]);
    setComment("");
    setPosting(false);
  };

  if (loading)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading post...</p>
      </div>
    );

  return (
    <article className="post-detail">
      <Link to="/posts" className="back-link">
        ← Back to Posts
      </Link>

      <h2>{post.title}</h2>
      <p className="content">{post.body}</p>

      {author && (
        <div className="author-info">
          <h3>Author Details</h3>
          <p>
            <strong>Name:</strong> {author.name}
          </p>
          <p>
            <strong>Email:</strong> {author.email}
          </p>
          <p>
            <strong>Company:</strong> {author.company?.name}
          </p>
        </div>
      )}

      {/* COMMENTS */}
      <section className="comments-section">
        <h3>Comments</h3>

        {/* ✨ CONDITIONAL comment form based on login */}
        {isAuthenticated ? (
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={posting}
            />

            <button className="btn-primary" type="submit" disabled={posting}>
              {posting ? "Posting..." : "Post Comment"}
            </button>
          </form>
        ) : (
          <p className="login-msg">
            You must be <Link to="/login">logged in</Link> to comment.
          </p>
        )}

        {comments.length === 0 ? (
          <p>No comments yet. Be the first!</p>
        ) : (
          <ul className="comments-list">
            {comments.map((c) => (
              <li key={c.id} className="comment-item">
                <strong>{c.name}</strong>
                <p>{c.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
