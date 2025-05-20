import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  let inactivityTimer;

  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(handleLogout, 5 * 60 * 1000); // 5 minutes
  };

  const checkExpiration = () => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (token && expirationTime) {
      const currentTime = Date.now();
      if (currentTime > parseInt(expirationTime, 10)) {
        handleLogout();
      } else {
        setIsLoggedIn(true);
        try {
          const decoded = jwtDecode(token);
          setUserName(decoded.name || "User");
          setUserEmail(decoded.email || ""); // Get email from token
        } catch (err) {
          console.error("Error decoding token", err);
          setUserName("User");
        }
        setTimeout(handleLogout, parseInt(expirationTime, 10) - currentTime);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("email"); // Remove email from localStorage
    setIsLoggedIn(false);
    setUserName("");
    setUserEmail("");
    navigate("/");
  };

  useEffect(() => {
    checkExpiration();

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(inactivityTimer);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-text">glo</Link>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>✖</button>
        <li><Link to="/all-styles" onClick={() => setMenuOpen(false)}>Styles</Link></li>
        <li><Link to="/all-teachers" onClick={() => setMenuOpen(false)}>Teachers</Link></li>
        <li>
          <button
            className="nav-button"
            onClick={() => {
              setMenuOpen(false);
              if (isLoggedIn) {
                navigate("/bookings");
              } else {
                alert("Please login for booking.");
                navigate("/login");
              }
            }}
          >
            Bookings
          </button>
        </li>

        <li>
          {isLoggedIn ? (
            <Link to="/MyBookings" className="my-bookings-link" onClick={() => setMenuOpen(false)}>
              My Bookings
            </Link>
          ) : (
            <Link to="/login" className="my-bookings-link" onClick={() => setMenuOpen(false)}>
              My Bookings
            </Link>
          )}
        </li>
        <li>
          {isLoggedIn ? (
            <>
              <span className="welcome-text">Welcome, {userName}!</span>
              <button className="login-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="login-btn">Login</button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
