import React from "react";
import PropTypes from "prop-types";

export default function ReviewList({ reviews, onEdit, onDelete, editingId }) {
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
            background: review.id === editingId ? "#f7f7f7" : "white"
          }}
        >
          <div>
            <strong>Comment:</strong>
            <div>{review.comment}</div>
            <small>
              {review.created_at
                ? new Date(review.created_at).toLocaleString()
                : ""}
            </small>
          </div>
          {(onEdit || onDelete) && (
            <div style={{ marginTop: 4 }}>
              {onEdit && (
                <button onClick={() => onEdit(review)} style={{ marginRight: 8 }}>
                  Edit
                </button>
              )}
              {onDelete && (
                <button onClick={() => onDelete(review.id)}>Delete</button>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    created_at: PropTypes.string,
  })).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  editingId: PropTypes.number,
};