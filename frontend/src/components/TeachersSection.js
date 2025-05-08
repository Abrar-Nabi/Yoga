import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/TeachersSection.css";

const TeachersSection = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/teachers");
      const data = await res.json();
      setTeachers(data.slice(0, 6)); // Show only the first 6 teachers
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch teachers.");
      setLoading(false);
    }
  };

  return (
    <div className="teachers-container">
      <h2 className="teachers-heading">Learn from a blend of tradition and innovation</h2>

      {loading && <p>Loading teachers...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && teachers.length > 0 ? (
        <div className="teachers-grid">
          {teachers.map((teacher) => (
            <div className="teacher-card" key={teacher._id}>
              <img
                src={`http://localhost:5000/uploads/${teacher.picture}`}
                alt={teacher.name}
                className="teacher-image"
              />
              <h3 className="teacher-name">{teacher.name}</h3>
              <div className="teacher-expertise">
                {teacher.expertise.map((style, index) => (
                  <span key={index} className="expertise-style">
                    {style}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No teachers found.</p>
      )}

      <p className="teachers-description">
        Glo classes are taught by world-renowned, certified instructors who embody wellness and teach with an intimate understanding of yoga traditions and holistic well-being.
      </p>

      <Link to="/all-teachers">
        <button className="teachers-button">Meet our {teachers.length}+ teachers</button>
      </Link>
    </div>
  );
};

export default TeachersSection;
