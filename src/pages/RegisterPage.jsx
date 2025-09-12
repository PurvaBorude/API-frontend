import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await register(name, email, password); // calls backend via AuthContext
      navigate("/dashboard");
    } catch (err) {
      // Handle validation or server errors
      const msg =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Registration failed.";
      setError(msg);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Register</h2>
        {error && <p className="register-error">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          className="register-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="register-button">
          Register
        </button>

        <p className="register-login-text">
          Already have an account?{" "}
          <Link to="/login" className="register-login-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
