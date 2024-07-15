
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MovieDetails.css';


const api = "http://localhost:5164/fetchmoviePlaying";
const MovieDetails = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviePlay();
  }, []);
  const moviePlay = async () => {
    try {
      const response = await axios.post(api, { eventID: "1001" });
      console.log("API Response:", response.data); // Log the entire response
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

  return (
    <div className="movie-details">
        
      <h2>Cast</h2>
      <div className="cast">
        {movie.map((member, index) => ( 
          <div className="cast-member" key={index}>
            <img src={member.castImage1} alt={member.castImage1} />
            <p>{member.movie_time}</p>
            <p>{member.castName1}</p>
          </div>
        ))}
      </div>
      
      <h2>Crew</h2>
      <div className="crew">
        {movie.map((member, index) => (
          <div className="crew-member" key={index}>
            <img src={member.imageUrl} alt={member.name} />
            <p>{member.name}</p>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
