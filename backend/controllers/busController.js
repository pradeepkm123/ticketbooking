const Bus = require('../models/Bus');

exports.addBus = async (req, res) => {
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
};
exports.updateSchedule = async (req, res) => {
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
};
exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
