import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList"; // to show reviews
import { useNavigate } from "react-router-dom"; // to services (book fundi/ book now) - renders Fundicard

export default function FundiDetail() {
  const { id } = useParams(); // this is the fundi ID from the URL

  const [fundi, setFundi] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate()

  // We need currentUser
  const currentUser = 1 // GET USER AFTER SINGIN

  function handleBookClick(e) {
    e.stopPropagation();
    navigate(`/fundi/${id}/book`); // Fundi id & User id required # To BookingForm
  }

  function handleBackToService(e) {
    e.stopPropagation();
    navigate(`/services`); // Fundi id & User id required # To BookingForm
  }

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

  // // Fetch reviews for this fundi


  // Map through fundi_bookings if any. Access reviews, if not empty array show reviews

  useEffect(() => {
    fetchFundi();
    // fetchReviews(); Reviews are from fundi
  }, [id]);

  if (!fundi) return <p>Loading fundi details...</p>;

  return (
    <div style={{ padding: 24, marginBottom: 20 }}>
      <h1>{fundi.name}</h1>
      <p><strong>Service:</strong> {fundi.service?.service_type}</p>  
      <p><strong>Bio:</strong> {fundi.bio}</p>

      <hr />

      <h2>Book This Fundi</h2>
      <button onClick={handleBookClick}>Book the fundi</button>
      {/* <BookingForm onBook={() => alert("Booking successful!")} /> */}

      <hr />

      <h2>Leave a Review</h2>

      {/* If current user made a booking and has no review, allow them to */}
      {currentUser && fundi.fundi_bookings.some(
        booking => booking.user_id === currentUser.id && booking.reviews.length === 0
      ) && (
        <div style={{ marginBottom: 16 }}>
          <p>You booked this fundi and haven’t reviewed yet.</p>
          <ReviewForm
            onReviewSubmitted={fetchFundi} // Refresh after submit
            bookingId={
              // Get the booking ID that matches this user with no review
              fundi.fundi_bookings.find(
                booking => booking.user_id === currentUser.id && booking.reviews.length === 0
              )?.id
            }
          />
        </div>
      )}

      {/* Loop over all fundi.fundi_bookings. For each booking, loop over its reviews. Show the review + booking user who wrote it. 
      -check postman /fundis/1 (for details)*/}
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
      <button onClick={handleBackToService}>Back to services</button>


    </div>
  );
}
