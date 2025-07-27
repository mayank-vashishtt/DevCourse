const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const auth = require("../middleware/auth");

const bcrypt = require("bcrypt");

// POST /api/register
router.post("/register", async (req, res) => {
  const { username, password, referralCode } = req.body;
  if (!username || !password || !referralCode)
    return res.status(400).json({ error: "Missing fields" });

  if (referralCode !== process.env.REFERRAL_CODE)
    return res.status(401).json({ error: "Invalid referral code" });

  try {
    const user = new User({ username, password, referralCode });
    await user.save();
    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  const { username, password, referralCode } = req.body;
  if (!username || !password || !referralCode)
    return res.status(400).json({ error: "Missing fields" });

  if (referralCode !== process.env.REFERRAL_CODE)
    return res.status(401).json({ error: "Invalid referral code" });

  const user = await User.findOne({ username });
  if (!user)
    return res.status(401).json({ error: "Invalid username or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ error: "Invalid username or password" });

  user.isOnline = true;
  await user.save();

  const token = generateToken(user);
  res.json({ user, token });
});

// GET /api/users (search supported)
router.get("/users", auth, async (req, res) => {
  const { username, referralCode } = req.query;
  const filter = {};
  if (username) filter.username = new RegExp(username, "i");
  if (referralCode) filter.referralCode = referralCode;

  const users = await User.find(filter, "-referralCode");
  res.json(users);
});

module.exports = router;
