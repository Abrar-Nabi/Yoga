const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's Name
  phone: { type: String, required: true }, // User's Phone Number
  email: { type: String, required: true }, // User's Email
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  teacherName: { type: String, required: true }, // Storing Teacher's Name instead of ID
  styleName: { type: String, required: true }, // Storing Yoga Style Name instead of ID
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);
