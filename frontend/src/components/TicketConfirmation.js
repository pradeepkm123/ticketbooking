import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Ticketconfirm.css';

const TicketConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!booking) {
    return <div>No booking data available.</div>;
  }

  // Calculate the total price based on the number of selected seats
  const totalPrice = booking.selectedSeats.length * booking.currentPrice;

  const handleConfirmation = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('https://ticketbooking-es95.onrender.com/api/bookings/tickets', booking);
      navigate('/view-tickets', { state: { booking } });
    } catch (err) {
      setError('Error confirming booking. Please try again.');
      console.error('Error confirming booking:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='ban'>
      <div className="ticket-container">
        <div className="ticket-left">
          <h1 className="route-title">{booking.bus.busName}</h1>
          <div className="share-icon">
            <i className="fas fa-share-alt"></i>
          </div>
          <div className="ticket-details">
            <div className="detail-item">
              <div className="label">Passenger Name</div>
              <div className="value">{booking.user.name}</div>
            </div>
            <div className="detail-item">
              <div className="label">Mobile No</div>
              <div className="value">{booking.user.phone}</div>
            </div>
            <div className="detail-item">
              <div className="label">Age</div>
              <div className="value">{booking.user.age}</div>
            </div>
            <div className="detail-item">
              <div className="label">Departure Time</div>
              <div className="value">{booking.departureTime}</div>
            </div>
            <div className="detail-item">
              <div className="label">Seat No</div>
              <div className="value">{booking.selectedSeats.join(', ')}</div>
            </div>
            <div className="detail-item">
              <div className="label">Route</div>
              <div className="value">{`${booking.bus.schedule[0].startingPoint} - ${booking.bus.schedule[0].destination}`}</div>
            </div>
          </div>
          <div className="total">
            <div className="total-label">Total:</div>
            <div className="total-value">{totalPrice}</div> {/* Display the calculated total price */}
          </div>
        </div>
        <div className="ticket-right">
          <div className="qr-container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" className="qr-code" />
            <button onClick={handleConfirmation} className="btn-add" disabled={loading}>
              {loading ? 'Confirming...' : 'Confirm Booking'}
            </button>
            {error && <div className="error-message">{error}</div>}
            <div className="note">
              <span className="note-tag">Note: </span>
              Scan Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmation;
