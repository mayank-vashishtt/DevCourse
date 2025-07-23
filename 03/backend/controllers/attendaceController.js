const { Parser } = require("json2csv");

// PATCH: Edit attendance within 24 hours only
exports.editAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const attendance = await Attendance.findById(id);
    if (!attendance)
      return res.status(404).json({ error: "Attendance not found." });
    const now = new Date();
    const created = new Date(attendance.createdAt);
    if (now - created > 24 * 60 * 60 * 1000) {
      return res
        .status(403)
        .json({ error: "Attendance can only be edited within 24 hours." });
    }
    attendance.status = status;
    await attendance.save();
    res.status(200).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET: Export attendance as CSV by week
exports.exportAttendanceCSV = async (req, res) => {
  try {
    const { class: className, section, week, year } = req.query;
    if (!className || !section || !week || !year) {
      return res
        .status(400)
        .json({ error: "class, section, week, and year are required." });
    }
    const start = new Date(year, 0, 1 + (week - 1) * 7);
    const end = new Date(year, 0, 1 + week * 7);
    const records = await Attendance.find({
      class: className,
      section,
      date: { $gte: start, $lt: end },
    })
      .populate("student")
      .populate("teacher");
    const data = records.map((r) => ({
      student: r.student.name,
      class: r.class,
      section: r.section,
      subject: r.subject,
      date: r.date.toISOString().slice(0, 10),
      status: r.status,
      teacher: r.teacher.name,
    }));
    const parser = new Parser();
    const csv = parser.parse(data);
    res.header("Content-Type", "text/csv");
    res.attachment("attendance.csv");
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Utility: Auto-mark absentees (to be run as a script or scheduled job)
exports.autoMarkAbsentees = async (date, className, section, subject) => {
  // Find all students in class/section
  const students = await Student.find({ class: className, section });
  for (const student of students) {
    const alreadyMarked = await Attendance.findOne({
      student: student._id,
      date,
      subject,
    });
    if (!alreadyMarked) {
      await Attendance.create({
        student: student._id,
        teacher: null, // or system/admin id
        class: className,
        section,
        subject,
        date,
        status: "Absent",
        autoMarked: true,
      });
    }
  }
};
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Holiday = require("../models/Holiday");
const mongoose = require("mongoose");

// 1, 2, 3, 4, 5, 13: Mark attendance with all checks
exports.markAttendance = async (req, res) => {
  try {
    const {
      student,
      teacher,
      class: className,
      section,
      subject,
      date,
      status,
    } = req.body;
    // 4. Prevent attendance on holidays
    const isHoliday = await Holiday.findOne({ date: new Date(date) });
    if (isHoliday) {
      return res
        .status(400)
        .json({ error: "Cannot mark attendance on a holiday." });
    }
    // 1. Class teacher can only mark for their class
    const teacherDoc = await Teacher.findById(teacher);
    if (
      !teacherDoc ||
      teacherDoc.class !== className ||
      (teacherDoc.section && teacherDoc.section !== section)
    ) {
      return res
        .status(403)
        .json({ error: "Teacher not authorized for this class/section." });
    }
    // 2. Section-wise grouping is enforced by model
    // 3. Prevent duplicate attendance (enforced by unique index, but check for user-friendly error)
    const alreadyMarked = await Attendance.findOne({
      student,
      date: new Date(date),
      subject,
    });
    if (alreadyMarked) {
      return res.status(400).json({
        error: "Attendance already marked for this student, subject, and date.",
      });
    }
    // 5. Subject-wise attendance
    const attendance = new Attendance({
      student,
      teacher,
      class: className,
      section,
      subject,
      date: new Date(date),
      status,
    });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 6, 8, 11, 14, 15: Get attendance with trends, top 3, performance, alerts, above 70%
exports.getAttendance = async (req, res) => {
  try {
    const {
      trends,
      studentId,
      class: className,
      section,
      week,
      year,
      month,
      top3,
      performance,
      above70,
      absentAlerts,
    } = req.query;
    let result;
    if (trends && studentId) {
      // 6. Attendance trends per student
      // Calculate present % for the month
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      const total = await Attendance.countDocuments({
        student: studentId,
        date: { $gte: start, $lte: end },
      });
      const present = await Attendance.countDocuments({
        student: studentId,
        date: { $gte: start, $lte: end },
        status: "Present",
      });
      result = { present, total, percent: total ? (present / total) * 100 : 0 };
    } else if (top3 && className && section && week && year) {
      // 8. Weekly top 3 most present students
      // Calculate week range
      const start = new Date(year, 0, 1 + (week - 1) * 7);
      const end = new Date(year, 0, 1 + week * 7);
      result = await Attendance.aggregate([
        {
          $match: {
            class: className,
            section,
            date: { $gte: start, $lt: end },
            status: "Present",
          },
        },
        { $group: { _id: "$student", presentCount: { $sum: 1 } } },
        { $sort: { presentCount: -1 } },
        { $limit: 3 },
        {
          $lookup: {
            from: "students",
            localField: "_id",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: "$student" },
      ]);
    } else if (performance && className && section && month && year) {
      // 11. Group students by performance
      // Calculate attendance % for each student
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      result = await Attendance.aggregate([
        {
          $match: {
            class: className,
            section,
            date: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: "$student",
            total: { $sum: 1 },
            present: {
              $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] },
            },
          },
        },
        {
          $project: {
            percent: { $multiply: [{ $divide: ["$present", "$total"] }, 100] },
          },
        },
        {
          $lookup: {
            from: "students",
            localField: "_id",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: "$student" },
      ]);
    } else if (above70 && className && section && month && year) {
      // 15. List students with >70% attendance
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      result = await Attendance.aggregate([
        {
          $match: {
            class: className,
            section,
            date: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: "$student",
            total: { $sum: 1 },
            present: {
              $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] },
            },
          },
        },
        {
          $project: {
            percent: { $multiply: [{ $divide: ["$present", "$total"] }, 100] },
          },
        },
        { $match: { percent: { $gte: 70 } } },
        {
          $lookup: {
            from: "students",
            localField: "_id",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: "$student" },
      ]);
    } else if (absentAlerts && week && year) {
      // 14. Notify if student is absent 3+ times in a week
      const start = new Date(year, 0, 1 + (week - 1) * 7);
      const end = new Date(year, 0, 1 + week * 7);
      result = await Attendance.aggregate([
        { $match: { date: { $gte: start, $lt: end }, status: "Absent" } },
        { $group: { _id: "$student", absentCount: { $sum: 1 } } },
        { $match: { absentCount: { $gte: 3 } } },
        {
          $lookup: {
            from: "students",
            localField: "_id",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: "$student" },
      ]);
    } else {
      // Default: get all attendance
      result = await Attendance.find().populate("student").populate("teacher");
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: "Error fetching attendance records",
      details: err.message,
    });
  }
};
