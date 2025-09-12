// src/screens/LogsPage.js
import Sidebar from "../components/Sidebar";
import MonitorDetailsPage from "../pages/MonitorDetailsPage"; 
import "./LogsPage.css";

export default function LogsPage() {
  return (
    <div className="logs-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Logs Content */}
      <div className="logs-main">
        <MonitorDetailsPage />
      </div>
    </div>
  );
}
