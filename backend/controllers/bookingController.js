const Booking = require("../models/Bookings");
const Teacher = require("../models/Teachers");
// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find(); // No populate() needed
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};
// Add a new booking
exports.addBooking = async (req, res) => {
  try {
    const { name, phone, email, styleName, date } = req.body;

    if (!email || !name || !phone || !styleName || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find teachers who teach the selected style
    const cleanedStyle = styleName.trim();
    const teachers = await Teacher.find({ expertise: { $in: [cleanedStyle] } });


    console.log("Received styleName:", styleName);

    if (teachers.length === 0) {
      return res.status(404).json({
        message: `No teachers found for the style "${styleName}".`,
      });
    }

    // Automatically pick the first teacher (or you can allow the user to select)
    const teacher = teachers[0];

    const booking = new Booking({
      name,
      phone,
      email,
      teacherName: teacher.name, // Assign the first teacher from the list
      styleName,
      date,
    });

    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Error adding booking:", error);
    res.status(500).json({ message: "Error adding booking", error: error.message });
  }
};



// Update (Edit) a booking
const mongoose = require("mongoose");

exports.updateBooking = async (req, res) => {
  try {
    console.log("Received update data:", req.body);

    const { name, phone, email, teacherName, styleName, date, status } = req.body;

    if (!email || !name || !phone || !teacherName || !styleName || !date || !status) {
      console.log("Validation failed: missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log("Validation failed: invalid booking ID");
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const allowedStatuses = ["pending", "confirmed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      console.log("Validation failed: invalid status:", status);
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { name, phone, email, teacherName, styleName, date, status },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      console.log("Booking not found for ID:", req.params.id);
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking updated successfully", booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Error updating booking", error: error.message });
  }
};




// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking" });
  }
};
