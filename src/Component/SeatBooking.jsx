import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/seatBooking.css'; // Import CSS for the popup styling

const SeatBooking = () => {
  const [showPopup, setShowPopup] = useState(true); // State to control popup visibility
  const [selectedSeats, setSelectedSeats] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { image} = location.state;
  // console.log("image",image)

  const handleAccept = () => {
    setShowPopup(false); // Close the popup on accepting terms
    // Proceed with other initialization if needed
  };

  const handleReject = () => {
    navigate('/theaterList'); // Redirect to theaterList page on rejecting terms
  };

  const toggleSeatSelection = (section, row, seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      const newSelectedSeats = { ...prevSelectedSeats };
      if (!newSelectedSeats[section]) {
        newSelectedSeats[section] = {};
      }
      if (!newSelectedSeats[section][row]) {
        newSelectedSeats[section][row] = [];
      }
      if (newSelectedSeats[section][row].includes(seat)) {
        newSelectedSeats[section][row] = newSelectedSeats[section][row].filter((s) => s !== seat);
      } else {
        newSelectedSeats[section][row].push(seat);
      }
      return newSelectedSeats;
    });
  };

  const renderSection = (title, price, rows, seatsPerRow, occupiedSeats = {}, isRecliner = false) => (
    <div className="section" key={title}>
      <div className="section-title">{`${title} (${price.toFixed(2)})`}</div>
      {rows.map((row) => (
        <div key={row} className="seat-row">
          <span className="row-label">{row}</span>
          {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((seat) => {
            const isSelected = selectedSeats[title] && selectedSeats[title][row] && selectedSeats[title][row].includes(seat);
            const isOccupied = occupiedSeats[row] && occupiedSeats[row].includes(seat);
            return (
              <button
                key={seat}
                className={`seat${isSelected ? ' selected' : ''}${isOccupied ? ' occupied' : ''}`}
                onClick={() => !isOccupied && toggleSeatSelection(title, row, seat)}
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
      return <p>No seats selected</p>;
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

  return (
    <>
    
      {showPopup && (
        <div className="term-condition-popup-overlay">
          <div className="term-condition-popup">
            <h2>Terms and Conditions</h2>
            <ol className="terms-list">
            1. The seat layout page for INOX movies is for representational purposes only and the actual seat layout might vary.
2. Ticket is compulsory for children of 3 years & above.
3. Patrons below the age of 18 years cannot be admitted for movies certified A.
4. A baggage counter facility is not available at this cinema.
5. For 3D movies, ticket price includes charges towards usage of 3D glasses.  
6. Outside Food and beverages are not allowed On the cinema premises.  
7. Items like laptops, cameras, knives, lighters, matchboxes, cigarettes, firearms, and all types of inflammable objects are strictly prohibited.  
8. Items, like carry bags, eatables, helmets, and handbags, are not allowed inside the theatres and are strictly prohibited. Kindly deposit at the baggage counter of the mall.
9. Patrons under the influence of alcohol or any other form of drugs will not be allowed inside the cinema premises.
10. Tickets once purchased at the cinema box office cannot be canceled, exchanged, or refunded.
11. INOX may contact the guest to seek feedback for service improvement.  
12. Decision(s) taken by INOX shall be final and binding, Rights of admission reserved.
13. Pre-booked food & beverage needs to be collected from the F&B counter.
14. Recording of a film through mobile or camera is strictly prohibited and is a punishable offense.
15. Smoking is strictly not permitted inside the cinema premises. Cigarettes/lighters/matchsticks/Gutkha/Pan masala etc. will not be allowed.    
16. Ticket prices are subject to change without any prior notification.
17. For celebrating Birthday parties and special occasions, kindly contact the cinema manager.
18. Infants or children less than 4 years of age, or those under 3.6 feet in height, being prohibited from entering the 4DX Auditorium.
            </ol>
            <div className="term-condition-popup-buttons">
              <button onClick={handleAccept}>Accept</button>
              <button onClick={handleReject}>Reject</button>
            </div>
          </div>
        </div>
      )}
      <div className="seat-layout">
        <div className="movie-details">
          {image && <img src={image} alt="movie poster" />}
          {/* {name && <h2 className="movie-name">{name}</h2>}
          {movie_time && <h3 className="movie-time">{movie_time}</h3>} */}
        </div>
        <div className="screen">
          <img src="screess.svg" alt="Screen" />
          <h2>Screen</h2>
        </div>
        <br />
        <div className="seat-info">
          <span><input type="checkbox" disabled /> Available</span>
          <span><input type="checkbox" checked disabled /> Selected</span>
          <span><input type="checkbox" disabled checked style={{ backgroundColor: '#ccc' }} /> Occupied</span>
        </div>

        <div className="seat-layout-container">
          <div className="seat-selection">
            {renderSection('Executive', 270, ['J', 'I', 'H'], 13)}
            {renderSection('Club', 290, ['G', 'F'], 13)}
            {renderSection('Royale', 310, ['E', 'D', 'C', 'B'], 14, { B: [3, 4, 5, 6, 7, 8] })}
            {renderSection('Royale Recliner', 500, ['A'], 8, {}, true)}
          </div>
          <div className="selected-seats">
            <h3>Selected Seats</h3>
            {renderSelectedSeats()}
            <button className="proceed-to-pay">Proceed to Pay</button>
          </div>
          {/* {movie_time && <h3 className="movie-time">{movie_time}</h3>} */}
        </div>
      </div>
    </>
  );
};

export default SeatBooking;
