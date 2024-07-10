import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../css/landing.css'; // Import your CSS for additional styling if needed
import VideoPlayer from './VideoPlayer';

const Landing = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <div className="carousel-container">
        <Slider {...settings}>
          <div className="carousel-slide">
            <img src="banner1.jpg" alt="Slide 1" />
            <div className="carousel-content">
              <h2>The Witcher Season 3</h2>
              <p>Written By Javier Grillo-Marxuach & Directed by Stephen Surjik</p>
              <button>Book Ticket</button>
            </div>
          </div>
          <div className="carousel-slide">
            <img src="banner2.jpg" alt="Slide 2" />
            <div className="carousel-content">
              <h2>Wrong Turn Part 2</h2>
              <p>Written and Directed By Alisa Rose/Ireland 2024</p>
              <button>Book Ticket</button>
            </div>
          </div>
          <div className="carousel-slide">
            <img src="banner3.avif" alt="Slide 3" />
            <div className="carousel-content">
              <h2>IF</h2>
              <p>Written & Directed By John Krasinski/2024</p>
              <button>Book Ticket</button>
            </div>
          </div>
          <div className="carousel-slide">
            <img src="banner4.jpg" alt="Slide 4" />
            <div className="carousel-content">
              <h2>The Garfield Movie</h2>
              <p>Directed By Mark DIndal</p>
              <button>Book Ticket</button>
            </div>
          </div>
          <div className="carousel-slide">
            <img src="banner5.jpg" alt="Slide 5" />
            <div className="carousel-content">
              <h2>KALKI 2898-AD</h2>
              <p>Directed By Nag Aswin.</p>
              <button>Book Ticket</button>
            </div>
          </div>
          <div className="carousel-slide">
            <img src="banner6.jpg" alt="Slide 6" />
            <div className="carousel-content">
              <h2>FURIOSA</h2>
              <p>Directed By George Miller</p>
              <button>Book Ticket</button>
            </div>
          </div>
        </Slider>
        <div className='line-image'>
            <img src="imageline.jpg" alt="" />
        </div>
        <h3>Watch Trailer</h3>
      </div>
      
      <div className="video-section">
        {/* Video Section 1 */}
        <div className="video-item">
        <iframe width="430" height="230" src="https://www.youtube.com/embed/9nBv_TtF0RQ?si=JVIWWW0-vX3DUo-E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div className="video-content">
          </div>
        </div>

        {/* Video Section 2 */}
        <div className="video-item">
        <iframe width="430" height="230" src="https://www.youtube.com/embed/mb2187ZQtBE?si=suHHT1PxZdmn9qsG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div className="video-content">
          </div>
        </div>

        <div className="video-item">
        <iframe width="430" height="230" src="https://www.youtube.com/embed/kQDd1AhGIHk?si=6lSnySVTHqpAs7qS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div className="video-content">
            
          </div>
        </div>

        <div className="video-item">
        <iframe width="430" height="230" src="https://www.youtube.com/embed/IeFWNtMo1Fs?si=TcmU-n3o1IbDq8xT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div className="video-content">
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Landing;
