import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookSeat.css';

function BookSeat() {
  const location = useLocation();
  const navigate = useNavigate();
  const { busId, totalSeats, busName, schedule, departureTime, currentPrice } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    age: '',
  });

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get(`https://ticketbooking-es95.onrender.com/api/bookings/booked-seats/${busId}`);
        setBookedSeats(response.data.bookedSeats);
      } catch (error) {
        console.error('Error fetching booked seats:', error);
      }
    };

    fetchBookedSeats();
  }, [busId]);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return; // Do not allow selecting booked seats
    }
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBookingConfirmation = async () => {
    const bookingDetails = {
      user: userDetails,
      bus: {
        busId,
        busName,
        schedule: [{ startingPoint: schedule.startingPoint, destination: schedule.destination }],
      },
      selectedSeats: selectedSeats,
      departureTime,
      currentPrice,
    };

    try {
      await axios.post('https://ticketbooking-es95.onrender.com/api/bookings/tickets', bookingDetails);
      navigate('/ticket-confirmation', { state: { booking: bookingDetails } });
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  return (
    <div>
      <div className="container seat-selection-container">
        <div className="row">
          <div className="col-md-7">
            <div className="seat-header">
              <div>
                <h5 className="mb-0">{totalSeats} Seats Available</h5>
                <small className="text-muted">Click on seat to select/deselect</small>
              </div>
            </div>

            <div className="seat-legend">
              <div className="legend-item">
                <div className="legend-box bg-white"></div>
                <span>Available Seats</span>
              </div>
              <div className="legend-item">
                <div className="legend-box bg-pink" style={{ backgroundColor: '#ffcdd2' }}></div>
                <span>Available for Female</span>
              </div>
              <div className="legend-item">
                <div className="legend-box bg-secondary" style={{ backgroundColor: '#ccc' }}></div>
                <span>Booked Seats</span>
              </div>
              <div className="legend-item">
                <div className="legend-box bg-info" style={{ backgroundColor: '#bbdefb' }}></div>
                <span>Available for Male</span>
              </div>
              <div className="legend-item">
                <div className="legend-box bg-success" style={{ backgroundColor: '#c8e6c9' }}></div>
                <span>Selected Seats</span>
              </div>
            </div>

            <div className="seats-container align-items-center" style={{ borderRadius: '0px', marginBottom: '0px' }}>
              <div className="steering-wheel">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                </svg>
              </div>
              <div className="number-seat-grid">
                {Array.from({ length: totalSeats }, (_, index) => {
                  const seatNumber = index + 1;
                  const isBooked = bookedSeats.includes(seatNumber);
                  return (
                    <div
                      key={index}
                      className={`seat ${isBooked ? 'booked' : selectedSeats.includes(seatNumber) ? 'selected' : 'available'}`}
                      onClick={() => handleSeatClick(seatNumber)}
                    >
                      {seatNumber}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-md-5" style={{ padding: '20px' }}>
            <div className="search-container position-relative">
              <label>Enter your Name</label>
              <input type="text" className="form-control" name="name" value={userDetails.name} onChange={handleInputChange} />
            </div>
            <div className="mb-2">
              <label>Enter Mobile No</label>
              <input type="text" className="form-control" name="phone" value={userDetails.phone} onChange={handleInputChange} />
            </div>
            <div className="mb-2">
              <label>Age</label>
              <input type="text" className="form-control" name="age" value={userDetails.age} onChange={handleInputChange} />
            </div>
            <div>
              <label>Seat No</label>
              <input type="text" className="form-control" value={selectedSeats.join(', ')} readOnly />
            </div>

            <div className="text-center mt-4">
              <button className='continue-btn' onClick={handleBookingConfirmation}>Select seats to continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookSeat;
