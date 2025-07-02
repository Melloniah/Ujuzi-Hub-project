import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTheContext } from "../context/Provider";

export default function FundiDetail() {
  const { id } = useParams();
  const { user } = useTheContext();
  const [fundi, setFundi] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchFundi = useCallback(async () => {
    try {
      const res = await fetch(`/fundis/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFundi(data);
      } else {
        setFundi(null);
      }
    } catch {
      setFundi(null);
    }
  }, [id]);

  useEffect(() => {
    fetchFundi();
  }, [fetchFundi, location.state?.refresh]);

  // Optionally clear the refresh flag after using it
  useEffect(() => {
    if (location.state?.refresh) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  if (!fundi) return <p>Loading fundi details...</p>;

  // Find user booking for this fundi
  const userBooking = fundi.fundi_bookings?.find(b => b.user_id === user?.id);
  const userReview = userBooking?.reviews?.[0] || null;

  // Collect all reviews
  const allReviews = fundi.fundi_bookings
    ? fundi.fundi_bookings.flatMap(booking =>
        booking.reviews.map(review => ({
          ...review,
          username: booking.user?.username || booking.full_name || "Unknown",
          isUser: user && booking.user_id === user.id,
        }))
      )
    : [];

  return (
    <div style={{ padding: 24, marginBottom: 20 }}>
      <h1>{fundi.name}</h1>
      <p><strong>Service:</strong> {fundi.service?.service_type}</p>
      <hr />
      <h3>Reviews</h3>
      {allReviews.length > 0 ? (
        <div>
          {allReviews.map(review => (
            <div key={review.id} style={{ border: "1px solid #ddd", marginBottom: 10, padding: 10 }}>
              <p>
                <strong>User:</strong> {review.username}
                {review.isUser && <span style={{ color: "green", marginLeft: 8 }}>(You)</span>}
              </p>
              <p><strong>Comment:</strong> {review.comment}</p>
              <p><strong>Date:</strong> {new Date(review.created_at).toLocaleDateString()}</p>
              {review.isUser && (
                <>
                  <button onClick={() => navigate(`/fundi/${fundi.id}/review`, { state: { review } })}>
                    Edit Review
                  </button>
                  <button onClick={async () => {
                    if (window.confirm("Delete your review?")) {
                      await fetch(`/reviews/${review.id}`, { method: "DELETE" });
                      fetchFundi();
                      alert("Review deleted.");
                    }
                  }}>
                    Delete Review
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet. Only users who booked this fundi can add a review.</p>
      )}

      {/* Add Review button if user booked and has not reviewed */}
      {userBooking && !userReview && (
        <button onClick={() => navigate(`/fundi/${fundi.id}/review`)}>Add Review</button>
      )}

      <button onClick={() => navigate("/services")} style={{ marginTop: 20 }}>
        Back to Services
      </button>
    </div>
  );
}