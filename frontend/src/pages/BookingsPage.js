import React, { useEffect, useState } from "react";
import "../styles/Booking.css";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

const BookingPage = () => {
  const [styles, setStyles] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch styles from the backend
    fetch("http://localhost:5000/api/styles")
      .then((res) => res.json())
      .then((data) => setStyles(data))
      .catch((err) => console.error("Error fetching styles", err));

    // Check if the user is logged in
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail); // Auto-fill email if the user is logged in
    }
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().split("T")[0];

    const bookingData = {
      name,
      phone,
      email,
      styleName: selectedStyle,
      date: currentDate,
    };

    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Booking successful!");
      setName("");
      setPhone("");
      setSelectedStyle("");
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="booking-container">
        <h2>Book a Yoga Class</h2>
        {message && <p className="message">{message}</p>}
        <form className="booking-form" onSubmit={handleBooking}>
          <label>Full Name:</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Phone Number:</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={!email}
            disabled={!!email}
          />

          <label>Yoga Style:</label>
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            required
          >
            <option value="">Select Style</option>
            {styles.map((style) => (
              <option key={style.name} value={style.name}>
                {style.name}
              </option>
            ))}
          </select>

          <button type="submit">Book Now</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;
