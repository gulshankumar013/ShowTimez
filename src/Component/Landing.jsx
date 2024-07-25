import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/landing.css"; // Import your CSS for additional styling if needed
import Footer from "./Footer";
import { Link, Navigate, useNavigate } from "react-router-dom";

const api = "http://localhost:5164/fetchmoviePlaying";
const commingApi = "http://localhost:5164/fetchUpcomingMovie";

const Landing = () => {
  const [movie, setMovie] = useState([]);
  let navigate = useNavigate()

  useEffect(() => {
    moviePlay();
  }, []);

  // Fetch now palying movies from the API
  const moviePlay = async () => {
    try {
      const response = await axios.post(api, { eventID: "1001" });
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

  // Fetch now palying movies from the API
  const [comingMovie, setComingMovie] = useState([]);

  useEffect(() => {
    upcomingMovie();
  }, []);

  const upcomingMovie = async () => {
    try {
      const response = await axios.post(commingApi, { eventID: "1001" });
      console.log("API Response:", response.data); 
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.users) {
          setComingMovie(responseData.rData.users);
          console.log("Movies:", responseData.rData.users);
        } else {
          console.log("No movie data in response");
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div>
      <div className="carousel-container">
        <Slider {...settings}>
          <div className="carousel-slide">
            <img src="banner1.jpg" alt="Slide 1" />
            <div className="carousel-content">
              <h2>The Witcher Season 3</h2>
              <p>
                Written By Javier Grillo-Marxuach & Directed by Stephen Surjik
              </p>
              
            </div>
          </div>
          <div className="carousel-slide">
            <img src="banner2.jpg" alt="Slide 2" />
            <div className="carousel-content">
              <h2>Wrong Turn Part 2</h2>
              <p>Written and Directed By Alisa Rose/Ireland 2024</p>
             
            </div>
          </div>
          <div className="carousel-slide">
            <img src="banner3.avif" alt="Slide 3" />
            <div className="carousel-content">
              <h2>IF</h2>
              <p>Written & Directed By John Krasinski/2024</p>
              
            </div>
          </div>
          <div className="carousel-slide">
            <img src="banner4.jpg" alt="Slide 4" />
            <div className="carousel-content">
              <h2>The Garfield Movie</h2>
              <p>Directed By Mark DIndal</p>
             
            </div>
          </div>
          <div className="carousel-slide">
            <img src="banner5.jpg" alt="Slide 5" />
            <div className="carousel-content">
              <h2>KALKI 2898-AD</h2>
              <p>Directed By Nag Aswin.</p>
              
            </div>
          </div>
          <div className="carousel-slide">
            <img src="banner6.jpg" alt="Slide 6" />
            <div className="carousel-content">
              <h2>FURIOSA</h2>
              <p>Directed By George Miller</p>
              
            </div>
          </div>
        </Slider>
        <div className="line-image">
          <img src="imageline.jpg" alt="" />
        </div>
        <h3>Watch Trailer</h3>
      </div>

      <div className="video-section">
        {/* Video Section 1 */}
        <div className="video-item">
          <iframe
            width="430"
            height="230"
            src="https://www.youtube.com/embed/9nBv_TtF0RQ?si=JVIWWW0-vX3DUo-E"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="video-content"></div>
        </div>

        {/* Video Section 2 */}
        <div className="video-item">
          <iframe
            width="430"
            height="230"
            src="https://www.youtube.com/embed/mb2187ZQtBE?si=suHHT1PxZdmn9qsG"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="video-content"></div>
        </div>

        <div className="video-item">
          <iframe
            width="430"
            height="230"
            src="https://www.youtube.com/embed/kQDd1AhGIHk?si=6lSnySVTHqpAs7qS"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="video-content"></div>
        </div>

        <div className="video-item">
          <iframe
            width="430"
            height="230"
            src="https://www.youtube.com/embed/IeFWNtMo1Fs?si=TcmU-n3o1IbDq8xT"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="video-content"></div>
        </div>
      </div>

      <div className="movie-playing">
        <h3>Watch New Movies</h3>
        <h1>Movie Now Playing</h1>
      </div>
      <div className="movie-playing-child">
        {movie.map((item, index) => (
          <div
            className="card-container"
            key={index}
            onClick={()=>{navigate("/moviedetails",{state: { item }})}}
          >
            <div className="card">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="card-info">
              <h2 style={{ fontWeight: "600" }}>{item.name}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="movie-playing">
        <h1>Upcomming Movie</h1>
      </div>

      <div className="premiere-child">
        <img id="popcorn" src="popcorn.png" alt="" />

        {comingMovie.map((item, index) => (
          <div className="premiere-card-container" key={index}>
            <img src={item.image} alt={item.name} />
            <div className="premiere-card-info">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <h3>{item.movie_time}</h3>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
