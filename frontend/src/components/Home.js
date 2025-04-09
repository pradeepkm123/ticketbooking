import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [from, setFrom] = useState('Chennai');
  const [to, setTo] = useState('Bangalore');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
  });

  const navigate = useNavigate();

  const handleDateClick = () => {
    // Implement date picker logic here
    // For simplicity, we'll just log the action
    console.log('Date picker clicked');
  };

  const handleTomorrowClick = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toLocaleDateString('en-GB'));
  };

  const handleSearchClick = () => {
    navigate('/checkschedule');
  };

  return (
    <div>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-3 logo-container">
              <a href="#" className="logo">
                Express<span>bus</span>
              </a>
            </div>
            <div className="col-md-9 mt-2">
              <nav>
                <ul className="nav-menu">
                  <li className="nav-item">
                    <Link to="/admin-login">
                      <a href="#" className="nav-link">
                        <i className="fa-solid fa-gears nav-icon"></i> Admin Login
                      </a>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/view-tickets">
                      <a href="#" className="nav-link">
                        <i className="fas fa-ticket-alt nav-icon"></i> View Tickets
                      </a>
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link to="/login">
                      <a href="#" className="nav-link">
                        <i className="fas fa-user nav-icon"></i> Login
                      </a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Book Bus Tickets</h1>
          <div className="booking-form">
            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="input-icon-container">
                  <i className="fas fa-bus input-icon"></i>
                  <select
                    className="form-control input-with-icon"
                    value={from} id='fc'
                    onChange={(e) => setFrom(e.target.value)}
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>
              <div className="col-md-1 mb-3">
                <div className="swap-btn">
                  <i className="fas fa-exchange-alt"></i>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="input-icon-container">
                  <i className="fas fa-map-marker-alt input-icon"></i>
                  <select
                    className="form-control input-with-icon"
                    value={to} id='fc'
                    onChange={(e) => setTo(e.target.value)}
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Kolkata">Kolkata</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="input-icon-container">
                  <i className="far fa-calendar input-icon" onClick={handleDateClick}></i>
                  <input
                    type="text"
                    className="form-control input-with-icon"
                    placeholder="Date"
                    value={date} id='fc'
                    readOnly
                  />
                </div>
                <div className="date-selection">
                  <div className="date-btn" onClick={() => setDate(new Date().toLocaleDateString('en-GB'))}>
                    Today
                  </div>
                  <div className="date-btn" onClick={handleTomorrowClick}>
                    Tomorrow
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3">
              <Link to="/check-schedules">
              <button className="search-btn" onClick={handleSearchClick}>
                  Search
                </button>
                    </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="landscape">
          <div className="city"></div>
          <div className="houses"></div>
          <div className="mountains"></div>
          <div className="trees"></div>
          <div className="road"></div>
          <div className="bus"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
