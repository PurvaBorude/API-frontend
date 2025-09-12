import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await login(email, password); // calls backend via AuthContext
      navigate("/dashboard");
    } catch (err) {
      // Handle different error formats from backend
      const msg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Invalid credentials. Try again.";
      setError(msg);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1><i>API Go </i></h1>
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">
          Login
        </button>

        <p className="login-forgot-text">
          <Link to="/forgot-password" className="login-forgot-link">
            Forgot Password?
          </Link>
        </p>

        <p className="login-register-text">
          Don’t have an account?{" "}
          <Link to="/register" className="login-register-link">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
