const express = require("express");
const multer = require("multer");
const path = require("path");
const { getStyles, addStyle, updateStyle, deleteStyle } = require("../controllers/styleController");

const router = express.Router();

// Multer storage settings
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", getStyles);
router.post("/", upload.single("picture"), addStyle);
router.put("/:id", upload.single("picture"), updateStyle);
router.delete("/:id", deleteStyle);

module.exports = router;
