// MyBookings.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const BOOKINGS_API = "http://localhost:5164/bookings"; // Replace with your actual API endpoint

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch the bookings from the backend
    const fetchBookings = async () => {
      try {
        const response = await axios.get(BOOKINGS_API);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p><strong>Movie:</strong> {booking.movieName}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Theater:</strong> {booking.theaterName}</p>
              <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
