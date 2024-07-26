import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Dashbord/movieplaying.css'; 
import { FaPlus } from 'react-icons/fa'; 

const Movieplaying = () => {
  const [movies, setMovies] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    moviePlay();
  }, []);

  const moviePlay = async () => {
    try {
      const response = await axios.post("http://localhost:5165/fetchmoviePlaying", { eventID: "1001" });
      console.log("API Response:", response.data); 
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.users) {
          setMovies(responseData.rData.users);
          console.log("Movies:", responseData.rData.users);
        } else {
          console.log("No movie data in response");
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id); 
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("http://localhost:5165/deleteMoviePlaying", {
        eventID: "1001",
        addInfo: { id }
      });
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData.rMessage === "DELETE SUCCESSFULLY.") {
          setMovies(movies.filter(movie => movie.id !== id)); 
        }
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <>
    
      <h2 className="movies-title">Movies Now Playing Details</h2>
      <button className="add-movie-button" onClick={() => navigate('/admin/addmovieplaying')}>
          <FaPlus /> Add Movie
        </button>
      <div className="movieplaying-container">
        
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`movie-card ${expandedCard === movie.id ? 'expanded' : ''}`}
            onClick={() => handleCardClick(movie.id)}
          >
            <img src={movie.image} alt={movie.name} className="movie-image" />
            <div className="movie-details">
              <h3 className="movie-name">{movie.name}</h3>
              <p className="movie-description">{movie.description}</p>
              {expandedCard === movie.id && (
                <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(movie.id); }}>
                  Delete Movie
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Movieplaying;
