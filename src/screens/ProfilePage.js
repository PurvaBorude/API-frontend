// src/screens/ProfilePage.js
import Sidebar from "../components/Sidebar";
import ProfilePageComponent from "../pages/ProfilePage"; // if your component has same name, rename import
import "./ProfilePage.css";

export default function ProfilePage() {
  return (
    <div className="profile-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Profile Content */}
      <div className="profile-main">
        <ProfilePageComponent />
      </div>
    </div>
  );
}
