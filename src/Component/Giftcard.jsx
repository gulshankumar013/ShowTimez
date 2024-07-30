import React, { useState } from 'react';
import '../Component/Giftcard.css';

const Giftcard = () => {
  const [giftCardNumber, setGiftCardNumber] = useState('');

  const handleChange = (e) => {
    setGiftCardNumber(e.target.value);
  };

  const handleRedeem = () => {
    // Add redeem logic here
    alert(`Redeeming gift card: ${giftCardNumber}`);
  };

  return (
    <div className="giftcard-container">
      <h2>Enter Your Gift Card Number</h2>
      <div className="giftcard-form">
        <input
          type="text"
          placeholder="Gift Card Number"
          value={giftCardNumber}
          onChange={handleChange}
          className="giftcard-input"
        />
        <button onClick={handleRedeem} className="giftcard-button">
          Redeem Code
        </button>
      </div>
    </div>
  );
}

export default Giftcard;
