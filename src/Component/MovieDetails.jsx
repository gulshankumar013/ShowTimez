import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MovieDetails.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const api = "http://localhost:5164/fetchMoviePlayingById";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); 
  const item = location.state?.item || {}; 
  // console.log("item", item);

  useEffect(() => {
    if (item.id) { // Check if item.id exists
      moviePlay();
    }
  }, [item.id]);

  const moviePlay = async () => {
    const payload = {
      eventID: "1001",
      addInfo: {
        id: item.id, 
        name:"",
      },
    };
    try {
      const response = await axios.post(api, payload);
      console.log("API Response:", response.data); 
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.users) {
          setMovie(responseData.rData.users);
          console.log("Movies:", responseData.rData.users);
        } else {
          console.log("No movie data in response");
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  if (!movie) return <div>Loading...</div>;

  const handleBookTicket = () => {
    // Navigate to TheaterList component and pass movie name, image, and aboutMovie as props
    navigate("/theaterList", { state: { image: item.image, aboutMovie: item.aboutMovie, name: item.name, movie_time:item.movie_time,discription:item.discription } });
  };
  return (
    <>
    <div className="movie-detail">
      <button className='bookTicket'  onClick={handleBookTicket} >Book Ticket</button>
      <h1>{item.name}</h1>
      <p style={{fontSize:"15px"}}>{item.aboutMovie}</p>
      <h2>Cast</h2>
      <div className="cast">
        {movie.map((member, index) => (
          <div className="cast-member" key={index}>
            <div className="cast-item">
              <img src={member.castImage1} alt={member.castName1} />
              <p>{member.castName1}</p>
            </div>
            <div className="cast-item">
              <img src={member.castImage2} alt={member.castName2} />
              <p>{member.castName2}</p>
            </div>
            <div className="cast-item">
              <img src={member.castImage3} alt={member.castName3} />
              <p>{member.castName3}</p>
            </div>
            <div className="cast-item">
              <img src={member.castImage4} alt={member.castName4} />
              <p>{member.castName4}</p>
            </div>
            <div className="cast-item">
              <img src={member.castImage5} alt={member.castName5} />
              <p>{member.castName5}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Crew</h2>
      <div className="crew">
        {movie.map((member, index) => (
          <div className="crew-member" key={index}>
             <div className="crew-item">
                <img src={member.crewImage1} alt={member.crewName1} />
                <p>{member.crewName1}</p>
            </div>
            <div className="crew-item">
                <img src={member.crewImage2} alt={member.crewName2} />
                <p>{member.crewName2}</p>
            </div>
            <div className="crew-item">
                <img src={member.crewImage3} alt={member.crewName3} />
                <p>{member.crewName3}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default MovieDetails;
