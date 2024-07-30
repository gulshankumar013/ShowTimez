import React, { useEffect, useState } from 'react';
import { IoTicketSharp } from 'react-icons/io5';
import '../Dashbord/ticketBooked.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TicketBooked = () => {
  const [expandedTicketId, setExpandedTicketId] = useState(null);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.post("http://localhost:5165/fetchAllTicket", { eventID: "1001" });
      console.log("API Response:", response.data); 
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.tickets) {
          setTickets(responseData.rData.tickets);
          console.log("Tickets:", responseData.rData.tickets);
        } else {
          console.log("No tickets data in response");
        }
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("http://localhost:5165/deleteTicketId", {
        eventID: "1001",
        addInfo: { id: id }
      });
      console.log("Delete Response:", response.data); 
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData.rMessage === "DELETE SUCCESSFULLY.") {
          setTickets(tickets.filter(ticket => ticket.id !== id)); 
          console.log(`Ticket with ID ${id} deleted successfully`);
        } else {
          console.log("Failed to delete ticket");
        }
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedTicketId(expandedTicketId === id ? null : id);
  };



  // this function is use for pase the object of array and render into a simple form of selected seat....
  const formatSelectedSeats = (selectedSeats) => {
    try {
      const parsedSeats = JSON.parse(selectedSeats);
      const formattedSeats = [];
      for (const [section, rows] of Object.entries(parsedSeats)) {
        for (const [row, seats] of Object.entries(rows)) {
          if (Array.isArray(seats)) {
            formattedSeats.push(`${section}: ${row} ${seats.join(', ')}`);
          } else {
            formattedSeats.push(`${section}: ${row} ${seats}`);
          }
        }
      }
      return formattedSeats.join(' | ');
    } catch (error) {
      console.error("Error parsing selectedSeats:", error);
      return selectedSeats;
    }
  };

  return (
    <div className="ticket-booked-container">
      <h2>Booked Tickets</h2>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="ticket-card">
          <div className="ticket-header">
            <div className="ticket-title">
              <IoTicketSharp className="ticket-icon" />
              <span>{ticket.name}</span>
            </div>
            <button className="ticket-toggle-button" onClick={() => toggleExpand(ticket.id)}>
              {expandedTicketId === ticket.id ? 'Collapse' : 'Expand'}
            </button>
          </div>
          <div className={`ticket-body ${expandedTicketId === ticket.id ? 'expanded' : 'collapsed'}`}>
            <div className="ticket-body-content">
              <img src={ticket.image} alt={`${ticket.name} poster`} className="ticket-image" />
              <div className="ticket-details">
                <p><strong>Theater:</strong> {ticket.theaterName}</p>
                <p><strong>Show Time:</strong> {ticket.showTime}</p>
                <p><strong>Description:</strong> {ticket.discription}</p>
                <p><strong>Selected Seats:</strong> {formatSelectedSeats(ticket.selectedSeats)}</p>
                <p><strong>Total Amount:</strong> {ticket.totalAmount}</p>
              </div>
            </div>
            <button className="delete-button" onClick={() => handleDelete(ticket.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketBooked;
