const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  picture: { type: String },
});

module.exports = mongoose.model("Teacher", teacherSchema);
