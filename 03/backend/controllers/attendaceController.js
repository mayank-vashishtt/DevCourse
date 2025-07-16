const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    const { student, teacher, status } = req.body;
    const attendance = new Attendance({
      student,
      teacher,
      status,
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("student")
      .populate("teacher");

    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({
      error: "Error fetching attendance records",
      details: err.message,
    });
  }
};
