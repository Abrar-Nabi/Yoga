import React, { useEffect, useState } from "react";
import "../styles/AdminDashboard.css"; // Import CSS for styling

const YogaAdminDashboard = () => {
  const [users, setUsers] = useState([]); // Store users from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users") // Updated endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  

  return (
    <div className="admin-container">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <h2>Yoga Admin</h2>
        <ul>
          <li>Dashboard</li>
          <li className="active">Users</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <h1>Users</h1>

        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
               
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default YogaAdminDashboard;
