const express = require("express");
const User = require("../models/User");

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "name email _id"); // Fetch only necessary fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
