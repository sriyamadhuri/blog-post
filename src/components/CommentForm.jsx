import React, { useState } from "react";

export default function CommentForm({ onAddComment }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) return;

    onAddComment({ name, text: comment });
    setName("");
    setComment("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3>Leave a Comment</h3>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Comment:</label>
        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button type="submit" className="comment-btn">Submit</button>
    </form>
  );
}
