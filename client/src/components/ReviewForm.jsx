import React, { useState } from "react";

function ReviewForm({ onSubmit, submitting, initialValue = "", editMode = false, onCancel }) {
  const [text, setText] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText(""); // Optionally reset for add mode
  };

  return (
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
        {submitting ? (editMode ? "Updating..." : "Submitting...") : (editMode ? "Update Review" : "Submit Review")}
      </button>
      {editMode && <button type="button" onClick={onCancel} disabled={submitting} style={{ marginLeft: 8 }}>Cancel</button>}
    </form>
  );
}

export default ReviewForm;