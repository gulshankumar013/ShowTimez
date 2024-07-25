import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill, BsFillBellFill, BsFillGearFill, BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import ProfilePanel from './ProfilePanel'; 
import './dashbordHeader.css';

const DashbordHeader = ({ collapsed }) => {
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
    <div className={`dashbord-navbar ${collapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="dashbord-navbar-title">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="dashbord-navbar-profile">
        
        <Link to="#" className="dashbord-navbar-icon" onClick={toggleProfilePanel}>
          <BsFillPersonFill /> Profile
        </Link>
        
      </div>
      <ProfilePanel isOpen={isProfileOpen} onClose={toggleProfilePanel} />
    </div>
  );
};

export default DashbordHeader;
