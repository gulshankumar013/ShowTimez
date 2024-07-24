import React, { useEffect, useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa'; // Message icon
import axios from 'axios';
import '../Dashbord/massage.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const Massage = () => {
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const [users, setUsers] = useState([]);
  // console.log("users",users)
  const navigate = useNavigate();
  const token = sessionStorage.getItem('adminToken');
  useEffect(() => {
    if (!token) {
      console.log('No token found');
      navigate('/login');
    }
  }, [token, navigate]);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.post("http://localhost:5164/fetchAllMessage", { eventID: "1001" });
      console.log("API Response:", response.data); // Log the entire response
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.users) {
          setUsers(responseData.rData.users);
          console.log("Users:", responseData.rData.users);
        } else {
          console.log("No users data in response");
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("http://localhost:5164/deleteMessageId", {
        eventID: "1001",
        addInfo: {
          id: id
        }
      });
      console.log("Delete Response:", response.data); // Log the entire response
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData.rMessage === "DELETE SUCCESSFULLY.") {
          setUsers(users.filter(user => user.id !== id)); // Remove user from local state
          console.log(`Message with ID ${id} deleted successfully`);
        } else {
          console.log("Failed to delete message");
        }
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };

  return (
    <div className="message-container">
        <h2>Massages</h2>
      {users.map((user) => (
        <div key={user.id} className="message-card">
          <div className="message-header">
            <div className="message-title">
              <FaRegEnvelope className="message-icon" />
              <span>{user.name}</span>
            </div>
            <button className="message-toggle-button" onClick={() => toggleExpand(user.id)}>
              {expandedMessageId === user.id ? 'Collapse' : 'Expand'}
            </button>
          </div>
          <div className={`message-body ${expandedMessageId === user.id ? 'expanded' : 'collapsed'}`}>
            <p>{user.message}</p>
            <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Massage;
