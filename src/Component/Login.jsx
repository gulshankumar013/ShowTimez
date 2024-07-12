import React, { useState } from 'react';
import '../css/login.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <Link to="/register" >Register</Link>
          </div>
          <form className="login-form">
            <label>
              Username or email address <span>*</span>
              <input type="text" required />
            </label>
            <label className="password-label">
              Password <span>*</span>
              <div className="password-input">
                <input type={showPassword ? "text" : "password"} required />
                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </label>
            <div className="form-options">
              <label>
             Remember Me
              </label>
              <div className='checkbox'> <input type="checkbox" /> </div>
              <Link to="/forgot-password">Lost your password?</Link>
            </div>
            <button id='login-button' type="submit">Log in</button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
