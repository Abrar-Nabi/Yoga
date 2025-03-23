import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo on Top-Left */}
      <div className="footer-logo">
        <Link to="/" className="footer-logo-text">glo</Link>
      </div>

      {/* Navigation Links */}
      <div className="footer-links">
        <Link to="/styles">Styles</Link>
        <Link to="/teachers">Teachers</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Social Media Icons */}
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="social-icon" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="social-icon" />
        </a>
      </div>

      {/* Copyright */}
      <p className="footer-text">© {new Date().getFullYear()} Glo Yoga. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
