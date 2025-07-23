const Teacher = require("../models/Teacher");

exports.createTeacher = async (req, res) => {
  try {
    const { name, class: className, section, subjects } = req.body;
    if (
      !name ||
      !className ||
      !subjects ||
      !Array.isArray(subjects) ||
      subjects.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Name, class, and at least one subject are required." });
    }
    const teacher = new Teacher({ name, class: className, section, subjects });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
