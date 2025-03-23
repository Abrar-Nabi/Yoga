import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/YogaStyles.css";

const YogaStyles = () => {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStyles();
  }, []);

  const fetchStyles = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/styles");
      const data = await res.json();
      setStyles(data.slice(0, 8)); // Show only the first 8 styles
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch styles.");
      setLoading(false);
    }
  };

  return (
    <div className="yoga-container">
      <h2 className="yoga-heading">Create a practice that has purpose</h2>
      <p className="yoga-description">
        Whether you’re just beginning or you have lots of experience, Glo caters to everyone from curious to committed practitioners.
        Our diverse styles guide you to build a routine that nourishes your complete wellness – body, mind, and spirit.
      </p>

      {loading && <p>Loading styles...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && styles.length > 0 ? (
        <div className="yoga-grid">
          {styles.map((style) => (
            <div className="yoga-card" key={style._id}>
              <div
                className="yoga-card-bg"
                style={{
                  backgroundImage: `url(http://localhost:5000/uploads/${style.picture})`,
                }}
              >
                <div className="yoga-card-content">
                  <span className="yoga-category">Yoga</span>
                  <h3 className="yoga-name">{style.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No yoga styles found.</p>
      )}

      <Link to="/all-styles">
        <button className="yoga-button">Explore our {styles.length}+ styles</button>
      </Link>
    </div>
  );
};

export default YogaStyles;
