import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import "./AddMonitor.css"; 

const AddEditMonitorPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [interval, setInterval] = useState(5);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      API.get(`/websites/${id}`)
        .then((res) => {
          const monitor = res.data.website;
          setUrl(monitor.url);
          setName(monitor.name || "");
          setInterval(monitor.checkInterval || 5);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch monitor details");
        });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { url, name, checkInterval: interval };

    try {
      if (isEdit) {
        await API.put(`/websites/${id}`, data);
      } else {
        await API.post("/websites", data);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to submit form");
    }
  };

  return (
    <div className="monitor-container">
      <h2 className="monitor-title">{isEdit ? "Edit Monitor" : "Add Monitor"}</h2>
      {error && <p className="monitor-error">{error}</p>}
      
      <form onSubmit={handleSubmit} className="monitor-form">
        <div className="form-group">
          <label>Website URL:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Custom Name (optional):</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Website"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Check Interval (in minutes):</label>
          <input
            type="number"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            min="1"
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="form-button">
          {isEdit ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddEditMonitorPage;

