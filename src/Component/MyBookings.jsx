import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/mybooking.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userdata = sessionStorage.getItem('userData');
  let userId = null;

  useEffect(() => {
    const parsedUserData = JSON.parse(userdata);
    userId = parsedUserData.id;
    console.log("User ID:", userId);
    if (userId) {
      fetchBooking(userId);
    }
  }, []);

  const fetchBooking = async (userId) => {
    const payload = {
      eventID: "1001",
      addInfo: {
        user_id: userId,
      },
    };

    console.log("payload", payload);

    try {
      const response = await axios.post("http://localhost:5164/bookingbyid", payload);
      console.log("API Response:", response.data);
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.users) {
          setBookings(response.data.rData.users);
          console.log("Movies:", responseData.rData.users);
        } else {
          console.log("No movie data in response");
        }
      }
    } catch (error) {
      console.error("Error in fetching booking:", error);
    }
  };

  return (
    <div className="my-bookings-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-item">
              <img src={booking.image} alt="" />
              <div className="booking-details">
                <p><strong>Movie:</strong> {booking.name}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.showTime}</p>
                <p><strong>Theater:</strong> {booking.theaterName}</p>
                <p><strong>Seats:</strong> {booking.selectedSeats}</p>
                <p><strong>Total price:</strong> {booking.totalAmount}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
