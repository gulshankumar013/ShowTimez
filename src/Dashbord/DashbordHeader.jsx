import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill, BsFillBellFill, BsFillGearFill, BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import ProfilePanel from './ProfilePanel'; // Import the ProfilePanel component
import './dashbordHeader.css';

const DashbordHeader = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleProfilePanel = () => {
    setProfileOpen(!isProfileOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className={`dashboard-nav ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="dashboard-nav-title">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="dashboard-nav-profile">
        <Link to="/admin/notifications" className="dashboard-nav-icon">
          <BsFillBellFill />
        </Link>
        <Link to="#" className="dashboard-nav-icon" onClick={toggleProfilePanel}>
          <BsFillPersonFill /> Profile
        </Link>
        <Link to="#" className="dashboard-nav-icon" onClick={toggleDarkMode}>
          {isDarkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
        </Link>
      </div>
      <ProfilePanel isOpen={isProfileOpen} onClose={toggleProfilePanel} />
    </div>
  );
};

export default DashbordHeader;
