import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTheContext } from "../context/Provider";

export default function ReviewForm() {
  const { id } = useParams(); // fundi id
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useTheContext();

  // If editing, review object is passed via state
  const editingReview = location.state?.review || null;

  const [text, setText] = useState(editingReview ? editingReview.comment : "");
  const [submitting, setSubmitting] = useState(false);

  // Submit add or edit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);

    try {
      if (editingReview) {
        // Update existing review
        const res = await fetch(`/reviews/${editingReview.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment: text }),
        });
        if (!res.ok) throw new Error("Failed to update");
        alert("Review updated!");
      } else {
        // Add new review
        const res = await fetch("/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment: text, fundi_id: id, user_id: user.id }),
        });
        if (!res.ok) throw new Error("Failed to submit");
        alert("Review submitted!");
      }
      navigate(`/fundi/${id}`);
    } catch (err) {
      alert(err.message || "Error submitting review");
    } finally {
      setSubmitting(false);
    }
  }

  // Delete review
  async function handleDelete() {
    if (!editingReview) return;
    if (!window.confirm("Are you sure you want to delete your review?")) return;

    try {
      const res = await fetch(`/reviews/${editingReview.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      alert("Review deleted!");
      navigate(`/fundi/${id}`);
    } catch (err) {
      alert(err.message || "Error deleting review");
    }
  }

  if (!user) {
    return (
      <div>
        <p>Please log in to add or edit reviews.</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingReview ? "Edit Your Review" : "Add a Review"}</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        disabled={submitting}
        placeholder="Write your review..."
        style={{ width: "100%", minHeight: 100 }}
      />
      <button type="submit" disabled={submitting || !text.trim()}>
        {submitting ? (editingReview ? "Updating..." : "Submitting...") : editingReview ? "Update Review" : "Submit Review"}
      </button>
      {editingReview && (
        <button type="button" onClick={handleDelete} disabled={submitting} style={{ marginLeft: 8 }}>
          Delete Review
        </button>
      )}
      <button type="button" onClick={() => navigate(`/fundi/${id}`)} style={{ marginLeft: 8 }}>
        Cancel
      </button>
    </form>
  );
}
