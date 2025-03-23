import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Import CSS

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "user" }), // Default role as 'user'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed! Please try again.");
      }

      setSuccess(true);

      // Show success message for 2 seconds, then navigate to login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {loading ? (
          <div className="loading-screen">Please wait...</div>
        ) : success ? (
          <div className="success-message">✔️ Successfully Registered!</div>
        ) : (
          <>
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                className="auth-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="auth-btn">Sign Up</button>
            </form>

            <p>
              Already have an account? <Link to="/login" className="auth-link" >Login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
