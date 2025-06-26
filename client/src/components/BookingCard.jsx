

// function BookingCard({ booking }) {
//   return (
//     <div style={{
//       border: '1px solid #ccc',
//       padding: '1rem',
//       marginBottom: '1rem',
//       borderRadius: '8px',
//       backgroundColor: '#f0f0f0',
//     }}>
//       <h3>📅 Appointment</h3>
//       <p><strong>Name:</strong> {booking.created_at}</p>
//       <p><strong>Email:</strong> {booking.updated_at}</p>
//       {/* <p><strong>Date:</strong> {booking.fundi.name}</p>
//       <p><strong>Service:</strong> {booking.user.username}</p> */}
//       {/* <p><strong>Fundi ID:</strong> {booking.reviews}</p> */}
//     </div>
//   );
// }
// // //
// //     id = db.Column(db.Integer, primary_key=True)
// //     # full_name = db.Column(db.String, nullable=False)
// //     # email = db.Column(db.String(100), nullable=False, unique=True)
// //     created_at = db.Column(db.DateTime(), server_default= func.now())
// //     updated_at = db.Column(db.DateTime(), onupdate=func.now())

// //     fundi_id = db.Column(db.Integer, db.ForeignKey('fundis.id'))
// //     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

// //     #Relationship
// //     user = db.relationship("User", back_populates= "user_bookings")
// //     fundi = db.relationship("Fundi", back_populates = "fundi_bookings")
// //     reviews = db.relationship("Review", back_populates="review_booking", cascade='all, delete-orphan')

// export default BookingCard;

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
      <h3 style={{ marginBottom: '0.5rem' }}> Booking #{booking.id}</h3>

      <p><strong>Service:</strong> {fundi.service.service_type}</p>
      <p><strong>Fundi:</strong> {fundi.name} ({fundi.phonenumber})</p>
      <p><strong>Location:</strong> {fundi.county.name}</p>
      <p><strong>Price:</strong> Ksh {fundi.price.toLocaleString()}</p>

      <hr style={{ margin: '0.75rem 0' }} />

      <p><strong>User:</strong> {user.username} ({user.email})</p>
      <p><strong>Booked On:</strong> {createdDate}</p>
      <p><strong>Last Updated:</strong> {updatedDate}</p>

      {reviews.length > 0 ? (
        <p style={{ color: "green" }}><strong> Review Added</strong></p>
      ) : (
        <p style={{ color: "gray" }}><strong> No Review Yet</strong></p>
      )}
    </div>
  );
}

export default BookingCard;

