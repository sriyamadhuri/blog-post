import { useState } from "react";
import "../styles/CommentBox.css";

export default function CommentBox() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    "Great post!",
    "Very informative.",
    "Loved reading this!"
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="comment-box">
      <h4>Comments</h4>
      <ul>
        {comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
