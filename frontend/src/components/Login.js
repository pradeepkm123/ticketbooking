import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ phone, password });
      localStorage.setItem('token', data.token);
      navigate('/check-schedules');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id='ban'>
      <div class="login-container">
        <div class="brand-side">
          <div class="brand-logo">Express Bus</div>

          <div class="features">
            <div class="feature-item">
              <div class="feature-icon"></div>
              <div class="feature-text">
                <h3>Assured</h3>
                <p>Protect yourself with upto 150% refund incase of service cancellation</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="feature-icon"></div>
              <div class="feature-text">
                <h3>Free cancellation</h3>
                <p>Protect yourself from cancellation charges and get 100% refund</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="feature-icon"></div>
              <div class="feature-text">
                <h3>4.6* Rating</h3>
                <p>India's highest rated bus platform<br />Trusted by 5+ Crore Happy Customers</p>
              </div>
            </div>
          </div>

          <img src="https://static.abhibus.com/web/media/branding/Login.svg" alt="Bus Illustration" class="bus-illustration" />
        </div>

        <div class="login-side">
          <h1 class="login-title">Login</h1>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <div class="input-label">Enter Mobile Number to Continue</div>
              <div class="phone-input">
                <div class="country-code">+91</div>
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone} class="form-control"
                  onChange={(e) => setPhone(e.target.value)} required
                />
              </div>
            </div>

            <div class="mb-3">
              <div class="input-label">Enter password</div>
              <input
                type="password"
                placeholder="Password"
                value={password} class="form-control"
                onChange={(e) => setPassword(e.target.value)} required
              />
            </div>

            <button class="login-btn" type="submit">Login</button>
          </form>
          <div style={{textAlign:'center',margin:'3%'}}><Link to="/register"><i class="fa-solid fa-key"></i> Register</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
