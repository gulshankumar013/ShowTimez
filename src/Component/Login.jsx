import React, { useState } from 'react';
import '../css/login.css'; // Import CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eventID: "1001",
      addInfo: {
        email: formData.email,
        password: formData.password,
      }
    };
    console.log(payload, "payload");
    try {
      const response = await axios.post('http://localhost:5164/signin', payload);
      console.log(response, 'response api');
      if (response.data.rData.rMessage === "Signin Successful") {
        // setPopupMessage('Login successful!');
        // setPopupType('success');
        toast.success("Login successful!")
        
        try {
          const response2 = await axios.post("http://localhost:5164/fetchUser", {
            eventID: "1001",
            addInfo: {
              email: formData.email
            }
          });
          console.log("response2", response2);

          // Store the entire user data in session storage
          sessionStorage.setItem("userData", JSON.stringify(response2.data.rData));
        } catch (error) {
          console.error(error.message);
        }

        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          navigate("/");
        }, 1000); // Redirect after 1 second
      } else {
        setPopupMessage('Invalid email or password!');
        setPopupType('error');
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
        }, 2000); // Hide popup after 2 seconds
      }
    } catch (error) {
      console.error('Error logging in:', error);

      setPopupMessage('Invalid email or password!');
      setPopupType('error');
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 2000); // Hide popup after 2 seconds
    }
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
