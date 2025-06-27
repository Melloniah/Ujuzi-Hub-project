import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // to services (book fundi/ book now) - renders Fundicard

function ReviewForm({ onReviewSubmitted, bookingId }) { // bookingId from FundiDetails
  const { id: fundiId } = useParams(); // get fundi ID from URL
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate()

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
        credentials: "include", // only if needed for auth
        body: JSON.stringify({
          comment: text,
          booking_id: bookingId, // fundi_id: fundiId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit review");
      }

      setText("");
      onReviewSubmitted?.(); // refresh list or notify parent
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
