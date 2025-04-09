const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

// MSG91 API configuration
const msg91ApiKey = '445992Av2hJfz4Hy67f34e4bP1'; // Replace with your MSG91 API key

// In-memory store for OTPs
const otpStore = {};

// Send OTP via MSG91
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

  // Store OTP in the in-memory store
  otpStore[phone] = otp;

  const message = `Your OTP is ${otp}`;

  try {
    const response = await axios.get('https://api.msg91.com/api/sendhttp.php', {
      params: {
        authkey: "445992Av2hJfz4Hy67f34e4bP1",
        mobiles: phone,
        message: message,
        sender: 'SENDER_ID', // Replace with your sender ID
        route: '4', // Route 4 is for transactional messages
      },
    });

    if (response.data.type === 'success') {
      res.status(200).json({ msg: 'OTP sent' });
    } else {
      res.status(500).json({ msg: 'Failed to send OTP', error: response.data.message });
    }
  } catch (err) {
    console.error('Error sending OTP:', err.message);
    res.status(500).json({ msg: 'Failed to send OTP', error: err.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  // Verify OTP from the in-memory store
  if (otpStore[phone] && otpStore[phone] === otp) {
    res.status(200).json({ msg: 'OTP verified' });
    // Clear the OTP after successful verification
    delete otpStore[phone];
  } else {
    res.status(400).json({ msg: 'Invalid OTP' });
  }
});

module.exports = router;
