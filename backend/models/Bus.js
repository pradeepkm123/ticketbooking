const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  busName: {
    type: String,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  schedule: [
    {
      departureTime: {
        type: String,
        required: true,
      },
      arrivalTime: {
        type: String,
        required: true,
      },
      startingPoint: {
        type: String,
        required: true,
      },
      destination: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      currentPrice: {
        type: String,
        required: true,
      },
      originalPrice: {
        type: String,
        required: true,
      },
      busType: {
        type: String,
        required: true,
      },
      boardingPoints: {
        type: String,
        required: true,
      },
      droppingPoints: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Bus', BusSchema);
