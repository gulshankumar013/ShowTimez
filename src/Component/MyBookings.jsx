// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import '../css/mybooking.css';

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const userdata = sessionStorage.getItem('userData');
//   let userId = null;

//   useEffect(() => {
//     const parsedUserData = JSON.parse(userdata);
//     userId = parsedUserData.id;
//     console.log("User ID:", userId);
//     if (userId) {
//       fetchBooking(userId);
//     }
//   }, []);

//   const fetchBooking = async (userId) => {
//     const payload = {
//       eventID: "1001",
//       addInfo: {
//         user_id: userId,
//       },
//     };

//     console.log("payload", payload);

//     try {
//       const response = await axios.post("http://localhost:5164/bookingbyid", payload);
//       console.log("API Response:", response.data);
//       if (response.status === 200) {
//         const responseData = response.data;
//         if (responseData.rData && responseData.rData.users) {
//           setBookings(response.data.rData.users);
//           console.log("Movies:", responseData.rData.users);
//         } else {
//           console.log("No movie data in response");
//         }
//       }
//     } catch (error) {
//       console.error("Error in fetching booking:", error);
//     }
//   };

//   return (
//     <div className="my-bookings-container">
//       <h2>My Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>No bookings available.</p>
//       ) : (
//         <ul>
//           {bookings.map((booking) => (
//             <li key={booking.id} className="booking-item">
//               <img src={booking.image} alt="" />
//               <div className="booking-details">
//                 <p><strong>Movie:</strong> {booking.name}</p>
//                 <p><strong>Date:</strong> {booking.date}</p>
//                 <p><strong>Time:</strong> {booking.showTime}</p>
//                 <p><strong>Theater:</strong> {booking.theaterName}</p>
//                 <p><strong>Seats:</strong> {booking.selectedSeats}</p>
//                 <p><strong>Total price:</strong> {booking.totalAmount}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MyBookings;
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/mybooking.css';

const MyBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return (
      <div className="no-booking-data">
        <h2>No booking data available</h2>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const { image, name, movie_time, discription, showTime, theaterName, selectedSeats, totalAmount } = location.state;

  const renderSelectedSeats = () => {
    const selectedSections = Object.keys(selectedSeats);
    return selectedSections.map((section) => (
      <div key={section} className="selected-section">
        <h4>{section}</h4>
        {Object.keys(selectedSeats[section]).map((row) => (
          <div key={row} className="selected-row">
            <span>Row {row}: </span>
            {selectedSeats[section][row].join(', ')}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="booking-ticket">
      <h1 className="ticket-header">Your Ticket</h1>
      <div className="ticket-content">
        <div className="ticket-image-container">
          <img src={image} alt={name} className="ticket-image" />
        </div>
        <div className="ticket-details">
          <h2>{name}</h2>
          <p><strong>Description:</strong> {discription}</p>
          <p><strong>Show Time:</strong> {showTime}</p>
          <p><strong>Theater:</strong> {theaterName}</p>
        </div>
      </div>
      <div className="ticket-seats">
        <h3>Selected Seats</h3>
        {renderSelectedSeats()}
      </div>
      <div className="ticket-amount">
        <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default MyBooking;
