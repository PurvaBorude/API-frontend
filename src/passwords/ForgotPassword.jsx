import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Passwords.css";

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      await forgotPassword(email);
      setMessage("Reset link sent to your email!");
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.message || "Failed to send reset link.");
    }
  };

  return (
    <div className="password-container">
      <form onSubmit={handleSubmit} className="password-form">
        <h2>Forgot Password</h2>
        {error && <p className="password-error">{error}</p>}
        {message && <p className="password-success">{message}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="password-input"
        />

        <button type="submit" className="password-button">Send Reset Link</button>

        <p className="password-back-text">
          Back to <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
