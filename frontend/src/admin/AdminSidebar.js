import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
          <li>
            <NavLink
              to="/admin/home" // Keep this as "/admin"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/teachers"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Teachers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/styles"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Styles
            </NavLink>
          </li>
        </ul>
        <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
      </aside>
    </>
  );
};

export default AdminSidebar;
