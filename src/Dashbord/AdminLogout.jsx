import React, { useState } from 'react';
import '../Dashbord/adminlogout.css';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {

let navigate = useNavigate()

    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const handleLogout = () => {
      // Clear session storage and redirect to landing page page
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("adminToken");
      setShowLogoutPopup(false);
      window.location.href = "/"; 
    };
  
    const handleClosePopup = () => {
      navigate("/admin")
    };
  return (
    <div className="admin-logout-popup">
      <div className="logout-popup-content zoom-in">
        <h2>Are you sure you want to logout?</h2>
        <div className="logout-popup-buttons">
          <button onClick={handleLogout}>Yes</button>
          <button onClick={handleClosePopup}>No</button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogout;
