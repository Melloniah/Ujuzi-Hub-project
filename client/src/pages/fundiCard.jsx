import { useNavigate } from "react-router-dom";
import "../pages/Card.css";

export const FundiCard = ({ fundi }) => {
  const navigate = useNavigate();

  function handleCardClick() {
    navigate(`/fundi/${fundi.id}`);
  }

  function handleBookClick(e) {
    e.stopPropagation();
    navigate(`/fundi/${fundi.id}/book`, {state: {worker: fundi} });
  }

  function handleReviewClick(e) {
    e.stopPropagation();
    navigate(`/fundi/${fundi.id}/review`, {state: { worker: fundi}});
  }

  return (
    <div className="card-container" onClick={handleCardClick}>
      <img src={fundi.image} alt={fundi.name} className="card-img" />
      <h1 className="card-title">{fundi.name}</h1>
      <p className="card-description">{fundi.service}</p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <button onClick={handleBookClick}>Book Now</button>
        <button onClick={handleReviewClick}>Add Review</button>
      </div>
    </div>
  );
};
