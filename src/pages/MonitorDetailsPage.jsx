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

      <div className="monitor-info">
        <p className="monitor-field"><strong>URL:</strong> {monitor.url}</p>
        <p className="monitor-field"><strong>Name:</strong> {monitor.name}</p>
        <p className="monitor-field">
          <strong>Interval:</strong>
          <span className="interval-badge">{monitor.checkInterval} min</span>
        </p>
      </div>

      <h3 className="logs-header">Logs Timeline</h3>
      <div className="logs-timeline">
        {logs.map((log) => (
          <div key={log._id} className="timeline-item">
            <div
              className={`timeline-dot ${
                log.statusCode === 200 ? "dot-up" : "dot-down"
              }`}
            ></div>
            <div className="timeline-content">
              <span className="log-time">
              {log.checkedAt ? new Date(log.checkedAt).toLocaleString() : "N/A"}
              </span>
              <p>
                Status:{" "}
                <strong
                  className={
                    log.statusCode === 200 ? "status-up" : "status-down"
                  }
                >
                  {log.statusCode}
                </strong>{" "}
                | Response: <span className="response-time">{log.responseTime}ms</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonitorDetailsPage;
