
import React, {useEffect, useState} from "react";
import BookingCard from "../components/BookingCard";
import {useTheContext} from "../context/Provider";

function MyBookings(){
    const {user}=useTheContext();
    const [bookings, setBookings] = useState([]);

    useEffect(()=>{
        fetch('/booking',)
        .then((res)=> res.json())
        .then ((data)=>{
            const userBookings= data.filter(b=>b.user_id===user?.id);
            setBookings(userBookings);
        });
    }, [user]);
    
    return(
        <div>
            <h2> My Bookings</h2>
            {bookings.length===0 ?(
                <p> No bookings found</p>
            ):(bookings.map((booking)=><BookingCard key={booking.id} booking= {booking}/>)
        )}
        </div>
    );
}
export default MyBookings;
       
