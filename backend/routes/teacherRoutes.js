const express = require("express");
const multer = require("multer");
const path = require("path");
const { getTeachers, addTeacher, updateTeacher, deleteTeacher } = require("../controllers/teacherController");

const router = express.Router();

// Multer storage settings
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", getTeachers);
router.post("/", upload.single("picture"), addTeacher);
router.put("/:id", upload.single("picture"), updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;
