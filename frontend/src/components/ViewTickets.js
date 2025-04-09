import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewTickets = () => {
  const location = useLocation();
  const { booking } = location.state || {};

  if (!booking) {
    return <div>No booking data available.</div>;
  }

  return (
    <div>
      <div class="container mt-4">
        <div class="header">
          <h1>Your Tickets</h1>
        </div>

        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Passenger Name</th>
                <th>Mobile No</th>
                <th>Age</th>
                <th>Departure Time</th>
                <th>Seat Number</th>
                <th>Route</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{booking.user.name}</td>
                <td>{booking.user.phone}</td>
                <td>{booking.user.age}</td>
                <td>{booking.departureTime}</td>
                <td>{booking.selectedSeats.join(', ')}</td>
                <td>{`${booking.bus.schedule[0].startingPoint} - ${booking.bus.schedule[0].destination}`}</td>
                <td>{booking.currentPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewTickets;
