// CRUD operations or any operation or any logic we write here
const Student = require("../models/Student");

// create student, get student
//201 -- status code -- for success
// 400 -- status code -- for error

exports.createStudent = async (req, res) => {
  console.log("Creating student with data:", req.body);
  // req.body contains the data sent in the request
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error("Error creating student:", err);
    res.status(400).json({ error: err.message });
  }
};

exports.getStudents = async (req, res) => {
  console.log("Getting all students...");
  try {
    const students = await Student.find();
    console.log("Found students:", students);
    res.status(200).json(students);
  } catch (err) {
    console.error("Error in getStudents:", err);
    res.status(400).json({ error: err.message });
  }
};
