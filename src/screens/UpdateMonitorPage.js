// src/screens/UpdateMonitorPage.js
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddEditMonitorPage from "../pages/AddEditMonitorPage";
import "./UpdateMonitorPage.css";

export default function UpdateMonitorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Update state on window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      // On desktop, ensure sidebar is open by default
      if (!isMobileView) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`update-monitor-container ${!isMobile && !isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
      {isMobile && (
        <>
          <div className="mobile-topbar">
            <button className="hamburger" onClick={toggleSidebar}>
              ☰
            </button>
            <div className="brand">Monitor App</div>
          </div>
          {isSidebarOpen && <div className="backdrop" onClick={toggleSidebar}></div>}
        </>
      )}

      {/* Sidebar with dynamic class based on state */}
      <Sidebar 
        isMobile={isMobile} 
        isOpen={isSidebarOpen} 
        onToggle={toggleSidebar} 
      />

      {/* Main Content */}
      <div className="update-monitor-main">
        <AddEditMonitorPage />
      </div>
    </div>
  );
}