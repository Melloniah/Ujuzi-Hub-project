import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTheContext } from "../context/Provider";

export default function Review() {
  const { id: fundiId } = useParams();
  const { user } = useTheContext();
  const navigate = useNavigate();
  const location = useLocation();
  const editingReview = location.state?.review || null;
  const [comment, setComment] = useState(editingReview ? editingReview.comment : "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const method = editingReview ? "PATCH" : "POST";
    const url = editingReview
      ? `/reviews/${editingReview.id}`
      : "/reviews";
    const body = editingReview
      ? { comment }
      : { comment, fundi_id: fundiId, user_id: user.id };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setComment("");
      // Navigate back to FundiDetail and trigger refresh
      navigate(`/fundi/${fundiId}`, { state: { refresh: true } });
    } else {
      alert("Failed to submit review");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>{editingReview ? "Edit Your Review" : "Add a Review"}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          style={{ width: "100%", minHeight: 100 }}
          required
          disabled={loading}
        />
        <br />
        <button type="submit" disabled={loading || !comment.trim()}>
          {editingReview
            ? loading ? "Updating..." : "Update Review"
            : loading ? "Submitting..." : "Submit Review"}
        </button>
        <button type="button" onClick={() => navigate(`/fundi/${fundiId}`)} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      </form>
    </div>
  );
}