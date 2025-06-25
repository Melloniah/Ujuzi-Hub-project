import React, {useState, useEffect } from "react";

export default function ReviewForm({ onSubmit, submitting, initialValue, editMode, onCancel }) {
  const [text, setText] = useState(initialValue || "");

  useEffect(() => {
    setText(initialValue || "");
  }, [initialValue, editMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        required
        placeholder="Write your comment..."
        style={{ width: "100%", minHeight: 60 }}
        disabled={submitting}
      />
      <button type="submit" style={{ marginTop: 8 }} disabled={submitting || !text.trim()}>
        {submitting ? (editMode ? "Updating..." : "Submitting...") : (editMode ? "Update" : "Submit")}
      </button>
      {editMode && (
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      )}
    </form>
  );
}