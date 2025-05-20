import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyBookings.css";
import Navbar from "./Navbar";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      navigate("/login");
      return;
    }
    setUserEmail(storedEmail);
  }, [navigate]);

  useEffect(() => {
    if (userEmail) {
      fetch("http://localhost:5000/api/bookings")
        .then((res) => res.json())
        .then((data) => {
          const userBookings = data.filter((booking) => booking.email === userEmail);
          setBookings(userBookings);
        })
        .catch((err) => console.error("Error fetching bookings", err));
    }
  }, [userEmail]);

  return (
    <>
      <Navbar />
      <div className="my-bookings-container">
        <h2>My Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul className="booking-list">
            {bookings.map((booking, index) => (
              <li key={index} className="booking-item">
                <p><strong>Teacher:</strong> {booking.teacherName}</p>
                <p><strong>Style:</strong> {booking.styleName}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span className={`status ${booking.status?.toLowerCase()}`}>{booking.status || 'Pending'}</span></p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MyBookings;
