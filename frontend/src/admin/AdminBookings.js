import React, { useEffect, useState } from "react";
import "./AdminBookings.css";
import "./AdminCommon.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [styles, setStyles] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    teacherName: "",
    styleName: "",
    date: "",
    status: "pending",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingRes, teacherRes, styleRes] = await Promise.all([
          fetch("http://localhost:5000/api/bookings"),
          fetch("http://localhost:5000/api/teachers"),
          fetch("http://localhost:5000/api/styles"),
        ]);

        if (!bookingRes.ok || !teacherRes.ok || !styleRes.ok) {
          throw new Error("Failed to fetch data from one or more endpoints.");
        }

        const [bookingData, teacherData, styleData] = await Promise.all([
          bookingRes.json(),
          teacherRes.json(),
          styleRes.json(),
        ]);

        setBookings(bookingData);
        setTeachers(teacherData);
        setStyles(styleData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (booking) => {
    setEditingBooking(booking._id);
    setFormData({
      name: booking.name || "",
      phone: booking.phone || "",
      email: booking.email || "",
      teacherName: booking.teacherName || "",
      styleName: booking.styleName || "",
      date: booking.date?.split("T")[0] || "",
      status: booking.status || "Pending",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Delete failed");

        setBookings((prev) => prev.filter((b) => b._id !== id));
      } catch (err) {
        console.error("Error deleting booking:", err.message);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${editingBooking}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status: formData.status.toLowerCase() }),
      });

      if (!res.ok) throw new Error("Failed to update booking");
      const data = await res.json();

      // Update booking list with new booking
      setBookings((prev) =>
        prev.map((b) => (b._id === editingBooking ? data.booking : b))
      );

      setEditingBooking(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error updating booking:", err.message);
    }
  };

  return (
    <div className="admin-bookings-container">
      <h2>Manage Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Teacher</th>
              <th>Style</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{booking.email}</td>
                <td>{booking.teacherName || "Unknown"}</td>
                <td>{booking.styleName || "Unknown"}</td>
                <td>{booking.date?.split("T")[0]}</td>
                <td>{booking.status}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEdit(booking)}>
                    Edit
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(booking._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="popup-form">
          <div className="form-container">
            <h3>Edit Booking</h3>
            <form onSubmit={handleSave}>
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <label>Phone:</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />

              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <label>Teacher:</label>
              <select
                value={formData.teacherName}
                onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                required
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher.name}>
                    {teacher.name}
                  </option>
                ))}
              </select>

              <label>Style:</label>
              <select
                value={formData.styleName}
                onChange={(e) => setFormData({ ...formData, styleName: e.target.value })}
                required
              >
                <option value="">Select Style</option>
                {styles.map((style) => (
                  <option key={style._id} value={style.name}>
                    {style.name}
                  </option>
                ))}
              </select>

              <label>Date:</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />

              <label>Status:</label>
        

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                required
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>


              <div style={{ marginTop: "15px" }}>
                <button className="btn" type="submit">
                  Update Booking
                </button>
                <button
                  className="btn"
                  type="button"
                  style={{ marginLeft: "10px" }}
                  onClick={() => setShowForm(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
