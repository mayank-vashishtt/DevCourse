const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const auth = require('../middleware/auth');

// POST /api/login
router.post('/login', async (req, res) => {
  const { username, referralCode } = req.body;
  if (!username || !referralCode)
    return res.status(400).json({ error: 'Missing fields' });

  // Only authenticate if BOTH username AND referral match
  const user = await User.findOne({ username, referralCode });
  if (!user)
    return res.status(401).json({ error: 'Invalid username or referral code' });

  user.isOnline = true;
  await user.save();

  const token = generateToken(user);
  res.json({ user, token });
});

// GET /api/users (search supported)
router.get('/users', auth, async (req, res) => {
  const { username, referralCode } = req.query;
  const filter = {};
  if (username) filter.username = new RegExp(username, 'i');
  if (referralCode) filter.referralCode = referralCode;

  const users = await User.find(filter, '-referralCode');
  res.json(users);
});

module.exports = router;
