import React from "react";

export default function ReviewList({ reviews }) {
  if (!reviews.length) return <p>No reviews yet.</p>;

  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {reviews.map((review) => (
        <li
          key={review.id}
          style={{
            marginBottom: 16,
            borderBottom: "1px solid #eee",
            paddingBottom: 8,
          }}
        >
          <div>
            <strong>Comment:</strong>
            <div>{review.comment}</div>
            <small>{new Date(review.created_at).toLocaleString()}</small>
          </div>
        </li>
      ))}
    </ul>
  );
}
