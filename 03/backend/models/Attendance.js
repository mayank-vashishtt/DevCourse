const mongoose = require("mongoose");
const AttendanceStatus = require("../enums/attendanceStatus");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  date: { type: Date, default: Date.now() },
  status: {
    type: String,
    enum: Object.values(AttendanceStatus),
    required: true,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
