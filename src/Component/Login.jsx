import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import "../css/login.css";
import CryptoJS from 'crypto-js';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hash = CryptoJS.MD5(formData.password).toString();
    const payload = {
      eventID: "1001",
      addInfo: {
        email: formData.email,
        password: hash,
      }
    };

    try {
      
      const adminResponse = await axios.post('http://localhost:5165/adminSignin', payload);
      if (adminResponse.data.rData.rMessage === "Login Successfully, Welcome!") {
       
        sessionStorage.setItem("adminToken", adminResponse.data.rData.token); 
        setPopupMessage('Login Successful');
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/admin");
        }, 3000); // Show popup for 3 seconds before navigating
      } else {
        
        const userResponse = await axios.post('http://localhost:5165/signin', payload);
        if (userResponse.data.rData.rMessage === "Signin Successful") {
          try {
            const response2 = await axios.post("http://localhost:5165/fetchUser", {
              eventID: "1001",
              addInfo: {
                email: formData.email
              }
            });

            sessionStorage.setItem("userData", JSON.stringify(response2.data.rData));
            setPopupMessage('Login Successful');
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false);
              navigate("/");
            }, 3000); // Show popup for 3 seconds before navigating
          } catch (error) {
            console.error(error.message);
            setPopupMessage('Error fetching user data.');
            setShowPopup(true);
          }
        } else {
          setPopupMessage('Invalid email or password');
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setPopupMessage('Error logging in. Please try again later.');
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="login-page">
        <div className="login-header">
          <img src="profile-banner.jpg" alt="Header Image" className="header-image" />
          <h1>My Account</h1>
        </div>
        <div className="login-container">
          <div className="login-tabs">
            <Link to="/login" className="active-tab">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Username or email address <span>*</span>
              <input 
                type="text" 
                name="email" 
                required 
                value={formData.email} 
                onChange={handleChange} 
              />
            </label>
            <label className="password-label">
              Password <span>*</span>
              <div className="password-input">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  required 
                  value={formData.password} 
                  onChange={handleChange} 
                />
                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </label>
            <div className="form-options">
              <label>
                Remember Me
              </label>
              <div className='checkbox'> 
                <input type="checkbox" /> 
              </div>
              <Link to="/verifyemail">Lost your password?</Link>
            </div>
            <button id='login-button' type="submit">Log in</button>
          </form>
        </div>
      </div>
      
      {showPopup && (
        <div className="login-popup-container">
          <div className="login-popup-content">
            {popupMessage === 'Login Successful' ? (
              <>
                <img src="success.png" alt="Success Icon" />
                <h2>Success!</h2>
                <p>{popupMessage}</p>
              </>
            ) : (
              <>
                <img src="error-icon.png" alt="Error Icon" />
                <h2 style={{color:"red"}}>Sorry!</h2>
                <p>{popupMessage}</p>
              </>
            )}
            <button onClick={handleClosePopup}>Okay</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Login;
