import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList"; // to show reviews

export default function FundiDetail() {
  const { id } = useParams(); // this is the fundi ID from the URL

  const [fundi, setFundi] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fetch fundi details
  const fetchFundi = async () => {
    try {
      const res = await fetch(`/fundis/${id}`);
      const data = await res.json();
      setFundi(data);
    } catch (err) {
      console.error("Failed to fetch fundi:", err);
    }
  };

  // Fetch reviews for this fundi
  const fetchReviews = async () => {
    try {
      const res = await fetch(`/reviews?fundi_id=${id}`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    fetchFundi();
    fetchReviews();
  }, [id]);

  if (!fundi) return <p>Loading fundi details...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>{fundi.name}</h1>
      <p><strong>Service:</strong> {fundi.service}</p>
      <p><strong>Bio:</strong> {fundi.bio}</p>

      <hr />

      <h2>Book This Fundi</h2>
      <BookingForm onBook={() => alert("Booking successful!")} />

      <hr />

      <h2>Leave a Review</h2>
      <ReviewForm onReviewSubmitted={fetchReviews} />

      <h3>Reviews</h3>
      <ReviewList reviews={reviews} />
    </div>
  );
}
