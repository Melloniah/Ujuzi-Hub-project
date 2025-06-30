import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

export default function ReviewPage() {
  const { id: fundiId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState({ id: null, comment: "" });

  // Fetch reviews for this fundi
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/fundis/${fundiId}/reviews`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      setReviews([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [fundiId]);

  // Add new review
  const handleAdd = async (text) => {
    setSubmitting(true);
    try {
      const res = await fetch("/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: text, fundi_id: fundiId }),
      });
      if (res.ok) {
        await fetchReviews();
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Edit review
  const handleEdit = (review) => {
    setEditing({ id: review.id, comment: review.comment });
  };

  // Update review
  const handleUpdate = async (text) => {
    setSubmitting(true);
    try {
      await fetch(`/reviews/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: text }),
      });
      setEditing({ id: null, comment: "" });
      await fetchReviews();
    } finally {
      setSubmitting(false);
    }
  };

  // Delete review
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this comment?")) return;
    setSubmitting(true);
    try {
      await fetch(`/reviews/${id}`, { method: "DELETE" });
      await fetchReviews();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>Add a Review for this Fundi</h1>
      {editing.id ? (
        <ReviewForm
          onSubmit={handleUpdate}
          submitting={submitting}
          initialValue={editing.comment}
          editMode={true}
          onCancel={() => setEditing({ id: null, comment: "" })}
        />
      ) : (
        <ReviewForm
          onSubmit={handleAdd}
          submitting={submitting}
          editMode={false}
        />
      )}
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <ReviewList
          reviews={reviews}
          onEdit={handleEdit}
          onDelete={handleDelete}
          editingId={editing.id}
        />
      )}
    </div>
  );
}