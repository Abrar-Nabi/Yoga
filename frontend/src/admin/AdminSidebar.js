import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu, GiCrossMark } from "react-icons/gi";  // Import both hamburger and close icons from React Icons
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    navigate("/"); // Redirect to login page
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Hamburger or Close icon */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        {sidebarOpen ? (
          <GiCrossMark size={30} color="black" />  // Show close icon when sidebar is open
        ) : (
          <GiHamburgerMenu size={30} color="black" />  // Show hamburger icon when sidebar is closed
        )}
      </div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h2>Yoga Admin</h2>
        <ul>
          <li><Link to="/admin">Home</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
          <li><Link to="/admin/bookings">Bookings</Link></li>
          <li><Link to="/admin/teachers">Teachers</Link></li>
          <li><Link to="/admin/styles">Styles</Link></li>
        </ul>
        <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
      </aside>
    </>
  );
};

export default AdminSidebar;
