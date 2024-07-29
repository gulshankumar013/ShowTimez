import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsChevronRight, BsChevronLeft, BsBoxArrowRight } from 'react-icons/bs';
import { FaMessage } from 'react-icons/fa6';
import "../Dashbord/sidebar.css";
import { BiSolidCameraMovie } from 'react-icons/bi';
import AdminLogout from './AdminLogout';
import { RiMovie2Fill } from 'react-icons/ri';
import { IoTicket, IoTicketOutline } from 'react-icons/io5';

const Sidebar = ({ collapsed, toggleSidebar }) => {
  // const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // const handleLogout = () => {
  //   // Clear session storage and redirect to logout page
  //   sessionStorage.removeItem("userData");
  //   sessionStorage.removeItem("adminToken");
  //   setShowLogoutPopup(false);
  //   window.location.href = "/"; 
  // };

  // const handleClosePopup = () => {
  //   setShowLogoutPopup(false);
  // };

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
          <Link to="/admin/addcommingmovie">
            <BsFillArchiveFill className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Add Upcomming Movie</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/manageusers">
            <BsPeopleFill className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Manage Users</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/movieplaying">
            <BiSolidCameraMovie className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Movie playing</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/upcommingmovie">
          <RiMovie2Fill className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Upcoming Movie</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/ticketbooked">
          <IoTicket className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Booked Ticked</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/messgae">
            <FaMessage className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Message</span>
          </Link>
        </li>
        <li className="logout-item">
          <Link to="/admin/adminlogout">
            <BsBoxArrowRight className={`sidebar-icon ${collapsed ? 'large-icon' : ''}`} />
            <span className={`sidebar-link ${collapsed ? 'hidden' : ''}`}>Logout</span>
          </Link>
        </li>
      </ul>

      
    </div>
  );
};

export default Sidebar;
