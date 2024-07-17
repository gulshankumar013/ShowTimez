import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import "../css/theaterList.css"; // Import your CSS for additional styling if needed

const TheaterList = () => {
  const location = useLocation();
  const { image, aboutMovie, name, movie_time } = location.state || {}; // Provide a default value if location.state is null

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
      </div>
      <Footer />
    </>
  );
}

export default TheaterList;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './TheaterList.css';

// const TheaterList = () => {
//   const [movieDetails, setMovieDetails] = useState({});
//   const [theaters, setTheaters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedTheater, setExpandedTheater] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const movieResponse = await axios.get('/api/movie'); // Replace with your API endpoint
//         const theaterResponse = await axios.get('/api/theaters'); // Replace with your API endpoint
        
//         console.log('Movie Response:', movieResponse.data);
//         console.log('Theater Response:', theaterResponse.data);
        
//         setMovieDetails(movieResponse.data);
//         setTheaters(Array.isArray(theaterResponse.data) ? theaterResponse.data : []);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data', error);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleExpand = (theaterId) => {
//     setExpandedTheater(expandedTheater === theaterId ? null : theaterId);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="theater-list">
//       <div className="movie-details">
//         <img src={movieDetails.image} alt={movieDetails.title} />
//         <h1>{movieDetails.title}</h1>
//         <p>{movieDetails.description}</p>
//       </div>
//       <div className='booking-movie-child'>
//         {theaters.map((theater) => (
//           <div key={theater.id} className="theater">
//             <div className="theater-header">
//               <h2>{theater.name}</h2>
//               <span>{theater.distance} km away</span>
//               <button onClick={() => handleExpand(theater.id)} className="expand-btn">
//                 {expandedTheater === theater.id ? '-' : '+'}
//               </button>
//             </div>
//             {expandedTheater === theater.id && (
//               <div className="showtimes">
//                 {theater.showtimes.map((time) => (
//                   <button key={time} className="showtime">{time}</button>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TheaterList;
