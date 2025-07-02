import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheContext } from "../context/Provider";

export default function ReviewForm({ editingReview, onSubmit, submitting, onDelete, onCancel }) {
  const { id } = useParams(); // fundi id from URL
  const { user } = useTheContext();
  const [text, setText] = useState(editingReview ? editingReview.comment : "");

  if (!user) {
    return (
      <div>
        <p>Please log in to add or edit reviews.</p>
        <button onClick={() => onCancel()}>Go to Login</button>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || submitting) return;
    onSubmit(text);
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        disabled={submitting}
        placeholder="Write your review..."
        style={{ width: "100%", minHeight: 100 }}
      />
      <div style={{ marginTop: 10 }}>
        <button type="submit" disabled={submitting || !text.trim()}>
          {submitting
            ? editingReview
              ? "Updating..."
              : "Submitting..."
            : editingReview
              ? "Update Review"
              : "Submit Review"}
        </button>
        {editingReview && (
          <button
            type="button"
            onClick={onDelete}
            disabled={submitting}
            style={{ marginLeft: 8 }}
          >
            Delete Review
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          style={{ marginLeft: 8 }}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}