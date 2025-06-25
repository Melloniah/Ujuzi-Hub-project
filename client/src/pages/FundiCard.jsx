import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/FundiCard.css";

export const FundiCard = ({ fundi }) => {
  const navigate = useNavigate();

  function handleCardClick() {
    navigate(`/fundi/${fundi.id}`);
  }

  function handleBookClick(e) {
    e.stopPropagation();
    navigate(`/fundi/${fundi.id}/book`);
  }

  function handleReviewClick(e) {
    e.stopPropagation();
    navigate(`/fundi/${fundi.id}/review`);
  }

  return (
    <div className="card-container" onClick={handleCardClick}>
      <img src={fundi.image} alt={fundi.name} className="card-img" />
      <h1 className="card-title">{fundi.name}</h1>
      <p className="card-description">{fundi.service}</p>
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", margin: "0.5rem" }}>
        <button className="card-btn" onClick={handleBookClick}>
          Book Now
        </button>
        <button className="card-btn" onClick={handleReviewClick}>
          Add Review
        </button>
      </div>
    </div>
  );
};
