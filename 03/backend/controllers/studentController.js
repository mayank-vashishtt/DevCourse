// CRUD operations or any operation or any logic we write here
const Student = require("../models/Student");

// create student, get student
//201 -- status code -- for success
// 400 -- status code -- for error

// Create student with unique (name, class) and required class/section
exports.createStudent = async (req, res) => {
  try {
    const { name, class: className, section } = req.body;
    if (!name || !className || !section) {
      return res
        .status(400)
        .json({ error: "Name, class, and section are required." });
    }
    // Prevent duplicate registration (by name + class)
    const exists = await Student.findOne({ name, class: className });
    if (exists) {
      return res
        .status(400)
        .json({
          error: "Student with this name already exists in this class.",
        });
    }
    const student = new Student({ name, class: className, section });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get students, group by performance, or above 70% attendance
const Attendance = require("../models/Attendance");
exports.getStudents = async (req, res) => {
  try {
    const {
      performance,
      above70,
      class: className,
      section,
      month,
      year,
    } = req.query;
    if ((performance || above70) && className && section && month && year) {
      // Calculate attendance % for each student in class/section/month
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      let agg = [
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
      ];
      if (above70) agg.push({ $match: { percent: { $gte: 70 } } });
      const result = await Attendance.aggregate(agg);
      return res.status(200).json(result);
    }
    // Default: get all students
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
