// src/screens/HomePage.js
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/DashboardPage"; 
import "./HomePage.css";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Function to handle the sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Update state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // On desktop, keep sidebar open by default
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`home-container ${!isMobile && !isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
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

      {/* Dashboard Content */}
      <div className="home-main">
        <Dashboard />
      </div>
    </div>
  );
}