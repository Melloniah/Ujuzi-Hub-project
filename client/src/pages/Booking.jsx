import { useLocation } from 'react-router-dom';
import {useState, useEffect } from 'react';
import BookingForm from '../components/BookingForm';
import Bookingcard from '../components/BookingCard';

function Booking(){
    const location = useLocation();
    // const { worker } = location.state || {}; // Worker ?

    const [bookings, setBookings] = useState()
    console.log('BOOKINGS: ', bookings)

    function fetchBookings() {
        fetch('/booking')
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch(() => alert('Failed to fetch bookings'));
    }
    useEffect(() => {
        fetchBookings();
    }, [])

    // if (!worker) return <p>No fundi selected. Go back and choose a worker.</p> // Worker needed

    return (
        <div  style={{ maxWidth: '600px', margin: '0 auto' }} >
            {/* <h2>Book an Appointment with {worker.name}</h2> */}  {/* Workers? */}

            {/* <BookingForm worker={worker} onBook={fetchBookings} /> */}

            <h3 style={{ marginTop: '2rem' }} > All Appointments </h3>
            {bookings && bookings.length === 0 ? (
                <p> No bookings yet.</p>
            ): (
                bookings && bookings.map((booking) => (
                    <Bookingcard key={booking.id} booking={booking} />

                ))
            )}
        </div>
    );
}

export default Booking