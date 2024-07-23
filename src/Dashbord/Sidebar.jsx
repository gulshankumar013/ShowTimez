import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillArchiveFill, BsFillBellFill, BsFillGrid3X3GapFill, BsPeopleFill, BsChevronRight, BsChevronLeft, BsBoxArrowRight } from 'react-icons/bs';
import { FaMessage } from 'react-icons/fa6';
import "../Dashbord/sidebar.css";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    // Clear session storage and redirect to logout page
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("adminToken");
    setShowLogoutPopup(false);
    // Assuming you have a way to navigate to logout or home
    window.location.href = "/"; 
  };

  const handleClosePopup = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div className={`dashbord-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2 className={`sidebar-title ${collapsed ? 'hidden' : ''}`}>Admin Panel</h2>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? <BsChevronRight /> : <BsChevronLeft />}
        </button>
      </div>
      <ul>
        <li>
          <Link to="/admin">
            <BsFillGrid3X3GapFill className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/addmovieplaying">
            <BsFillArchiveFill className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Add Movie Playing</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/manageusers">
            <BsPeopleFill className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Manage Users</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/alerts">
            <BsFillBellFill className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Alerts</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/message">
            <FaMessage className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Message</span>
          </Link>
        </li>
        <li className="logout-item">
          <Link onClick={() => setShowLogoutPopup(true)}>
            <BsBoxArrowRight className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Logout</span>
          </Link>
        </li>
      </ul>

      {showLogoutPopup && (
        <div className="admin-logout-popup">
          <div className="logout-popup-content">
            <h2>Are you sure you want to logout?</h2>
            <div className="logout-popup-buttons">
              <button onClick={handleLogout}>Yes</button>
              <button onClick={handleClosePopup}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
