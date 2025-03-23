const express = require("express");
const { signup, login } = require("../controllers/authController");
const { verifyUser, verifyAdmin } = require("../middleware/middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/admin", verifyAdmin, (req, res) => res.json({ message: "Welcome Admin" }));

module.exports = router;
