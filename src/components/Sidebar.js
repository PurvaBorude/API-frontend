// src/components/Sidebar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

// Receive props from HomePage.js
const Sidebar = ({ isOpen, isMobile, onToggle }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const desktopCollapsed = !isMobile && !isOpen;

  return (
    <div className={`sidebar ${desktopCollapsed ? "collapsed" : ""} ${isMobile && isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        {isMobile ? (
          <button className="mobile-close" onClick={onToggle}>✕</button>
        ) : (
          <button className="toggle-btn" onClick={onToggle}>
            {desktopCollapsed ? "☰" : "✕"}
          </button>
        )}
        {/*{!desktopCollapsed && <h2>Monitor App</h2>}*/}
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard" onClick={isMobile ? onToggle : undefined}>
            <span className="icon">📊</span>
            <span className="label">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" onClick={isMobile ? onToggle : undefined}>
            <span className="icon">👤</span>
            <span className="label">Profile</span>
          </Link>
        </li>
        <li>
          <button onClick={() => { handleLogout(); if (isMobile) onToggle(); }}>
            <span className="icon">🚪</span>
            <span className="label">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;