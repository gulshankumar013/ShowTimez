import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../css/verifyEmail.css";

const VerifyEmail = () => {
  const [email, setEmail] = useState('');

  // Prevent navigating back in the browser
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Email submitted:', email);

    const payload = {
      eventID: "1001",
      addInfo: {
        email: email
      }
    };

    try {
      const response = await axios.post('http://localhost:5165/generateOtp', payload);
      console.log(response.data, 'api response'); // Log the entire response

      // Safely access response properties with optional chaining and nullish coalescing
      const res = response.data.result.rData;

      if (res === 'Your OTP is: ' + otp) {
        alert(res);
      } else {
        alert(res || 'Failed to send OTP');
      }
    } catch (error) {
      // console.error('Error sending OTP:', error);
      alert('Otp send Sucessfully');
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-header">
        <img src="profile-banner.jpg" alt="Header Image" className="verify-header-image" />
        <h1>Verify Your Email</h1>
      </div>
      <div className="verify-container">
        <h2>Enter Your Email ID</h2>
        <form className="verify-form" onSubmit={handleSubmit}>
          <label>
            Email Address*
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <button type="submit" className="verify-button">Send</button>
          <Link to="/otpverify">
            <button type="button" className="verify-button">Verify</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
