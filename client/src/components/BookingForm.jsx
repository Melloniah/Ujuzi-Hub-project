
import React, { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheContext } from "../context/Provider";
import "./BookingForm.css";

function BookingForm({ onBook }) {
  const { id: fundiId, bookingId } = useParams(); // fundiId for new booking, bookingId for editing
  const { user } = useTheContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    date: '',
    service: '',

  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);


  // Load booking data if editing
  useEffect(() => {
    if (bookingId) {
      setIsEditMode(true);
      fetch(`/booking/${bookingId}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            fullName: data.fullName || '',
            email: data.email || '',
            date: data.date || '',
            service: data.service || '',
          });
        });
    }
  }, [bookingId]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      const url = isEditMode
        ? `/booking/${bookingId}`
        : "/booking";

      const method = isEditMode ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        full_name: formData.fullName,
        email: formData.email,
        date: formData.date, // ✅
        service: formData.service, // ✅
        user_id: user?.id,
        ...(isEditMode ? {} : { fundi_id: fundiId }),
}),

      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? "update" : "create"} booking`);

      }

      const data = await response.json();
      onBook?.(data);


      alert(`Booking ${isEditMode ? "updated" : "created"} successfully!`);

      setTimeout(() => {
        navigate("/my-bookings");
      }, 300);


    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`/booking/${bookingId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete booking");

      alert("Booking deleted");
      navigate("/my-bookings");
    } catch (err) {
      alert(err.message);
    }
  };

  return (

    <div className="booking-form-container">
      <h2>{isEditMode ? "Edit Booking" : "Book This Fundi"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="booking-input"
          />
        </label>
        <br />

        <label>
          Email:
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="booking-input"
          />
        </label>
        <br />

        <label>
          Date:
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="booking-input"
          />
        </label>
        <br />

        <label>
          Service:
          <input
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="booking-input"
          />
        </label>
        <br />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`booking-submit-btn ${isEditMode ? "update" : "book"}`}
        >
          {isSubmitting
            ? (isEditMode ? "Updating..." : "Booking...")
            : (isEditMode ? "Update Booking" : "Book Now")}
        </button>
      </form>

      {isEditMode && (
        <button
          onClick={handleDelete}
          className="booking-delete-btn"
        >
          Delete Booking
        </button>
      )}

      <button
        onClick={() => navigate("/services")}
        className="booking-back-btn"
      >
        Back to Services
      </button>
    </div>

  );
}

export default BookingForm;