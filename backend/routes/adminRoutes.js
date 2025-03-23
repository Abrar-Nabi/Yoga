const express = require("express");
const User = require("../models/User");
const Teacher = require("../models/Teachers");
const Booking = require("../models/Bookings");
const Style = require("../models/Style");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const teachers = await Teacher.countDocuments();
    const bookings = await Booking.countDocuments();
    const styles = await Style.countDocuments();

    res.json({ users, teachers, bookings, styles });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
