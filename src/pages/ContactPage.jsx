import React, { useState } from "react";
import "../styles/ContactPage.css"; // 👈 new CSS file (see below)

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;

    if (!name || !email || !message) {
      setError("⚠️ Please fill out all fields.");
      return;
    }

    setError("");
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">📬 Contact Us</h1>
        <p className="contact-subtitle">
          Have questions or feedback? We’d love to hear from you.
        </p>

        {error && <p className="error-message">{error}</p>}
        {submitted && (
          <p className="success-message">
            ✅ Thank you! Your message was sent (demo only).
          </p>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows="5"
            />
          </div>

          <button className="contact-btn" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
