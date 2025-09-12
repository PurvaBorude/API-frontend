import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import "./MonitorDetails.css";

const MonitorDetailsPage = () => {
  const { id } = useParams();
  const [monitor, setMonitor] = useState(null);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/websites/${id}`)
      .then((res) => setMonitor(res.data.website))
      .catch((err) => {
        console.error(err);
        setError("Failed to load monitor");
      });

    API.get(`/websites/${id}/logs`)
      .then((res) => setLogs(res.data.logs))
      .catch((err) => {
        console.error(err);
        setError("Failed to load logs");
      });
  }, [id]);

  if (error) return <p className="monitor-error">{error}</p>;
  if (!monitor) return <p className="monitor-loading">Loading monitor details...</p>;

  return (
    <div className="monitor-details-container">
      <h2 className="monitor-details-title">Monitor Details</h2>
      <p><strong>URL:</strong> {monitor.url}</p>
      <p><strong>Name:</strong> {monitor.name}</p>
      <p><strong>Interval:</strong> {monitor.checkInterval} min</p>

      <h3 className="logs-title">Logs</h3>
      {logs.length === 0 ? (
        <p className="logs-empty">No logs found.</p>
      ) : (
        <ul className="logs-list">
          {logs.map((log) => (
            <li key={log._id} className="logs-item">
              <span className="log-time">{new Date(log.timestamp).toLocaleString()}</span> — 
              <span className="log-status"> {log.statusCode}</span> — 
              <span className="log-response"> {log.responseTime}ms</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MonitorDetailsPage;

