const mongoose = require('mongoose');


const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true }, // Class assigned
  section: { type: String }, // Optional, if teachers are assigned to sections
  subjects: [{ type: String }], // List of subjects taught
});

module.exports = mongoose.model("Teacher", teacherSchema);