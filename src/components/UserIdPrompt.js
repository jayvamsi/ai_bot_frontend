import React, { useState } from 'react';
import './UserIdPrompt.css';
import logo from '../assets/jay-logo.png'; // 👈 Make sure this path is correct

function UserIdPrompt({ onSubmit }) {
  const [inputId, setInputId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputId.trim()) {
      onSubmit(inputId.trim());
    }
  };

  return (
    <div className="user-id-prompt">
      <form onSubmit={handleSubmit} className="user-id-form">
        <img src={logo} alt="JAY Logo" className="jay-logo" /> {/* Logo added */}
        <h2>👋 Welcome! Enter Your User ID</h2>
        <input
          type="text"
          placeholder="Enter user ID..."
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button type="submit">Start Chat</button>
      </form>
    </div>
  );
}

export default UserIdPrompt;
