import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './profilePanel.css'; 
import '../Dashbord/profilePanel.css';
import axios from 'axios';

const ProfilePanel = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);

  console.log("users",users)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.post("http://localhost:5165/adminfetch", { eventID: "1001" });
      console.log("API Response:", response.data); 
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

  return (
    <div className={`profile-panel ${isOpen ? 'open' : 'closed'}`}>
      <button className="close-btn" onClick={onClose}>
        <AiOutlineClose />
      </button>
      <div className="profile-content">
        {users.map((user) => (
          <div key={user.id} className="profile-header">
            {/* <img src={user.image} alt="Profile" className="profile-img" /> */}
            <div className="profile-info">
              <h2>Admin Profile</h2>
              <p className="profile-name">Admin : {user.name}</p>
              <p className="profile-email">Email : {user.email}</p>
            </div>
          </div>
        ))}
       
      </div>
    </div>
  );
};

export default ProfilePanel;
