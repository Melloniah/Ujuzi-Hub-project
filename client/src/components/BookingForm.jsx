import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // to services (book fundi/ book now) - renders Fundicard
import { AppContext } from '../context/Provider';

function BookingForm({ onBook }) {
  const { id: fundiId } = useParams(); // grab fundi ID from the URL
  // User id required
  const user_id = 1 // REPLACE
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    date: '',
    service: '', // optional, can be manually typed or later auto-filled
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleNavigate() {
    navigate(`/services`);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, fundi_id: fundiId, user_id: user_id }), // fundi_id replaced worker
      });

      if (!response.ok) {
        throw new Error("Failed to book service");
      }

      const data = await response.json();
      onBook?.(data); // optional callback
      setFormData({
        fullName: '',
        email: '',
        date: '',
        service: '',
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div>
      <h2>Book This Fundi</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input name="fullName" value={formData.fullName} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Date:
          <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Service:
          <input name="service" value={formData.service} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>

    <button onClick={handleNavigate}>Back to services</button>
   </>
  );
}

export default BookingForm;
