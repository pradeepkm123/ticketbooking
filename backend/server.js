// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const app = express();
// const bodyParser = require('body-parser');

// // Connect Database
// connectDB();

// // Init Middleware
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

// let tickets = [];


// // POST endpoint to store booking details
// app.post('/api/bookings/tickets', (req, res) => {
//   const booking = req.body;
//   booking._id = tickets.length + 1; // Simple ID generation
//   tickets.push(booking);
//   res.status(201).send(booking);
// });

// // GET endpoint to retrieve booking details
// app.get('/api/bookings/tickets', (req, res) => {
//   res.status(200).send(tickets);
// });


// // Define Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/buses', require('./routes/busRoutes'));
// app.use('/api/bookings', require('./routes/bookingRoutes'));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

let tickets = [];

// POST endpoint to store booking details
app.post('/api/bookings/tickets', (req, res) => {
  const booking = req.body;
  booking._id = uuidv4(); // Generate a unique ID
  tickets.push(booking);
  res.status(201).send(booking);
});

// GET endpoint to retrieve booking details
app.get('/api/bookings/tickets', (req, res) => {
  res.status(200).send(tickets);
});

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/buses', require('./routes/busRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
