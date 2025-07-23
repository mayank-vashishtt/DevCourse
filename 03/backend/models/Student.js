
const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  class: { type: String, required: true }, // e.g., "10"
  section: { type: String, required: true }, // e.g., "A"
  // ...other fields
});
studentSchema.index({ name: 1, class: 1 }, { unique: true }); // Prevent duplicate registration


module.exports = mongoose.model("Student", studentSchema);