import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';

const Register = () => {
  // It is used for eye icons for password
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // This is the api use for set user data in database
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const payload = {
      eventID: "1001",
      addInfo: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
      },
    };
    try {
      const response = await axios.post('http://localhost:5164/signup', payload);
      console.log(response.data, 'api response'); // Handle response
      setShowPopup(true); // Show the popup after successful signup
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error
    }
  };

  const handleClosePopup = () => {
    const popupContent = document.querySelector('.signup-popup-content');
    popupContent.classList.add('slide-out');
    setTimeout(() => {
      setShowPopup(false);
      navigate('/login'); // Redirect to the login page after closing the popup
    }, 500); // Match this duration with your animation duration
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
            <Link to="/login">Login</Link>
            <Link to="/register" className="active-tab">Register</Link>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Name<span>*</span>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} />
            </label>
            <label>
              Email<span>*</span>
              <input type="text" name="email" required value={formData.email} onChange={handleChange} />
            </label>
            <label>
              Phone No<span>*</span>
              <input type="number" name="mobile" required value={formData.mobile} onChange={handleChange} />
            </label>
            <label className="password-label">
              Password <span>*</span>
              <div className="password-input">
                <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleChange} />
                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </label>
            <button id='login-button' type="submit">Sign up</button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Register;
