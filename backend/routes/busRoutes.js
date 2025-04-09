const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// Add a new bus
router.post('/add', async (req, res) => {
  const {
    busName,
    totalSeats,
    busType,
    originalPrice,
    currentPrice,
    boardingPoints,
    droppingPoints,
    schedule,
  } = req.body;

  try {
    const bus = new Bus({
      busName,
      totalSeats,
      busType,
      originalPrice,
      currentPrice,
      boardingPoints,
      droppingPoints,
      schedule,
    });
    await bus.save();
    res.json(bus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update the schedule for a bus
router.post('/update-schedule', async (req, res) => {
  const {
    busId,
    departureTime,
    arrivalTime,
    startingPoint,
    destination,
    duration,
  } = req.body;

  try {
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ msg: 'Bus not found' });
    }
    bus.schedule.push({
      departureTime,
      arrivalTime,
      startingPoint,
      destination,
      duration,
    });
    await bus.save();
    res.json(bus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all buses
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
