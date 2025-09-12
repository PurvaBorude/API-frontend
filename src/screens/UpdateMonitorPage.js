// src/screens/UpdateMonitorPage.js
import Sidebar from "../components/Sidebar";
import AddEditMonitorPage from "../pages/AddEditMonitorPage";
import "./UpdateMonitorPage.css";

export default function UpdateMonitorPage() {
  return (
    <div className="update-monitor-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Add/Edit Monitor Content */}
      <div className="update-monitor-main">
        <AddEditMonitorPage />
      </div>
    </div>
  );
}
