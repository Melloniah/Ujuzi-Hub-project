import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ReviewForm({ onReviewSubmitted, bookingId }) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/services`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);

    try {
      const res = await fetch("/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: text,
          booking_id: bookingId, // must be valid!
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit review");
      }

      setText("");
      if (onReviewSubmitted) onReviewSubmitted();
      alert("Review submitted!");
      navigate("/services");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          placeholder="Write your review..."
          style={{ width: "100%", minHeight: 60 }}
          disabled={submitting}
        />
        <button type="submit" style={{ marginTop: 8 }} disabled={submitting || !text.trim()}>
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
      <button onClick={handleNavigate}>Back to services</button>
    </>
  );
}

export default ReviewForm;