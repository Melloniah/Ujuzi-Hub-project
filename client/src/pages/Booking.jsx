import React, { useState, useEffect } from 'react';
import BookingCard from '../components/BookingCard';

function Booking() {
  const [bookings, setBookings] = useState([]);

  function fetchBookings() {
    fetch('/booking')
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch(() => alert('Failed to fetch bookings'));
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ marginTop: '2rem' }}>All Appointments</h3>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))
      )}
    </div>
  );
}

export default Booking;