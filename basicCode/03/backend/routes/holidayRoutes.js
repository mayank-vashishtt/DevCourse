const express = require("express");
const router = express.Router();
const {
  createHoliday,
  getHolidays,
} = require("../controllers/holidayController");

// POST /api/holidays - create a holiday
router.post("/", createHoliday);

// GET /api/holidays - list all holidays
router.get("/", getHolidays);

module.exports = router;
