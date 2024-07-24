import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faUsers, faGlobe, faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../css/aboutus.css';
import Footer from './Footer';

const AboutUs = () => {
    return (
        <>
        <div className='about-us'>
            <div className='about-us-image'>
                <img src="profile-banner.jpg" alt="Profile Banner" />
                <h1>About Us</h1>
            </div>
            <div className='about-section2'>
                <img src="about3.jpg" alt="Background" />
                <div className='about-content'>
                    <div className='about-item'>
                        <div className='about-icon'>
                            <FontAwesomeIcon icon={faFilm} />
                        </div>
                        <h2>Welcome to Show Timez</h2>
                        <p>
                            At Show Timez, we bring you the latest movies and entertainment news. Our team is dedicated to providing you with a seamless and enjoyable movie-watching experience.
                        </p>
                    </div>
                    <div className='about-item'>
                        <div className='about-icon'>
                            <FontAwesomeIcon icon={faUsers} />
                        </div>
                        <h2>Our Team</h2>
                        <p>
                            Our passionate and skilled team works tirelessly to ensure that you have access to the best content and a user-friendly platform.
                        </p>
                    </div>
                    <div className='about-item'>
                        <div className='about-icon'>
                            <FontAwesomeIcon icon={faGlobe} />
                        </div>
                        <h2>Our Mission</h2>
                        <p>
                            We aim to connect movie lovers from all around the world and provide them with a platform to discover and enjoy their favorite films.
                        </p>
                    </div>
                    <div className='about-item'>
                        <div className='about-icon'>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <h2>Why Choose Us?</h2>
                        <p>
                            We offer a curated selection of movies, user-friendly interfaces, and the latest in entertainment technology to enhance your viewing experience.
                        </p>
                    </div>
                    <div className='about-item'>
                        <div className='about-icon'>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        <h2>Our Values</h2>
                        <p>
                            We believe in creating a community of movie enthusiasts who share a passion for films and storytelling. Our values are centered around quality, innovation, and customer satisfaction.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default AboutUs;
