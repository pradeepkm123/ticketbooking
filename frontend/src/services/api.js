import axios from 'axios';

// Set up a base URL for your API
const API_URL = 'http://localhost:5000/api'; // Update with your API base URL

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: API_URL,
});

const createBooking = async (bookingData) => {
    // Example API call to create a booking
    await axios.post('http://localhost:5000/api/bookings', bookingData);
  };
  

// Function to set the Authorization header with the token from localStorage
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Example API calls

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login a user
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add a new bus
export const addBus = async (busData, token) => {
  setAuthToken(token);
  try {
    const response = await api.post('/buses/add', busData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update bus schedule
export const updateBusSchedule = async (scheduleData, token) => {
  setAuthToken(token);
  try {
    const response = await api.post('/buses/update-schedule', scheduleData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all buses
export const getBuses = async () => {
  try {
    const response = await api.get('/buses');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Book a seat
export const bookSeat = async (bookingData, token) => {
  setAuthToken(token);
  try {
    const response = await api.post('/bookings/book', bookingData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all bookings
export const getBookings = async (token) => {
  setAuthToken(token);
  try {
    const response = await api.get('/bookings');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
