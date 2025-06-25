import React, { useState } from "react";

export default function ReviewForm({ bookingId, onReviewSubmitted }) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ comment: text, booking_id: bookingId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit review");
      }
      setText("");
      onReviewSubmitted && onReviewSubmitted();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        required
        placeholder="Write your comment..."
        style={{ width: "100%", minHeight: 60 }}
        disabled={submitting}
      />
      <button type="submit" style={{ marginTop: 8 }} disabled={submitting || !text.trim()}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
    
  );
}