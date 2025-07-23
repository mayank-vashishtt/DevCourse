const mongoose = require('mongoose');



const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true },
  autoMarked: { type: Boolean, default: false },
}, { timestamps: true });
attendanceSchema.index({ student: 1, date: 1, subject: 1 }, { unique: true }); // Prevent duplicate attendance


module.exports = mongoose.model("Attendance", attendanceSchema);