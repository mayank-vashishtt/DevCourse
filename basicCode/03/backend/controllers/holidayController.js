const Holiday = require("../models/Holiday");

// Create a holiday
exports.createHoliday = async (req, res) => {
  try {
    const { date, description } = req.body;
    if (!date) return res.status(400).json({ error: "Date is required." });
    const holiday = new Holiday({ date, description });
    await holiday.save();
    res.status(201).json(holiday);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all holidays
exports.getHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find();
    res.status(200).json(holidays);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
