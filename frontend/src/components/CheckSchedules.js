import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CheckSchedules.css';

const CheckSchedules = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:5000/api/buses');
      setBuses(res.data);
    } catch (err) {
      setError('Error fetching bus schedules. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSeat = (busId, totalSeats, busName, schedule, departureTime, currentPrice) => {
    navigate('/book-seat', {
      state: {
        busId,
        totalSeats,
        busName,
        schedule,
        departureTime,
        currentPrice
      }
    });
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="header">
          <h1>Check Schedules</h1>
        </div>
        <div className="sort-by">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex overflow-auto">
                <div className="me-2">Sort By:</div>
                <div className="sort-option active">Price</div>
                <div className="sort-option">Seats</div>
                <div className="sort-option">Ratings</div>
                <div className="sort-option">Arrival Time</div>
                <div className="sort-option">Departure Time</div>
              </div>
              <div className="text-secondary d-none d-md-block">
                <i className="fas fa-bus me-2"></i>Showing {buses.length} Buses on this route
              </div>
            </div>
            <div className="text-secondary d-block d-md-none mt-2">
              <i className="fas fa-bus me-2"></i>Showing {buses.length} Buses on this route
            </div>
          </div>
        </div>

        <div className="container mt-3">
          <div className="row">
            <div className="col-12 d-md-none mb-3">
              <button className="btn btn-outline-secondary w-100" type="button" data-bs-toggle="collapse" data-bs-target="#filtersCollapse">
                Filters <i className="fas fa-filter ms-1"></i>
              </button>
            </div>
            <div className="col-12 col-md-3 collapse d-md-block" id="filtersCollapse">
              <div className="filter-section">
                <div className="filter-title">Filters</div>
              </div>

              <div className="filter-section">
                <div className="filter-title d-flex justify-content-between align-items-center">
                  Price Drop
                  <input type="checkbox" className="form-check-input" />
                </div>
              </div>

              <div className="filter-section">
                <div className="filter-title">Bus Type</div>
                <div className="filters">
                  <div className="row g-2">
                    <div className="col-3">
                      <div className="bus-type-option">
                        <i className="fas fa-bus"></i>
                        <div>AC</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="bus-type-option">
                        <i className="fas fa-bed"></i>
                        <div>Sleeper</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="bus-type-option">
                        <i className="fas fa-chair"></i>
                        <div>Seater</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="bus-type-option">
                        <i className="fas fa-fan"></i>
                        <div>Non AC</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-section">
                <div className="filter-title">Price Range</div>
                <div className="price-range">
                  <div className="d-flex justify-content-between">
                    <span>249</span>
                    <span>5000</span>
                  </div>
                  <input type="range" className="form-range" min="249" max="5000" value="249" />
                  <div className="d-flex justify-content-between mt-2">
                    <span>249</span>
                    <span>5000</span>
                  </div>
                </div>
              </div>

              <div className="filter-section">
                <div className="filter-title">Departure Time</div>
                <div className="filters">
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="time-option">
                        <i className="fas fa-sun"></i>
                        <div>Before 10 AM</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="time-option">
                        <i className="fas fa-cloud-sun"></i>
                        <div>10 AM - 5 PM</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="time-option">
                        <i className="fas fa-moon"></i>
                        <div>5 PM - 11 PM</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="time-option">
                        <i className="fas fa-cloud-moon"></i>
                        <div>After 11 PM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-section">
                <div className="filter-title d-flex justify-content-between align-items-center">
                  Bus Partner
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-9">
              {loading ? (
                <p>Loading bus schedules...</p>
              ) : error ? (
                <p>{error}</p>
              ) : buses.length > 0 ? (
                buses.map((bus) => (
                  <div className="bus-card" key={bus._id}>
                    <div className="row m-0">
                      <div className="col-12 col-md-3 travel-info">
                        <div className="bus-name">{bus.busName}</div>
                        <div className="bus-type">{bus.schedule[0]?.busType}</div>
                        <div className="mt-2">
                          <span className="tracking"><i className="fas fa-map-marker-alt me-1"></i> Live Tracking</span>
                        </div>
                        <div className="savings">Save min ₹{bus.savings} on this Booking</div>
                      </div>
                      <div className="col-6 col-md-2 time-info">
                        <div className="departure-time">{bus.schedule[0]?.departureTime}</div>
                        <div className="location">{bus.schedule[0]?.startingPoint}</div>
                      </div>
                      <div className="col-6 col-md-2 time-info">
                        <div className="duration">{bus.schedule[0]?.duration}</div>
                        <div className="duration-line"></div>
                      </div>
                      <div className="col-6 col-md-2 time-info" style={{ borderRight: '1px solid #eeeeee' }}>
                        <div className="arrival-time">{bus.schedule[0]?.arrivalTime}</div>
                        <div className="location">{bus.schedule[0]?.destination}</div>
                      </div>
                      <div className="col-6 col-md-3 price-info">
                        <div className="d-flex justify-content-end align-items-center">
                          <div className="text-end">
                            <div className="original-price">₹{bus.schedule[0]?.originalPrice}</div>
                            <div className="current-price">₹ {bus.schedule[0]?.currentPrice}</div>
                          </div>
                        </div>
                        <button className="select-seats-btn" onClick={() => handleBookSeat(bus._id, bus.totalSeats, bus.busName,
                          bus.schedule[0],
                          bus.schedule[0]?.departureTime,
                          bus.schedule[0]?.currentPrice)}>Select Seats</button>
                        <div className="seats-available">{bus.totalSeats} Seats Available</div>
                      </div>
                    </div>
                    <div className="additional-info">
                      <div className="rating">4.6 <i className="fas fa-star"></i></div>
                      <div className="info-dropdown">
                        <label>Boarding Points:</label>
                        {bus.schedule[0]?.boardingPoints}
                      </div>
                      <div className="info-dropdown">
                        <label>Dropping Points:</label>
                        {bus.schedule[0]?.droppingPoints}
                      </div>
                      <div className="info-dropdown d-none d-md-block">
                        Travel Policy <i className="fas fa-chevron-down ms-1"></i>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{textAlign:'center'}}>No buses available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckSchedules;
