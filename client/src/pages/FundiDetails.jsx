import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheContext } from "../context/Provider"; // adjust path if needed

export default function FundiDetail() {
  const { id } = useParams();
  const { user } = useTheContext(); // get logged-in user
  const [fundi, setFundi] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch all users for username lookup
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (err) {
        setUsers([]); // fallback if error
      }
    }
    fetchUsers();
  }, []);

  // Fetch fundi details
  const fetchFundi = useCallback(async () => {
    try {
      const res = await fetch(`/fundis/${id}`);
      const data = await res.json();
      setFundi(data);
    } catch (err) {
      setFundi(null);
    }
  }, [id]);

  useEffect(() => {
    fetchFundi();
  }, [fetchFundi]);

  if (!fundi) return <p>Loading fundi details...</p>;

  // Helper to get username from booking
  function getUsername(booking) {
    if (booking.user && booking.user.username) {
      return booking.user.username;
    } else if (users.length && booking.user_id) {
      const found = users.find(u => u.id === booking.user_id);
      return found ? found.username : "Unknown user";
    }
    return "Unknown user";
  }

  return (
    <div style={{ padding: 24, marginBottom: 20 }}>
      <h1>{fundi.name}</h1>
      <p><strong>Service:</strong> {fundi.service?.service_type}</p>
      <hr />
      <h3>Reviews</h3>
      {fundi.fundi_bookings && fundi.fundi_bookings.some(booking => booking.reviews.length > 0) ? (
        <div>
          {fundi.fundi_bookings.map(booking =>
            booking.reviews.map(review => (
              <div key={review.id} style={{ border: '1px solid #ddd', marginBottom: 10, padding: 10 }}>
                <p><strong>User:</strong> {getUsername(booking)}</p>
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