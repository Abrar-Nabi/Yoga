import React, { useEffect, useState } from "react";
import "./AdminCommon.css"; // Common admin styles
import "./AdminUsers.css"; // Page-specific styles


const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch users");
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
    <div className="user-admin-container">
      <h1 className="user-admin-heading">Users</h1>

      {loading && <div className="user-admin-loading-spinner"></div>}
      {error && <div className="user-admin-error-message">{error}</div>}

      {!loading && !error && users.length === 0 && (
        <p className="user-admin-no-data">No users found.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
