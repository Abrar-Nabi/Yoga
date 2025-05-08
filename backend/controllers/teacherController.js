const Teacher = require("../models/Teachers");

// Function to handle expertise field: Split and remove any empty strings
const formatExpertise = (expertise) => {
  return expertise
    .split(",")  // Split expertise into an array based on commas
    .map((item) => item.trim())  // Remove extra spaces
    .filter((item) => item !== ""); // Remove any empty items
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers" });
  }
};

exports.addTeacher = async (req, res) => {
  try {
    const { name, expertise } = req.body;
    const picture = req.file ? req.file.filename : null;

    // Format expertise
    const formattedExpertise = formatExpertise(expertise);

    const teacher = new Teacher({ name, expertise: formattedExpertise, picture });
    await teacher.save();

    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: "Error adding teacher" });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const { name, expertise } = req.body;
    const picture = req.file ? req.file.filename : req.body.picture;

    // Format expertise
    const formattedExpertise = formatExpertise(expertise);

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { name, expertise: formattedExpertise, picture },
      { new: true }
    );

    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: "Error updating teacher" });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting teacher" });
  }
};
