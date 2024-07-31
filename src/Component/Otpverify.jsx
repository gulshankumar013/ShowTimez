import React, { useState } from 'react';
import axios from 'axios';
import "../css/otpverify.css";

const Otpverify = () => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('OTP submitted:', otp);

    const payload = {
      eventID: "1002",
      addInfo: {
        otp: otp
      }
    };

    try {
      const response = await axios.post('http://localhost:5165/verifyOtp', payload);
      console.log(response.data, 'api response'); // Log the entire response

      const res = response.data.result?.rData ?? 'No rData property found';

      if (res === 'OTP verified successfully') {
        alert(res);
      } else {
        alert(res || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-header">
        <img src="profile-banner.jpg" alt="Header Image" className="verify-header-image" />
        <h1>Verify Your OTP</h1>
      </div>
      <div className="verify-container">
        <h2>Enter Your OTP</h2>
        <form className="verify-form" onSubmit={handleSubmit}>
          <label>
            OTP*
            <input
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              onChange={handleOtpChange}
              required
            />
          </label>
          <button type="submit" className="verify-button">Verify</button>
        </form>
      </div>
    </div>
  );
}

export default Otpverify;
