import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateSchedule.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const UpdateSchedule = () => {
  const [buses, setBuses] = useState([]);
  const [busName, setBusName] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [busType, setBusType] = useState('');
  const [boardingPoints, setBoardingPoints] = useState('');
  const [droppingPoints, setDroppingPoints] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await axios.get('https://ticketbooking-es95.onrender.com/api/buses');
      setBuses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    if (!busName || !totalSeats || !departureTime || !arrivalTime || !startingPoint || !destination || !duration || !currentPrice || !originalPrice || !busType || !boardingPoints || !droppingPoints) {
      alert('Please fill out all fields');
      return;
    }

    const newBus = {
      busName,
      totalSeats,
      busType,
      originalPrice,
      currentPrice,
      boardingPoints,
      droppingPoints,
      schedule: [
        {
          departureTime,
          arrivalTime,
          startingPoint,
          destination,
          duration,
          currentPrice,
          originalPrice,
          busType,
          boardingPoints,
          droppingPoints,
        },
      ],
    };

    console.log('New Bus Data:', newBus); // Log the new bus data

    try {
      await axios.post('https://ticketbooking-es95.onrender.com/api/buses/add', newBus);
      fetchBuses();
      setBusName('');
      setTotalSeats('');
      setDepartureTime('');
      setArrivalTime('');
      setStartingPoint('');
      setDestination('');
      setDuration('');
      setCurrentPrice('');
      setOriginalPrice('');
      setBusType('');
      setBoardingPoints('');
      setDroppingPoints('');
      setIsModalOpen(false); // Close the modal after adding the bus
    } catch (err) {
      console.error('Error adding bus:', err);
      alert('Failed to add bus');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="header">
          <h1>Update Schedule</h1>
          <div className="btn-group">
            <Link to="/view-bookings" className="btn-add">
              View Bookings
            </Link>
            <button className="btn-add" onClick={openModal}>
              Add <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>Add Bus</h2>
              <form className="row g-3 needs-validation" onSubmit={handleAddBus}>
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">Bus Name</label>
                  <input
                    type="text"
                    placeholder="Enter bus name"
                    value={busName}
                    className="form-control"
                    onChange={(e) => setBusName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">Total Seats</label>
                  <input
                    type="number"
                    placeholder="Enter total seats"
                    value={totalSeats}
                    className="form-control"
                    onChange={(e) => setTotalSeats(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">Departure Time</label>
                  <input
                    type="text"
                    placeholder="Enter departure time"
                    value={departureTime}
                    className="form-control"
                    onChange={(e) => setDepartureTime(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">Arrival Time</label>
                  <input
                    type="text"
                    placeholder="Enter arrival time"
                    value={arrivalTime}
                    className="form-control"
                    onChange={(e) => setArrivalTime(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">Starting Point</label>
                  <input
                    type="text"
                    placeholder="Enter starting point"
                    value={startingPoint}
                    className="form-control"
                    onChange={(e) => setStartingPoint(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">Destination</label>
                  <input
                    type="text"
                    placeholder="Enter your destination"
                    value={destination}
                    className="form-control"
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">Duration</label>
                  <input
                    type="text"
                    placeholder="Enter duration"
                    value={duration}
                    className="form-control"
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">Current Price</label>
                  <input
                    type="number"
                    placeholder="Enter current price"
                    value={currentPrice}
                    className="form-control"
                    onChange={(e) => setCurrentPrice(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">Original Price</label>
                  <input
                    type="number"
                    placeholder="Enter original price"
                    value={originalPrice}
                    className="form-control"
                    onChange={(e) => setOriginalPrice(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">Bus Type</label>
                  <input
                    type="text"
                    placeholder="Enter bus type"
                    value={busType}
                    className="form-control"
                    onChange={(e) => setBusType(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">Boarding Points</label>
                  <input
                    type="text"
                    placeholder="Enter boarding points"
                    value={boardingPoints}
                    className="form-control"
                    onChange={(e) => setBoardingPoints(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">Dropping Points</label>
                  <input
                    type="text"
                    placeholder="Enter dropping points"
                    value={droppingPoints}
                    className="form-control"
                    onChange={(e) => setDroppingPoints(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Bus Name</th>
                <th>Total Seats</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Starting Point</th>
                <th>Destination</th>
                <th>Duration</th>
                <th>Current Price</th>
                <th>Original Price</th>
                <th>Bus Type</th>
                <th>Boarding Points</th>
                <th>Dropping Points</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus._id}>
                  <td>{bus.busName}</td>
                  <td>{bus.totalSeats}</td>
                  <td>{bus.schedule[0]?.departureTime}</td>
                  <td>{bus.schedule[0]?.arrivalTime}</td>
                  <td>{bus.schedule[0]?.startingPoint}</td>
                  <td>{bus.schedule[0]?.destination}</td>
                  <td>{bus.schedule[0]?.duration}</td>
                  <td>{bus.schedule[0]?.currentPrice}</td>
                  <td>{bus.schedule[0]?.originalPrice}</td>
                  <td>{bus.schedule[0]?.busType}</td>
                  <td>{bus.schedule[0]?.boardingPoints}</td>
                  <td>{bus.schedule[0]?.droppingPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpdateSchedule;
