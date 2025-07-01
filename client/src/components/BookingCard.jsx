import React from "react";
import { useNavigate } from "react-router-dom";

function BookingCard({ booking }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/booking/${booking.id}/edit`);
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      marginBottom: '1rem',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    }}>
      <h3>Appointment</h3>
      <p><strong>Name:</strong> {booking.fullName}</p>
      <p><strong>Email:</strong> {booking.email}</p>
      <p><strong>Date:</strong> {booking.date}</p>
      <p><strong>Service:</strong> {booking.service}</p>
      <p><strong>Fundi ID:</strong> {booking.fundi_id}</p>

      <button onClick={handleEdit} style={{ marginTop: "0.5rem" }}>
        View / Edit
      </button>
    </div>
  );
}

export default BookingCard;
