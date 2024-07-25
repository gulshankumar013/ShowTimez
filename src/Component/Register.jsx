
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import "../css/register.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    gender:'',
    date_of_Birth:'',
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      eventID: "1001",
      addInfo: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
        gender:formData.gender,
        date_of_Birth:formData.date_of_Birth
      },
    };
    try {
      const response = await axios.post('http://localhost:5164/signup', payload);
      console.log(response.data, 'api response');
      navigate('/login');
      
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleClosePopup = () => {
    const popupContent = document.querySelector('.register-popup-content');
    popupContent.classList.add('slide-out');
    setTimeout(() => {
      setShowPopup(false);
      
    }, 500);
  };

  return (
    <>
      <div className="register-page">
        <div className="register-header">
          <img src="profile-banner.jpg" alt="Header Image" className="header-image" />
          <h1>My Account</h1>
        </div>
        <div className="register-container">
          <div className="register-tabs">
            <Link to="/login">Login</Link>
            <Link to="/register" className="active-tab">Register</Link>
          </div>
          <form onSubmit={handleSubmit} className="register-form">
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
            <label>
              Gender<span>*</span>
              <input type="text" name="gender" required value={formData.gender} onChange={handleChange} />
            </label>
            <label>
              BirthDay<span>*</span>
              <input type="date" name="date_of_Birth" required value={formData.date_of_Birth} onChange={handleChange} />
            </label>

            <button id='register-button' type="submit">Sign up</button>
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
                <p>Account Created Successful</p>
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

export default Register;

