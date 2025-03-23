import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Import CSS

const Login = () => {
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
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || "Invalid credentials! Try again.");
            }
    
            setSuccess(true);
    
            // Set token expiration (5 minutes from now)
            const expirationTime = Date.now() + 5 * 60 * 1000;
    
            // Save data to localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.name); // Store the user's name
            localStorage.setItem("role", data.role); // Store the role
            localStorage.setItem("email", email); // Save email to localStorage
            localStorage.setItem("tokenExpiration", expirationTime);
    
            // Auto-logout after 5 minutes
            setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                localStorage.removeItem("role");
                localStorage.removeItem("email");
                localStorage.removeItem("tokenExpiration");
                navigate("/login"); // Redirect to login page
            }, 5 * 60 * 1000);
    
            // Navigate based on role after success message
            setTimeout(() => {
                if (data.role === "admin") {
                    navigate("/admin"); // Redirect admins
                } else {
                    navigate("/"); // Redirect regular users
                }
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
                    <div className="loading-screen">Logging in...</div>
                ) : success ? (
                    <div className="success-message">✔️ Login Successful!</div>
                ) : (
                    <>
                        <h2>Login</h2>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSubmit}>
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
                            <button type="submit" className="auth-btn">Login</button>
                        </form>

                       <p>
    Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
</p>

                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
