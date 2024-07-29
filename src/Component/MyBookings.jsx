
// import React, { useEffect, useRef, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import JsBarcode from 'jsbarcode';
// import '../css/mybooking.css';

// const MyBooking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const barcodeRef = useRef(null);
//   const [barcodeNumber, setBarcodeNumber] = useState('');

//   useEffect(() => {
//     if (!location.state) {
//       return;
//     }
//     // Generate a random barcode number
//     const generatedBarcodeNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
//     // Generate the barcode
//     JsBarcode(barcodeRef.current, generatedBarcodeNumber, { format: 'CODE128' });
//     // Save the barcode number
//     setBarcodeNumber(generatedBarcodeNumber);
//   }, [location.state]);

//   if (!location.state) {
//     return (
//       <div className="no-booking-data">
//         <h2>No booking data available</h2>
//         <button onClick={() => navigate('/')}>Go to Home</button>
//       </div>
//     );
//   }

//   const { image, name, discription, showTime, theaterName, selectedSeats, totalAmount,date } = location.state;

//   const renderSelectedSeats = () => {
//     const selectedSections = Object.keys(selectedSeats);
//     return selectedSections.map((section) => (
//       <div key={section} className="selected-section">
//         <h4>{section}</h4>
//         {Object.keys(selectedSeats[section]).map((row) => (
//           <div key={row} className="selected-row">
//             <span>Row {row}: </span>
//             {selectedSeats[section][row].join(', ')}
//           </div>
//         ))}
//       </div>
//     ));
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(12);

//     // Ticket Title
//     doc.text('Show Timez Ticket', 20, 20);

//     // Movie Info
//     doc.text(`Movie: ${name}`, 20, 30);
//     doc.text(`Description: ${discription}`, 20, 40);
//     doc.text(`Show Time: ${showTime}`, 20, 50);
//     doc.text(`Theater: ${theaterName}`, 20, 60);

    
//     let startY = 70;
//     const selectedSections = Object.keys(selectedSeats);
//     selectedSections.forEach((section) => {
//       doc.text(`Section: ${section}`, 20, startY);
//       startY += 10;
//       Object.keys(selectedSeats[section]).forEach((row) => {
//         doc.text(`Row ${row}: ${selectedSeats[section][row].join(', ')}`, 20, startY);
//         startY += 10;
//       });
//     });

   
//     doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 20, startY + 10);

   
//     if (barcodeRef.current) {
//       const barcodeBase64 = barcodeRef.current.toDataURL('image/png');
//       doc.addImage(barcodeBase64, 'PNG', 20, startY + 20, 50, 20);
//     }

    
//     doc.save(`ticket_${name}.pdf`);
//   };

//   return (
//     <div className="booking-ticket">
//       <h1 className="ticket-header">Your Ticket</h1>
//       <div className="ticket-content">
//         <div className="ticket-image-container">
//           <img src={image} alt={name} className="ticket-image" />
//         </div>
//         <div className="ticket-details">
//           <h2>{name}</h2>
//           <p><strong>Description:</strong> {discription}</p>
//           <p><strong>Date:</strong> {date}</p>
//           <p><strong>Show Time:</strong> {showTime}</p>
//           <p><strong>Theater:</strong> {theaterName}</p>
//         </div>
//       </div>
//       <div className="ticket-seats">
//         <h3>Selected Seats</h3>
//         {renderSelectedSeats()}
//       </div>
//       <div className="ticket-amount">
//         <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
//       </div>
//       <button className='download-ticket' onClick={generatePDF}>Download Ticket</button>
//       <canvas ref={barcodeRef} style={{ display: 'none' }}></canvas>
//     </div>
//   );
// };

// export default MyBooking;

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';
import axios from 'axios';
import '../css/mybooking.css';

const MyBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const barcodeRef = useRef(null);
  const [barcodeNumber, setBarcodeNumber] = useState('');

  useEffect(() => {
    if (!location.state) {
      return;
    }
    // Generate a random barcode number
    const generatedBarcodeNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    // Generate the barcode
    JsBarcode(barcodeRef.current, generatedBarcodeNumber, { format: 'CODE128' });
    // Save the barcode number
    setBarcodeNumber(generatedBarcodeNumber);

    // Save booking data to database
    saveBookingData(location.state);
  }, [location.state]);

  if (!location.state) {
    return (
      <div className="no-booking-data">
        <h2>No booking data available</h2>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const { image, name, discription, showTime, theaterName, selectedSeats, totalAmount ,userId,date} = location.state;

  const saveBookingData = async (bookingData) => {
    const payload = {
      eventID: "1001",
      addInfo: {
        name: bookingData.name,
        image: bookingData.image,
        discription: bookingData.discription,
        showTime: bookingData.showTime,
        theaterName: bookingData.theaterName,
        selectedSeats: bookingData.selectedSeats,
        totalAmount: bookingData.totalAmount,
        user_id:userId,
      }
    };

    try {
      const response = await axios.post("http://localhost:5165/booking", payload);
      console.log('Booking data saved:', response.data,);
    } catch (error) {
      console.error('Error saving booking data:', error);
    }
  };

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

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Ticket Title
    doc.text('Show Timez Ticket', 20, 20);

    // Movie Info
    doc.text(`Movie: ${name}`, 20, 30);
    doc.text(`Description: ${discription}`, 20, 40);
    doc.text(`Show Time: ${showTime}`, 20, 50);
    doc.text(`Theater: ${theaterName}`, 20, 60);

    let startY = 70;
    const selectedSections = Object.keys(selectedSeats);
    selectedSections.forEach((section) => {
      doc.text(`Section: ${section}`, 20, startY);
      startY += 10;
      Object.keys(selectedSeats[section]).forEach((row) => {
        doc.text(`Row ${row}: ${selectedSeats[section][row].join(', ')}`, 20, startY);
        startY += 10;
      });
    });

    doc.text(`Total Amount: ${totalAmount.toFixed(2)}`, 20, startY + 10);

    if (barcodeRef.current) {
      const barcodeBase64 = barcodeRef.current.toDataURL('image/png');
      doc.addImage(barcodeBase64, 'PNG', 20, startY + 20, 50, 20);
    }

    doc.save(`ticket_${name}.pdf`);
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
          <p><strong>Date:</strong> {date}</p>
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
      <button className='download-ticket' onClick={generatePDF}>Download Ticket</button>
      <canvas ref={barcodeRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default MyBooking;