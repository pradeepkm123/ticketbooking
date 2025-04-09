const Booking = require('../models/Booking');
const Bus = require('../models/Bus');

exports.bookSeat = async (req, res) => {
  const { userId, busId, seatNumber, departureTime, ticketPrice, name, phone, age } = req.body;
  try {
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ msg: 'Bus not found' });
    }
    const booking = new Booking({
      user: userId,
      bus: busId,
      seatNumber,
      departureTime,
      ticketPrice,
      name,
      phone,
      age,
    });
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('bus');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
