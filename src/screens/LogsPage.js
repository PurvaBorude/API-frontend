// src/screens/LogsPage.js
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MonitorDetailsPage from "../pages/MonitorDetailsPage";
import "./LogsPage.css";

export default function LogsPage() {
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
    <div className={`logs-container ${!isMobile && !isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
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

      {/* Logs Content */}
      <div className="logs-main">
        <MonitorDetailsPage />
      </div>
    </div>
  );
}