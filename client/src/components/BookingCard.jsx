

import React from "react";

function BookingCard({ booking }) {
  const {
    created_at,
    updated_at,
    fundi,
    user,
    reviews,
  } = booking;

  const createdDate = new Date(created_at).toLocaleString();
  const updatedDate = new Date(updated_at).toLocaleString();

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
      <p><strong>Fundi ID:</strong> {booking.workerId}</p>
    </div>
  );
}

export default BookingCard;

