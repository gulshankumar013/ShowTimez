// src/Dashbord/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillArchiveFill, BsFillBellFill, BsFillGrid3X3GapFill, BsPeopleFill, BsChevronRight, BsChevronLeft, BsBoxArrowRight } from 'react-icons/bs';
import "../Dashbord/sidebar.css";

const Sidebar = ({ collapsed, toggleSidebar }) => {
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
        <li className="logout-item">
          <Link to="/logout">
            <BsBoxArrowRight className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
