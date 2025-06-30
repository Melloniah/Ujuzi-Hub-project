import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ReviewForm({ onSubmit, submitting, initialValue = "", editMode = false, onCancel }) {
  const [text, setText] = useState(initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    setText(initialValue); // Reset text when editing changes
  }, [initialValue, editMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    if (!editMode) setText(""); // Clear only if adding
  };

  const handleBackToServices = () => {
    navigate("/services");
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
      {editMode && (
        <button type="button" onClick={onCancel} disabled={submitting} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      )}
      <button
        type="button"
        onClick={handleBackToServices}
        style={{ marginLeft: 8, background: "#eee" }}
      >
        Back to Services
      </button>
    </form>
  );
}

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  initialValue: PropTypes.string,
  editMode: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default ReviewForm;