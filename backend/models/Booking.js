// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    name: String,
    phone: String,
    age: Number,
  },
  bus: {
    busId: String,
    busName: String,
    schedule: [{
      startingPoint: String,
      destination: String,
    }],
  },
  selectedSeats: [Number],
  departureTime: String,
  currentPrice: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
