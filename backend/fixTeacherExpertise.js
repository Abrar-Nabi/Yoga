const mongoose = require("mongoose");
const Teacher = require("./models/Teachers"); // Adjust path to your Teacher model if needed

// Connect to MongoDB
mongoose.connect("mongodb+srv://abrarn614:KmyP8MdsMJ8SKXyr@cluster0.wkei6lb.mongodb.net/yogadatabase?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    fixTeacherExpertise();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

async function fixTeacherExpertise() {
  try {
    // Fetch all teachers from the database
    const teachers = await Teacher.find();

    // Loop through each teacher to check and fix expertise
    for (const teacher of teachers) {
      if (Array.isArray(teacher.expertise) && teacher.expertise.length === 1 && teacher.expertise[0].includes(",")) {
        // Split the expertise string into an array of individual styles
        teacher.expertise = teacher.expertise[0].split(",").map(item => item.trim());

        // Save the updated teacher document
        await teacher.save();
        console.log(`Fixed expertise for ${teacher.name}`);
      }
    }

    console.log("Data fixing complete!");
    mongoose.disconnect(); // Disconnect after completing the task
  } catch (error) {
    console.error("Error while fixing teacher expertise:", error);
    mongoose.disconnect(); // Disconnect in case of error
  }
}
