import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Default credentials
    const defaultUsername = 'admin';
    const defaultPassword = 'password123';

    if (username === defaultUsername && password === defaultPassword) {
      // Simulate login success
      localStorage.setItem('token', 'dummy-token'); // Replace with actual token if needed
      navigate('/update-schedule');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div id='ban'>
      <div class="Admin-container">
      <h2>Admin Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
            <div class="mb-3">
            <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} className='form-controls'
          required
        />
            </div>
            
            <div class="mb-3 password-field">
            <input
          type="password"
          placeholder="Password"
          value={password} className='form-controls'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
            </div>
            
            <button type="submit" class="btn btn-signin">Sign in</button>
        </form>
    </div>
    </div>
  );
};

export default AdminLogin;
