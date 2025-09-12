import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { token } = useAuth();
  const [websites, setWebsites] = useState([]);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [interval, setInterval] = useState(5);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      const res = await API.get("/websites");
      setWebsites(res.data.websites);
    } catch (err) {
      console.error(err);
      setError("Failed to load websites");
    }
  };

  const handleAddWebsite = async (e) => {
    e.preventDefault();
    if (!url) return setError("URL is required");

    try {
      await API.post("/websites", {
        url,
        name,
        checkInterval: interval,
      });

      setUrl("");
      setName("");
      setInterval(5);
      setError("");
      fetchWebsites();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add website");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this website?")) return;

    try {
      await API.delete(`/websites/${id}`);
      fetchWebsites();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    
      <div className="dashboard-container">
        <h2>📊 Dashboard</h2>

        <h3>➕ Add Website</h3>
        <form onSubmit={handleAddWebsite} style={{ marginBottom: "30px" }}>
          <div>
            <label>Website Name (optional):</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>URL:</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label>Check Interval (min):</label>
            <input
              type="number"
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              min={1}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Add Website</button>
        </form>

        <h3>🌐 Monitored Websites</h3>
        {websites.length === 0 ? (
          <p>No websites added yet.</p>
        ) : (
          <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>URL</th>
                <th>Status</th>
                <th>Uptime %</th>
                <th>Last Resp (ms)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {websites.map((site) => (
                <tr key={site._id}>
                  <td>{site.name || "Unnamed"}</td>
                  <td>
                    <a href={site.url} target="_blank" rel="noreferrer">
                      {site.url}
                    </a>
                  </td>
                  <td>{site.lastStatus}</td>
                  <td>{site.uptimePercentage}%</td>
                  <td>{site.lastResponseTime ?? "-"}</td>
                  <td>
                    <Link to={`/monitor/edit/${site._id}`}>✏️ Edit</Link> |{" "}
                    <button onClick={() => handleDelete(site._id)}>🗑️ Delete</button> |{" "}
                    <Link to={`/monitor/logs/${site._id}`}>📈 View Logs</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
  );
};

export default Dashboard;
