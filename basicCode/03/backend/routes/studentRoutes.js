const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
} = require("../controllers/studentController");


console.log("Student routes loaded");
// These routes are already prefixed with /api/students from server.js
router.post("/", createStudent); // Will be accessible at /api/students
router.get("/", getStudents); // Will be accessible at /api/students

module.exports = router;
