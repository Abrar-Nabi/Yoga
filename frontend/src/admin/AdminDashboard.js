import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminUsers from "./AdminUsers";
import AdminBookings from "./AdminBookings";
import AdminTeachers from "./AdminTeachers";
import AdminStyles from "./AdminStyles";
import "./AdminHome.css"; 

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, teachers: 0, bookings: 0, styles: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/stats")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch statistics");
        return response.json();
      })
      .then((data) => setStats(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="home-admin-container">
      {/* Sidebar will overlay when opened */}
      <AdminSidebar />
      <div className="home-admin-content">
        <Routes>
          {/* Admin Home Dashboard */}
          <Route
            path="/home"
            element={
              <div className="admin-dashboard">
                <div className="admin-dashboard-content">
                  <h1>Admin Dashboard</h1>
                  {error ? (
                    <p className="admin-dashboard-error">{error}</p>
                  ) : (
                    <div className="admin-dashboard-cards">
                      <div className="admin-dashboard-card users">Users: {stats.users}</div>
                      <div className="admin-dashboard-card teachers">Teachers: {stats.teachers}</div>
                      <div className="admin-dashboard-card bookings">Bookings: {stats.bookings}</div>
                      <div className="admin-dashboard-card styles">Styles: {stats.styles}</div>
                    </div>
                  )}
                </div>
              </div>
            }
          />
          {/* Other Routes */}
          <Route path="users" element={<AdminUsers />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="styles" element={<AdminStyles />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
