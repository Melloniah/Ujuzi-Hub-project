import React from "react";

export default function ReviewList({ reviews, onEdit, onDelete, editingId }) {
  if (!reviews.length) return <p>No comments yet.</p>;
  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {reviews.map((review) => (
        <li key={review.id} style={{ marginBottom: 16, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
          <div>
            <strong>Comment:</strong>
            <div>{review.comment}</div>
            <small>{new Date(review.createdAt).toLocaleString()}</small>
          </div>
          <div style={{ marginTop: 4 }}>
            <button onClick={() => onEdit(review)} disabled={editingId === review.id}>Edit</button>
            <button onClick={() => onDelete(review.id)} style={{ marginLeft: 8 }} disabled={editingId === review.id}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}