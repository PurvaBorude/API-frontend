import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Passwords.css";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      await resetPassword(token, newPassword);
      setMessage("Password reset successful!");
      setTimeout(() => navigate("/users/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.message || "Reset failed.");
    }
  };

  return (
    <div className="password-container">
      <form onSubmit={handleSubmit} className="password-form">
        <h2>Reset Password</h2>
        {error && <p className="password-error">{error}</p>}
        {message && <p className="password-success">{message}</p>}

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="password-input"
        />

        <button type="submit" className="password-button">Reset Password</button>

        <p className="password-back-text">
          Back to <Link to="/users/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
