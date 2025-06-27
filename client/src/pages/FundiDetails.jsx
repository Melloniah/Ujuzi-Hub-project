import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import ReviewForm from "../components/ReviewForm";

export default function FundiDetail() {
  const { id } = useParams();
  const [fundi, setFundi] = useState(null);
  const navigate = useNavigate();

  // Simulate the current user (replace with actual auth user)
  const currentUser = 1;

  const fetchFundi = useCallback(async () => {
    try {
      const res = await fetch(`/fundis/${id}`);
      const data = await res.json();
      setFundi(data);
    } catch (err) {
      console.error("Error fetching fundi:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchFundi();
  }, [fetchFundi]);

  if (!fundi) return <p>Loading fundi details...</p>;

  // Find the booking for this fundi by this user with no review
  const myUnreviewedBooking = fundi.fundi_bookings?.find(
    (booking) => booking.user_id === currentUser && booking.reviews.length === 0
  );

  return (
    <div style={{ padding: 24, marginBottom: 20 }}>
      <h1>{fundi.name}</h1>
      <p><strong>Service:</strong> {fundi.service?.service_type}</p>  
      <hr />
      <h2>Book This Fundi</h2>
      <button onClick={() => navigate(`/fundi/${id}/book`)}>Book the fundi</button>
      <hr />
      <h2>Leave a Review</h2>
      {myUnreviewedBooking ? (
        <div style={{ marginBottom: 16 }}>
          <p>You booked this fundi and haven’t reviewed yet.</p>
          <ReviewForm
            onReviewSubmitted={fetchFundi}
            bookingId={myUnreviewedBooking.id}
          />
        </div>
      ) : (
        <p>You need a booking to leave a review.</p>
      )}
      <h3>Reviews</h3>
      {fundi.fundi_bookings && fundi.fundi_bookings.some(booking => booking.reviews.length > 0) ? (
        <div>
          {fundi.fundi_bookings.map(booking =>
            booking.reviews.map(review => (
              <div key={review.id} style={{ border: '1px solid #ddd', marginBottom: 10, padding: 10 }}>
                <p><strong>User:</strong> {booking.user?.username || 'Unknown user'}</p>
                <p><strong>Comment:</strong> {review.comment}</p>
                <p><strong>Date:</strong> {review.created_at}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div>No reviews yet. Only users who booked this fundi can add a review.</div>
      )}
      <h2>Back to services</h2>
      <button onClick={() => navigate(`/services`)}>Back to services</button>
    </div>
  );
}