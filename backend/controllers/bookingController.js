const Booking = require("../models/Bookings");

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
    const { name, phone, email, teacherName, styleName, date } = req.body;

    // Ensure email is included in the booking request
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const booking = new Booking({
      name,
      phone,
      email,
      teacherName,
      styleName,
      date,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error adding booking" });
  }
};

// Update (Edit) a booking
exports.updateBooking = async (req, res) => {
  try {
    const { name, phone, email, teacherName, styleName, date } = req.body;

    // Ensure email is included in the update request
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { name, phone, email, teacherName, styleName, date },
      {
        new: true, // Returns updated booking
        runValidators: true, // Ensures validation rules are applied
      }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error updating booking" });
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
