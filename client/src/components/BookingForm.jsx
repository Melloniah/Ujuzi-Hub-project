import { useState } from 'react';

function BookingForm({ worker, onBook }) {
  const [submittedData, setSubmittedData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    date: '',
    service: worker?.service || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmittedData(formData);

    try {
      const response = await fetch('/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, workerId: worker?.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book');
      }

      const data = await response.json();
      onBook(data); // send data back to parent
      setFormData({
        fullName: '',
        email: '',
        date: '',
        service: worker?.service || '',
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h2>Booking for {worker.name}</h2>
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
          <input name="service" value={formData.service} readOnly />
        </label>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
