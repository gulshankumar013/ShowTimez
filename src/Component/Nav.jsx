import React, { useState, useEffect } from 'react';
import '../css/nav.css'; // Import CSS file for styling
import { Link, useNavigate } from 'react-router-dom'; // Use Link for navigation
import { IoPersonOutline, IoSearch, IoMenu, IoClose, IoLocationOutline } from "react-icons/io5"; // Import the location icons
import axios from 'axios'; // Import axios for API requests

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false); // For city dropdown
  const [selectedCity, setSelectedCity] = useState(''); // To store selected city
  const [searchQuery, setSearchQuery] = useState(''); // To store search query
  const [searchResults, setSearchResults] = useState([]); // To store search results
  const navigate = useNavigate(); // To navigate programmatically

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchResults([]); // Clear search results when search is closed
  };

  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
  };

  


  const moviePlay = async (searchQuery) => {
    console.log("searchQuery",searchQuery)
    const payload = {
      eventID: "1001",
      addInfo: {
        id: '', 
        name: searchQuery,
      },
    };
    try {
      const response = await axios.post("http://localhost:5164/fetchMoviePlayingById", payload);
      console.log("API Response:", response.data); // Log the entire response
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.users) {
          setSearchResults(responseData.rData.users);
          console.log("Movies:", responseData.rData.users);
        } else {
          console.log("No movie data in response");
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    await moviePlay(searchQuery);
  };

  const cities = [
    { name: 'Mumbai', image: 'mumbai.avif' },
    { name: 'Delhi Ncr', image: 'ncr.avif' },
    { name: 'Kolkata', image: 'kolk.avif' },
    { name: 'Bengaluru', image: 'bang.png' },
    { name: 'Hyderabad', image: 'hyd.png' },
    { name: 'Chandigarh', image: 'chd.avif' },
    { name: 'Ahmedabad', image: 'ahd.avif' },
    { name: 'Pune', image: 'pune.png' },
    { name: 'Chennai', image: 'chen.avif' },
  ];

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
  };

  const handleProfileClick = () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src="logo.png" alt="Movie Logo" />
      </div>
      <div className={`nav-links ${isOpen ? 'nav-links-open' : ''}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/movie" onClick={() => setIsOpen(false)}>Movie</Link>
        <Link to="/aboutus" onClick={() => setIsOpen(false)}>About us</Link>
        <Link to="/contactus" onClick={() => setIsOpen(false)}>Contact Us</Link>
      </div>
      <div className="nav-icons">
        {selectedCity && (
          <div className="selected-city">
            <img src={selectedCity.image} alt={selectedCity.name} />
            <span>{selectedCity.name}</span>
          </div>
        )}
        <div className="icon" style={{ fontSize: '24px' }} onClick={toggleCityDropdown}>
          <IoLocationOutline />
        </div>
        <div className={`city-dropdown ${isCityDropdownOpen ? 'show' : ''}`}>
          {cities.map(city => (
            <div key={city.name} className="city-option" onClick={() => handleCitySelect(city)}>
              <img src={city.image} alt={city.name} />
              <span>{city.name}</span>
            </div>
          ))}
        </div>
        <div className="icon" style={{ fontSize: '24px' }} onClick={toggleSearch}><IoSearch /></div>
        <div className="icon" style={{ fontSize: '24px' }} onClick={handleProfileClick}><IoPersonOutline /></div>
        <div className="hamburger-icon" onClick={toggleMenu}>
          {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </div>
      </div>
      <div className={`search-dropdown ${isSearchOpen ? 'show' : ''}`}>
        <div className="search-content">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <div className='search-div'>
            <button className="search-button" onClick={handleSearch}>Search</button>
            <button className="close-button" onClick={closeSearch}>Close</button>
          </div>
        </div>
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map(movie => (
              <div key={movie.id} className="search-result-item">
                <img src={movie.image} alt={movie.name} />
                <div className="search-result-info">
                  <h4>{movie.name}</h4>
                  <h4>{movie.discription}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
