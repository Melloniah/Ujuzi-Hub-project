import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Provider";

function BookingForm({ onBook }) {
  const { id: fundiId, bookingId } = useParams(); // fundiId for new booking, bookingId for editing
  const { user } = useContext(AppContext);
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
          ...formData,
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
    <div style={{ padding: "1rem" }}>
      <h2>{isEditMode ? "Edit Booking" : "Book This Fundi"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
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
          />
        </label>
        <br />

        <label>
          Service:
          <input
            name="service"
            value={formData.service}
            onChange={handleChange}
          />
        </label>
        <br />

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: isEditMode ? "#007bff" : "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "1rem"
          }}
        >
          {isSubmitting
            ? (isEditMode ? "Updating..." : "Booking...")
            : (isEditMode ? "Update Booking" : "Book Now")}
        </button>
      </form>

      {isEditMode && (
        <button
          onClick={handleDelete}
          style={{
            marginTop: "1rem",
            backgroundColor: "#dc3545",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Delete Booking
        </button>
      )}

      <button
        onClick={() => navigate("/services")}
        style={{
          marginTop: "1rem",
          backgroundColor: "#6c757d",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginLeft: "1rem"
        }}
      >
        Back to Services
      </button>
    </div>
  );
}

export default BookingForm;
