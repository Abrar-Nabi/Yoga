import React, { useEffect, useState } from "react";
import "./AdminTeachers.css";
import "./AdminCommon.css"; // Common admin styles

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [name, setName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [picture, setPicture] = useState(null);
       
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/teachers");
      const data = await res.json();
      setTeachers(data);
      setLoading(false);
    } catch {
      setError("Failed to fetch teachers.");
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleAddOrUpdateTeacher = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("expertise", expertise);
    if (picture) formData.append("picture", picture);

    const url = editingTeacher
      ? `http://localhost:5000/api/teachers/${editingTeacher._id}`
      : "http://localhost:5000/api/teachers";

    const method = editingTeacher ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      body: formData,
    });

    if (response.ok) {
      setShowForm(false);
      setEditingTeacher(null);
      setName("");
      setExpertise("");
      setPicture(null);
      fetchTeachers();
    } else {
      alert("Failed to save teacher.");
    }
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setName(teacher.name);
    setExpertise(teacher.expertise);
    setShowForm(true);
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTeachers();
      } else {
        alert("Failed to delete teacher.");
      }
    }
  };

  return (
    <div className="admin-teachers">
      <h2>Manage Teachers</h2>
      <button className="add-btn" onClick={() => { 
        setShowForm(true); 
        setEditingTeacher(null); 
        setName(""); 
        setExpertise(""); 
        setPicture(null);
      }}>
          Add   Teacher
      </button>

      {loading && <p>Loading teachers...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && teachers.length > 0 ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Expertise</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>
                  <img
                    src={teacher.picture ? `http://localhost:5000/uploads/${teacher.picture}` : "https://via.placeholder.com/50"}
                    alt={teacher.name}
                    className="style-img"
                  />
                </td>
                <td>{teacher.name}</td>
                <td>{teacher.expertise}</td>
                <td>
                  <button onClick={() => handleEditTeacher(teacher)} className="btn btn-edit">Edit</button>
                  <button onClick={() => handleDeleteTeacher(teacher._id)} className="btn btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No teachers found.</p>
      )}

      {showForm && (
        <div className="popup-form">
          <div className="form-container">
            <h3>{editingTeacher ? "Edit" : "Add"} Teacher</h3>
            <form onSubmit={handleAddOrUpdateTeacher} encType="multipart/form-data">
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

              <label>Expertise:</label>
              <input type="text" value={expertise} onChange={(e) => setExpertise(e.target.value)} required />

              <label>Picture:</label>
              <input type="file" onChange={handleFileChange} />

              <button className="btn" type="submit">{editingTeacher ? "Update" : "Add"} Teacher</button>
              <button className="btn" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeachers;
