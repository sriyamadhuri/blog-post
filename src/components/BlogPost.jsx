import { useState } from "react";
import CommentBox from "./CommentBox";
import "../styles/BlogPost.css";

export default function BlogPost({ post }) {
  const [likes, setLikes] = useState(0);

  return (
    <article className="blog-post">
      <h2>{post.title}</h2>
      <p className="date">Published on: {post.date}</p>
      <p className="content">{post.content}</p>
      <p className="author">– {post.author}</p>

      <button className="like-btn" onClick={() => setLikes(likes + 1)}>
        ❤️ Like ({likes})
      </button>

      <CommentBox />
    </article>
  );
}
