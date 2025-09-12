import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";
/*import "..components/Layout.js";
import "../components/Layout.css";
import Layout from "../components/Layout";
*/

const ProfilePage = () => {
  const { user, changePassword, changeUsername } = useAuth();

  // Username state
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // Password state
  const [editingPassword, setEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  if (!user) return <p>Loading user info...</p>;

  // Handle username change
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setUsernameError(""); setUsernameMessage("");
    try {
      await changeUsername(newUsername);
      setUsernameMessage("Username updated!");
      setEditingUsername(false);
      setNewUsername("");
    } catch (err) {
      setUsernameError(err.response?.data?.message || "Failed to change username.");
    }
  };

  // Handle password change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(""); setPasswordMessage("");
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordMessage("Password updated!");
      setEditingPassword(false);
      setCurrentPassword(""); setNewPassword("");
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Failed to change password.");
    }
  };

  return (
    
    <div className="profile-card">
      <h2>Profile</h2>

      <div className="profile-item">
        <strong>Email:</strong> {user.email}
      </div>

      <div className="profile-item">
        <strong>Username:</strong> {user.username}
        {!editingUsername ? (
          <button onClick={() => setEditingUsername(true)} className="edit-btn">Change</button>
        ) : (
          <form onSubmit={handleUsernameSubmit} className="inline-form">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="New username"
              required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingUsername(false)}>Cancel</button>
          </form>
        )}
        {usernameMessage && <p className="success">{usernameMessage}</p>}
        {usernameError && <p className="error">{usernameError}</p>}
      </div>

      <div className="profile-item">
        <strong>Password:</strong> ********
        {!editingPassword ? (
          <button onClick={() => setEditingPassword(true)} className="edit-btn">Change</button>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="inline-form">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingPassword(false)}>Cancel</button>
          </form>
        )}
        {passwordMessage && <p className="success">{passwordMessage}</p>}
        {passwordError && <p className="error">{passwordError}</p>}
      </div>
    </div>
    
  );
};

export default ProfilePage;
