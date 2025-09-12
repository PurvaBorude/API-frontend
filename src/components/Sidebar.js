// src/components/Sidebar.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? "☰" : "✕"}
        </button>
        {!collapsed && <h2>Monitor App</h2>}
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <span className="icon">📊</span>
            <span className="label">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <span className="icon">👤</span>
            <span className="label">Profile</span>
          </Link>
        </li>
        <li>
          <button onClick={handleLogout}>
            <span className="icon">🚪</span>
            <span className="label">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
