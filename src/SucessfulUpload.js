// SuccessPage.jsx
import React from 'react';
import './SuccessPage.css';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const hist=useNavigate();
  const handleClick = () => {
    hist('/Admin-logged-page')
  };

  return (
    <div className="container">
      <div className="success-message">
        <div className="icon">
          <span>✓</span>
        </div>
        <h1>Successfully Created!</h1>
        <p>Your content has been created successfully.</p>
        <button className="continue-button" onClick={handleClick}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
