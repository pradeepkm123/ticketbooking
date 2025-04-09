import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/tickets');
      // Use a Map to remove duplicate bookings based on booking ID
      const uniqueBookingsMap = new Map(res.data.map(booking => [booking._id, booking]));
      const uniqueBookings = Array.from(uniqueBookingsMap.values());
      setBookings(uniqueBookings);
    } catch (err) {
      setError('Error fetching bookings. Please try again later.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="header">
          <h1>View Bookings</h1>
        </div>
        <div className="table-container">
          {loading ? (
            <p>Loading bookings...</p>
          ) : error ? (
            <p>{error}</p>
          ) : bookings.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Bus Name</th>
                  <th>Route</th>
                  <th>Departure Time</th>
                  <th>Seat Number</th>
                  <th>Ticket Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  // Calculate the total price for each booking
                  const totalPrice = booking.selectedSeats.length * booking.currentPrice;
                  return (
                    <tr key={booking._id}>
                      <td>{booking._id}</td>
                      <td>{booking.user.name}</td>
                      <td>{booking.user.phone}</td>
                      <td>{booking.bus.busName}</td>
                      <td>{`${booking.bus.schedule[0].startingPoint} - ${booking.bus.schedule[0].destination}`}</td>
                      <td>{booking.departureTime}</td>
                      <td>{booking.selectedSeats.join(', ')}</td>
                      <td>{totalPrice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p style={{textAlign:'center'}}>No bookings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;
