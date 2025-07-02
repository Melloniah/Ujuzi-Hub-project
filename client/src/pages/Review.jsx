import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import { useTheContext } from "../context/Provider";

export default function ReviewPage() {
  const { id: fundiId } = useParams();
  const { user } = useTheContext();
  const navigate = useNavigate();
  const location = useLocation();
  const editingReview = location.state?.review || null;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews for this fundi
  async function fetchReviews() {
    setLoading(true);
    try {
      const res = await fetch(`/fundis/${fundiId}/reviews`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      setReviews([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchReviews();
  }, [fundiId]);

  // Add review
  async function handleAdd(text) {
    setSubmitting(true);
    try {
      const res = await fetch("/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: text, fundi_id: fundiId, user_id: user.id }),
      });
      if (res.ok) {
        await fetchReviews();
        navigate(`/fundi/${fundiId}`); // Go back to detail after submit
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Update review
async function handleUpdate({ id, text }) {
  setSubmitting(true);
  try {
    const res = await fetch(`/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: text }),
    });
    if (res.ok) {
      await fetchReviews();
      navigate(`/fundi/${fundiId}`); // go back after update
    }
  } finally {
    setSubmitting(false);
  }
}


  // Delete review
  async function handleDelete(id) {
    if (!window.confirm("Delete this comment?")) return;
    setSubmitting(true);
    try {
      await fetch(`/reviews/${id}`, { method: "DELETE" });
      await fetchReviews();
      navigate(`/fundi/${fundiId}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>{editingReview ? "Edit Your Review" : "Add a Review for this Fundi"}</h1>
      <ReviewForm
        editingReview={editingReview}
        onSubmit={editingReview ? (text) => handleUpdate({ id: editingReview.id, text }) : handleAdd}
        submitting={submitting}
        onDelete={editingReview ? () => handleDelete(editingReview.id) : null}
        onCancel={() => navigate(`/fundi/${fundiId}`)}
      />
      <hr />
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <ReviewList
          reviews={reviews}
          onEdit={(review) => navigate(`/fundi/${fundiId}/review`, { state: { review } })}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}