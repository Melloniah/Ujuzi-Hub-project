import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheContext } from "../context/Provider";

export default function FundiDetail() {
  const { id } = useParams();
  const { user } = useTheContext();
  const [fundi, setFundi] = useState(null);
  const navigate = useNavigate();

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
  }, [fetchFundi]);

  if (!fundi) return <p>Loading fundi details...</p>;

  // Check if user booked fundi
  const userBooking = fundi.fundi_bookings?.find(booking => booking.user_id === user?.id);

  // Check if user already reviewed
  const userReview = userBooking?.reviews?.length > 0 ? userBooking.reviews[0] : null;

  return (
    <div style={{ padding: 24, marginBottom: 20 }}>
      <h1>{fundi.name}</h1>
      <p><strong>Service:</strong> {fundi.service?.service_type}</p>
      <hr />
      <h3>Reviews</h3>
      {fundi.fundi_bookings && fundi.fundi_bookings.some(b => b.reviews.length > 0) ? (
        <div>
          {fundi.fundi_bookings.map(booking =>
            booking.reviews.map(review => (
              <div key={review.id} style={{ border: "1px solid #ddd", marginBottom: 10, padding: 10 }}>
                <p><strong>User:</strong> {booking.user?.username || "Unknown"}</p>
                <p><strong>Comment:</strong> {review.comment}</p>
                <p><strong>Date:</strong> {new Date(review.created_at).toLocaleDateString()}</p>

                {/* Show Edit/Delete if review belongs to current user */}
                {user && booking.user_id === user.id && (
                  <>
                    <button onClick={() => navigate(`/fundi/${fundi.id}/review`, { state: { review } })}>
                      Edit Review
                    </button>
                    <button onClick={async () => {
                      if(window.confirm("Delete your review?")) {
                        await fetch(`/reviews/${review.id}`, { method: "DELETE" });
                        fetchFundi(); // refresh data
                        alert("Review deleted.");
                      }
                    }}>
                      Delete Review
                    </button>
                  </>
                )}
              </div>
            ))
          )}
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
