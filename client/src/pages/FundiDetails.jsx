import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

export default function FundiDetail() {
  const { id } = useParams();
  console.log("Fundi ID from URL:", id);

  const [fundi, setFundi] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchFundi = useCallback(async () => {
    try {
      const res = await fetch(`/fundis/${id}`);
      const data = await res.json();
      setFundi(data);
    } catch (err) {
      console.error("Error fetching fundi:", err);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/reviews?fundi_id=${id}`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchFundi();
    fetchReviews();
  }, [fetchFundi, fetchReviews]);

  if (!fundi) return <p>Loading fundi details...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>{fundi.name}</h1>
      <p><strong>Service:</strong> {fundi.service?.service_type}</p>  
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
