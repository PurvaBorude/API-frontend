// src/screens/HomePage.js
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/DashboardPage"; 
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Content */}
      <div className="home-main">
        <Dashboard />
      </div>
    </div>
  );
}
