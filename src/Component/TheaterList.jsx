import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import "../css/theaterList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const TheaterList = () => {
  const location = useLocation();
  const { image, aboutMovie, name, movie_time } = location.state || {};
  const [theater, setTheater] = useState([]);
  const [expandedTheater, setExpandedTheater] = useState(null);
  const navigate = useNavigate();
  // const item = location.state?.item || {};
  console.log("image",image)

  useEffect(() => {
    theaterList();
  }, []);

  const theaterList = async () => {
    try {
      const response = await axios.post("http://localhost:5164/fetchtheaterList", { eventID: "1001" });
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
      setExpandedTheater(null); // Collapse if already expanded
    } else {
      setExpandedTheater(index); // Expand theater details
    }
  };

  let bookTicket = ()=>{
    navigate("/seatbooking",{state:{image}});
  }


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
            <button>18</button>
            <button>19</button>
            <button>20</button>
            <button>21</button>
            <button>22</button>
            <button>23</button>
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
                    <button onClick={bookTicket}>10:00 AM</button>
                    <button onClick={bookTicket}>1:00 PM</button>
                    <button onClick={bookTicket}>4:00 PM</button>
                    <button onClick={bookTicket}>7:00 PM</button>
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
}

export default TheaterList;
