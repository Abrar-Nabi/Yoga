import React, { useEffect, useState } from "react";
import "./AdminBookings.css";
import "./AdminCommon.css"; // Common admin styles

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [styles, setStyles] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "", // <-- Add this
    teacherName: "",
    styleName: "",
    date: "",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingRes = await fetch("http://localhost:5000/api/bookings");
        const teacherRes = await fetch("http://localhost:5000/api/teachers");
        const styleRes = await fetch("http://localhost:5000/api/styles");

        if (!bookingRes.ok || !teacherRes.ok || !styleRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const bookingData = await bookingRes.json();
        const teacherData = await teacherRes.json();
        const styleData = await styleRes.json();

        setBookings(bookingData);
        setTeachers(teacherData);
        setStyles(styleData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (booking) => {
    setEditingBooking(booking._id);
    setFormData({
      name: booking.name || "",
      phone: booking.phone || "",
      email: booking.email || "",  // <-- Add this line
      teacherName: booking.teacherName || "",
      styleName: booking.styleName || "",
      date: booking.date?.split("T")[0] || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete booking");
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } catch (err) {
        console.error("Error deleting booking:", err);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${editingBooking}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),  // `formData` now includes `email`
        }
      );

      if (!response.ok) throw new Error("Failed to update booking");
      const updatedBooking = await response.json();

      setBookings((prev) =>
        prev.map((b) => (b._id === editingBooking ? updatedBooking : b))
      );

      setEditingBooking(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error updating booking:", err);
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
                <td>
                  <button onClick={() => handleEdit(booking)} className="btn btn-edit">Edit</button>
                  <button onClick={() => handleDelete(booking._id)} className="btn btn-delete">Delete</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="popup-form">
          <div className="form-container">
            <h3>{editingBooking ? "Edit" : "Add"} Booking</h3>
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

              <button className="btn" type="submit">
                {editingBooking ? "Update" : "Add"} Booking
              </button>
              <button className="btn" type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBookings;
