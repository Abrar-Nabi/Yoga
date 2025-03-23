const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

// Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Import and use routes
const routes = {
  auth: require("./routes/authRoutes"),
  bookings: require("./routes/bookingRoutes"),
  teachers: require("./routes/teacherRoutes"),
  styles: require("./routes/styleRoutes"),
  users: require("./routes/userRoutes"),
  admin: require("./routes/adminRoutes"),
};

app.use("/api/auth", routes.auth);
app.use("/api/bookings", routes.bookings);
app.use("/api/teachers", routes.teachers);
app.use("/api/styles", routes.styles);
app.use("/api/users", routes.users);
app.use("/api/admin", routes.admin);

// Default Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
