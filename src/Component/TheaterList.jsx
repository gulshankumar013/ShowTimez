import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import "../css/theaterList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const TheaterList = () => {
  const location = useLocation();
  const { image, aboutMovie, name, movie_time, discription } = location.state || {};
  const [theater, setTheater] = useState([]);
  const [expandedTheater, setExpandedTheater] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    theaterList();
  }, []);

  const theaterList = async () => {
    try {
      const response = await axios.post("http://localhost:5165/fetchtheaterList", { eventID: "1001" });
      console.log("API Response:", response.data);
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.users) {
          setTheater(responseData.rData.users);
          console.log("Users:", responseData.rData.users);
        } else {
          console.log("No users data in response");
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleTheaterDetails = (index) => {
    if (expandedTheater === index) {
      setExpandedTheater(null);
    } else {
      setExpandedTheater(index);
    }
  };

  const bookTicket = (theaterName, showTime) => {
    navigate("/seatbooking", {
      state: {
        image,
        name,
        movie_time,
        discription,
        showTime,
        theaterName,
        date: selectedDate,
      },
    });
  };

  return (
    <>
      <div className='booking-movie'>
        <div className='booking-movie-child'>
          <div className='booking-movie-image'>
            {image && <img src={image} alt="Movie Poster" className="movie-poster" />}
          </div>
          <div className='booking-movie-details'>
            {name && <h2 className="movie-name">{name}</h2>}
            {movie_time && <h3 className="movie-time">{movie_time}</h3>}
            {aboutMovie && <p className="movie-details-text">{aboutMovie}</p>}
          </div>
        </div>
        <div className='Date'>
          <div className='Date-child'>
            <button onClick={() => setSelectedDate('25')}>25</button>
            <button onClick={() => setSelectedDate('26')}>26</button>
            <button onClick={() => setSelectedDate('27')}>27</button>
            <button onClick={() => setSelectedDate('28')}>28</button>
            <button onClick={() => setSelectedDate('29')}>29</button>
            <button onClick={() => setSelectedDate('30')}>30</button>
          </div>
        </div>
        <div className='TheaterList'>
          {theater.length > 0 ? (
            theater.map((list, index) => (
              <div className='TheaterList-child' key={index}>
                <div className='theater-info'>
                  <h2>{list.name}</h2>
                  <p>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
                    {list.location}
                  </p>
                </div>
                <div className='theater-distance'>
                  <span>{list.distance} km away</span>
                  <span>{list.accessibility}</span>
                  <span>{list.features}</span>
                  <button onClick={() => toggleTheaterDetails(index)}>Show Time</button>
                </div>

                {expandedTheater === index && (
                  <div className='theater-showtimes'>
                    {/* Replace with actual show times */}
                    <p>Show times:</p>
                    <button onClick={() => bookTicket(list.name, '10:00 AM')}>10:00 AM</button>
                    <button onClick={() => bookTicket(list.name, '1:00 PM')}>1:00 PM</button>
                    <button onClick={() => bookTicket(list.name, '4:00 PM')}>4:00 PM</button>
                    <button onClick={() => bookTicket(list.name, '7:00 PM')}>7:00 PM</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No theaters available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TheaterList;
