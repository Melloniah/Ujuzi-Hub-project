import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

export default function FundiDetail() {
  const { id } = useParams();
  const [fundi, setFundi] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/fundis/${id}`)
      .then((r) => r.json())
      .then(setFundi);

    fetch(`/fundis/${id}/reviews`)
      .then((r) => r.json())
      .then(setReviews);
  }, [id]);

  const handleReviewSubmit = () => {
    fetch(`/fundis/${id}/reviews`)
      .then((r) => r.json())
      .then(setReviews);
  };

  if (!fundi) return <p>Loading...</p>;

  return (
    <div>
      <h2>{fundi.name}</h2>
      <p>{fundi.description}</p>
      <ReviewForm bookingId={id} onReviewSubmitted={handleReviewSubmit} />
      <ReviewList reviews={reviews} />
    </div>
  );
}
