import React, { useState } from 'react';
import '../css/nav.css'; // Import CSS file for styling
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Use Link for navigation
import { IoPersonOutline, IoSearch, IoMenu, IoClose } from "react-icons/io5";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src="logo.png" alt="Movie Logo" />
      </div>
      <div className={`nav-links ${isOpen ? 'nav-links-open' : ''}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/movie" onClick={() => setIsOpen(false)}>Movie</Link>
        <Link to="/event" onClick={() => setIsOpen(false)}>Event</Link>
        <Link to="/contactus" onClick={() => setIsOpen(false)}>Contact Us</Link>
      </div>
      <div className="nav-icons">
        <div className="icon" style={{ fontSize: '24px' }} onClick={toggleSearch}><IoSearch /></div>
        <NavLink to={"/login"} className="icon" style={{ fontSize: '24px' }} ><IoPersonOutline /></NavLink>
        <div className="hamburger-icon" onClick={toggleMenu}>
          {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </div>
      </div>

      <div className={`search-dropdown ${isSearchOpen ? 'show' : ''}`}>
        <div className="search-content">
          <input type="text" placeholder="Search..." />
          <div className='search-div'>  
              <button className="search-button">Search</button>
              <button className="close-button" onClick={closeSearch}>Close</button>
           </div>
          
        </div>
      </div>
    </div>
  );
};

export default Nav;
