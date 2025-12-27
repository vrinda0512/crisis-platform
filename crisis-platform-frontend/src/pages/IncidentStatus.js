import React from "react";
import { useParams } from "react-router-dom";
import "./IncidentStatus.css";

const IncidentStatus = () => {
  const { id } = useParams();

  // Dummy incident data (later comes from backend)
  const incident = {
    type: "Medical Emergency",
    severity: "High",
    location: "Auto‑detected location",
    status: "reported", // reported | assigned | resolved
  };

  const getStatusBadge = () => {
    if (incident.status === "reported") return "status reported";
    if (incident.status === "assigned") return "status assigned";
    if (incident.status === "resolved") return "status resolved";
  };

  const getStatusText = () => {
    if (incident.status === "reported") return "🟡 Reported";
    if (incident.status === "assigned") return "🔵 Assigned";
    if (incident.status === "resolved") return "🟢 Resolved";
  };

  return (
    <div className="status-container">
      <div className="status-card">
        <h2>📋 Incident Status</h2>
        <p className="subtitle">
          Your request has been received and is being processed.
        </p>

        <div className="info">
          <div className="info-row">
            <span>Incident Type</span>
            <strong>{incident.type}</strong>
          </div>

          <div className="info-row">
            <span>Severity</span>
            <strong>{incident.severity}</strong>
          </div>

          <div className="info-row">
            <span>Location</span>
            <strong>{incident.location}</strong>
          </div>

          <div className="info-row">
            <span>Status</span>
            <span className={getStatusBadge()}>
              {getStatusText()}
            </span>
          </div>
        </div>

        <p className="trust-text">
          🚑 Help is on the way. Please stay safe and available for
          further communication.
        </p>
      </div>
    </div>
  );
};

export default IncidentStatus;
