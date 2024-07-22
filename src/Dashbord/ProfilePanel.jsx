import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './profilePanel.css'; // Ensure you have this CSS file for styles
import '../Dashbord/profilePanel.css'; // Path to your profile image

const ProfilePanel = ({ isOpen, onClose }) => {
  return (
    <div className={`profile-panel ${isOpen ? 'open' : 'closed'}`}>
      <button className="close-btn" onClick={onClose}>
        <AiOutlineClose />
      </button>
      <div className="profile-content">
        <div className="profile-header">
          <img src="" alt="Profile" className="profile-img" />
          <div className="profile-info">
            <h2>Admin Profile</h2>
            <p className="profile-name">Admin Name</p>
            <p className="profile-email">admin@example.com</p>
          </div>
        </div>
        {/* Additional profile details if needed */}
      </div>
    </div>
  );
};

export default ProfilePanel;
