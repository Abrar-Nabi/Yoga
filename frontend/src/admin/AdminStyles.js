import React, { useEffect, useState } from "react";
import "./AdminStyles.css";
import "./AdminCommon.css"; // Common admin styles

const AdminStyles = () => {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStyle, setEditingStyle] = useState(null);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    fetchStyles();
  }, []);

  const fetchStyles = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/styles");
      const data = await res.json();
      setStyles(data);
      setLoading(false);
    } catch {
      setError("Failed to fetch styles.");
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleAddOrUpdateStyle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (picture) formData.append("picture", picture);

    const url = editingStyle
      ? `http://localhost:5000/api/styles/${editingStyle._id}`
      : "http://localhost:5000/api/styles";

    const method = editingStyle ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      body: formData,
    });

    if (response.ok) {
      setShowForm(false);
      setEditingStyle(null);
      setName("");
      setPicture(null);
      fetchStyles();
    } else {
      alert("Failed to save style.");
    }
  };

  const handleEditStyle = (style) => {
    setEditingStyle(style);
    setName(style.name);
    setShowForm(true);
  };

  const handleDeleteStyle = async (id) => {
    if (window.confirm("Are you sure you want to delete this style?")) {
      const response = await fetch(`http://localhost:5000/api/styles/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchStyles();
      } else {
        alert("Failed to delete style.");
      }
    }
  };

  return (
    <div className="admin-styles">

        <h2>Manage Styles</h2>
        <button
          className="add-btn"
          onClick={() => {
            setShowForm(true);
            setEditingStyle(null);
            setName("");
            setPicture(null);
          }}
        >
          Add Style
        </button>
   

      {loading && <p>Loading styles...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && styles.length > 0 ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {styles.map((style) => (
              <tr key={style._id}>
                <td>
                  <img
                    src={style.picture ? `http://localhost:5000/uploads/${style.picture}` : "https://via.placeholder.com/50"}
                    alt={style.name}
                    className="style-img"
                  />
                </td>
                <td>{style.name}</td>
                <td>
                  <button onClick={() => handleEditStyle(style)} className="btn btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteStyle(style._id)} className="btn btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No styles found.</p>
      )}

      {showForm && (
        <div className="popup-form">
          <div className="form-container">
            <h3>{editingStyle ? "Edit" : "Add"} Style</h3>
            <form onSubmit={handleAddOrUpdateStyle} encType="multipart/form-data">
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

              <label>Picture:</label>
              <input type="file" onChange={handleFileChange} />

              <button className="btn"        type="submit">{editingStyle ? "Update" : "Add"} Style</button>
              <button className="btn"    type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStyles;
