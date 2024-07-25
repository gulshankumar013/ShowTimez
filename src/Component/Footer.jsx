import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/footer.css';
import { toast } from 'react-toastify';

const Footer = () => {
    const navigate = useNavigate();
    const subscribe = () =>{
        toast.success("Thanks for Subcsribing")
    }

    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h2 className="footer-logo">ShowTimez</h2>
                    <p>Buy movie tickets easily with Aovis system nationwide</p>
                    <button className="get-ticket-btn" onClick={() => navigate("/profile")}>
                        Get Your Ticket
                    </button>
                </div>
                <div className="footer-sections">
                    <div className="footer-section">
                        <h3>Movies</h3>
                        <ul>
                            <Link><li>Action</li></Link>
                            <Link><li>Adventure</li></Link>
                            <Link><li>Animation</li></Link>
                            <Link><li>Comedy</li></Link>
                            <Link><li>Crime</li></Link>
                            
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Links</h3>
                        <ul>
                            <Link to={"/aboutus"}> <li>About</li></Link>
                            <Link to={"/profile"}> <li>My account</li></Link>
                           <Link><li>News</li></Link>
                            <Link><li>Latest Events</li></Link>
                            <Link to={"/contactus"}><li>Contact</li></Link>
                            
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Newsletter</h3>
                        <p>Subscribe to ShowTimez newsletter this very day.</p>
                        <input id='email-input' type="email" placeholder="Email Address" />
                        <div className="newsletter-subscribe">
                            <input type="checkbox" id="terms" />
                            <label htmlFor="terms">I agree to all terms and policies of the company</label>
                            <button className="subscribe-btn" onClick={subscribe} >➔</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="social-media">
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-pinterest"></i>
                    <i className="fab fa-instagram"></i>
                </div>
            </div>
            <div className='footer-bottom-copy'>
                <p>© Copyright 2023 by ShowTimez.com</p>
            </div>
        </div>
    );
};

export default Footer;
