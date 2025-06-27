import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BookingForm({ onBook }) {
  const { id: fundi_id } = useParams();
  const user_id = 1; // Replace with actual user_id from auth
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    date: "",
    service: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleNavigate() {
    navigate("/services");
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, fundi_id, user_id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to book service");
      }

      const data = await response.json();
      onBook?.(data);
      setFormData({
        full_name: "",
        email: "",
        date: "",
        service: "",
      });
      alert("Booking successful!");
      navigate("/booking");
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
            <input name="full_name" value={formData.full_name} onChange={handleChange} required />
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