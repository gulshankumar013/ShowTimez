import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/seatBooking.css';
import Footer from './Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

const SeatBooking = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { image, name, discription, showTime, theaterName, movie_time } = location.state;
  const userdata = sessionStorage.getItem('userData');

  // This is to provide authentication without login user cannot book ticket
  const [userData, setUserData] = React.useState({
    email: "",
    mobile: "",
    name: ""
  });

  useEffect(() => {
    const userDataString = sessionStorage.getItem("userData");
    if (!userDataString) {
      toast.warning("You need To login First");
      navigate("/login");
    } else {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    }
  }, []);

  let userId = null;
  if (userdata) {
    const parsedUserData = JSON.parse(userdata);
    userId = parsedUserData.id;
    console.log("userdata id:", parsedUserData.id);
  } else {
    console.log("No userdata found in sessionStorage");
  }

  const seatLayout = [
    { section: 'Executive', price: 270, rows: ['J', 'I', 'H'], seatsPerRow: 13 },
    { section: 'Club', price: 290, rows: ['G', 'F'], seatsPerRow: 13 },
    { section: 'Royale', price: 310, rows: ['E', 'D', 'C', 'B'], seatsPerRow: 14, occupiedSeats: { B: [3, 4, 5, 6, 7, 8] } },
    { section: 'Royale Recliner', price: 500, rows: ['A'], seatsPerRow: 8, isRecliner: true }
  ];

  const handleAccept = () => {
    setShowPopup(false);
  };

  const handleReject = () => {
    navigate('/theaterList');
  };

  const toggleSeatSelection = (section, row, seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      const newSelectedSeats = { ...prevSelectedSeats };
      const sectionPrices = {
        Executive: 270,
        Club: 290,
        Royale: 310,
        'Royale Recliner': 500
      };

      let newTotalAmount = totalAmount;

      if (!newSelectedSeats[section]) {
        newSelectedSeats[section] = {};
      }

      if (!newSelectedSeats[section][row]) {
        newSelectedSeats[section][row] = [];
      }

      if (newSelectedSeats[section][row].includes(seat)) {
        newSelectedSeats[section][row] = newSelectedSeats[section][row].filter((s) => s !== seat);
        if (newSelectedSeats[section][row].length === 0) {
          delete newSelectedSeats[section][row];
        }
        if (Object.keys(newSelectedSeats[section]).length === 0) {
          delete newSelectedSeats[section];
        }
        newTotalAmount -= sectionPrices[section];
      } else {
        newSelectedSeats[section][row].push(seat);
        newTotalAmount += sectionPrices[section];
      }

      setTotalAmount(newTotalAmount);
      return newSelectedSeats;
    });
  };

  const renderSection = (sectionData) => (
    <div className="section" key={sectionData.section}>
      <div className="section-title">{`${sectionData.section} (${sectionData.price.toFixed(2)})`}</div>
      {sectionData.rows.map((row) => (
        <div key={row} className="seat-row">
          <span className="row-label">{row}</span>
          {Array.from({ length: sectionData.seatsPerRow }, (_, i) => i + 1).map((seat) => {
            const isSelected = selectedSeats[sectionData.section] && selectedSeats[sectionData.section][row] && selectedSeats[sectionData.section][row].includes(seat);
            const isOccupied = sectionData.occupiedSeats && sectionData.occupiedSeats[row] && sectionData.occupiedSeats[row].includes(seat);
            return (
              <button
                key={seat}
                className={`seat${isSelected ? ' selected' : ''}${isOccupied ? ' occupied' : ''}`}
                onClick={() => !isOccupied && toggleSeatSelection(sectionData.section, row, seat)}
              >
                {seat}
              </button>
            );
          })}
          <span className="row-label">{row}</span>
        </div>
      ))}
    </div>
  );

  const renderSelectedSeats = () => {
    const selectedSections = Object.keys(selectedSeats);
    if (selectedSections.length === 0) {
      return (
        <div className="no-seats-selected">
          <img src={"cinema-seat.svg"} alt="No seats selected" className="no-seats-image" />
          <p>No seats selected</p>
        </div>
      );
    }

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
  console.log("selectedSeats", selectedSeats);

  const handleProceedToPay = async () => {
    const options = {
      key: "rzp_test_90ZILGzyAn0OTE",
      key_secret: "4IfoRyvUFIy99YpDscnUxT9R",
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'Movie Ticket Booking',
      description: 'Payment for movie tickets',
      handler: function (response) {
        alert('Payment Successful');
        bookTicket();
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '1234567890'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const bookTicket = () => {
    const clonedSelectedSeats = JSON.parse(JSON.stringify(selectedSeats));
    const stateData = {
      image: image,
      name: name,
      movie_time: movie_time,
      discription: discription,
      showTime: showTime,
      theaterName: theaterName,
      selectedSeats: clonedSelectedSeats,
      totalAmount: totalAmount,
      userId: userId
    };

    // navigate("/mybooking", { state: stateData });
    navigate("/profile", { state: stateData });
  };
  return (
    <>
      {showPopup && (
        <div className="term-condition-popup-overlay">
          <div className="term-condition-popup">
            <h2>Terms and Conditions</h2>
            <ol className="terms-list">
              <li>The seat layout page for INOX movies is for representational purposes only and the actual seat layout might vary.</li>
              <li>Ticket is compulsory for children of 3 years & above.</li>
              <li>Patrons below the age of 18 years cannot be admitted for movies certified A.</li>
              <li>A baggage counter facility is not available at this cinema.</li>
              <li>For 3D movies, ticket price includes charges towards usage of 3D glasses.</li>
              <li>Outside Food and beverages are not allowed On the cinema premises.</li>
              <li>Items like laptops, cameras, knives, lighters, matchboxes, cigarettes, firearms, and all types of inflammable objects are strictly prohibited.</li>
              <li>Items, like carry bags, eatables, helmets, and handbags, are not allowed inside the theatres and are strictly prohibited. Kindly deposit at the baggage counter of the mall.</li>
              <li>Patrons under the influence of alcohol or any other form of drugs will not be allowed inside the cinema premises.</li>
              <li>Tickets once purchased at the cinema box office cannot be canceled, exchanged, or refunded.</li>
            </ol>
            <div className="term-condition-popup-buttons">
              <button onClick={handleAccept}>Accept</button>
              <button onClick={handleReject}>Reject</button>
            </div>
          </div>
        </div>
      )}
      <div className="seat-layout">
       
        <div className="movie-booking-heading">
          <p>Booking summary</p>
        </div>
        <div className="screen">
          <img src="screess.svg" alt="Screen" />
          <div className="booking-summary">
            <div className="movie-poster">
              {image && <img src={image} alt="movie poster" />}
            </div>
            <div className="booking-details">
              {name && <h2 className="movie-name">Movie - {name}</h2>}
              {discription && <p className="show-time">{discription}</p>}
              {showTime && <p className="show-time">Show Time - {showTime}</p>}
              {theaterName && <p className="show-time">At - {theaterName}</p>}
              <p className="cinema-location"></p>
            </div>
          </div>
        </div>
        <br />
        <div className="seat-info">
          <span><input type="checkbox" disabled /> Available</span>
          <span><input type="checkbox" checked disabled /> Selected</span>
          <span><input type="checkbox" disabled checked style={{ backgroundColor: '#ccc' }} /> Occupied</span>
        </div>

        <div className="seat-layout-container">
          <div className="seat-selection">
            {seatLayout.map((section) => renderSection(section))}
          </div>
          <div className="selected-seats">
            <h3>Selected Seats</h3>
            {renderSelectedSeats()}
            <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
            <button className="proceed-to-pay" onClick={handleProceedToPay}>Proceed to Pay</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SeatBooking;
