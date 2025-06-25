import { useState } from 'react';

function BookingForm({ fundi, user, onBooked }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    date: '',
    service: fundi?.service || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          date: formData.date,
          service: formData.service,
          fundi_id: fundi?.id,
          user_id: user?.id, // assuming you have user info
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book');
      }

      const data = await response.json();
      onBooked(data); // Pass booking data up for review step/modal
      setFormData({
        fullName: '',
        email: '',
        date: '',
        service: fundi?.service || '',
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Booking for {fundi?.name}</h2>
      <input name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Full Name" />
      <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <input name="service" value={formData.service} readOnly />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
      </button>
    </form>
  );
}

export default BookingForm;
