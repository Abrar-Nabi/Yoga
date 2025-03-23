import React, { useEffect, useState } from "react";
import "../styles/AllYogaStyles.css";
import Navbar from "./Navbar";
import Footer from "../pages/Footer";

const AllYogaStyles = () => {
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
      setStyles(data); // Show all styles
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch styles.");
      setLoading(false);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="all-yoga-container">
      <h2 className="all-yoga-heading">Explore All Our Yoga Styles</h2>

      {loading && <p>Loading styles...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && styles.length > 0 ? (
        <div className="all-yoga-grid">
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
    </div>
    <Footer/>
    </div>
    
  );
};

export default AllYogaStyles;
