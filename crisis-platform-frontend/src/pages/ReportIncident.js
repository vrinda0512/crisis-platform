import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportIncident.css";

const ReportIncident = () => {
  const navigate = useNavigate();

  const [incidentType, setIncidentType] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just simulate success
    alert("Incident reported successfully");

    // Redirect to status page (we'll build later)
    navigate("/incident-status");
  };

  return (
    <div className="report-container">
      <div className="report-card">
        <h2>🚨 Report an Incident</h2>
        <p className="subtitle">
          Provide basic details so help can reach faster.
        </p>

        <form onSubmit={handleSubmit}>
          {/* INCIDENT TYPE */}
          <label>Incident Type</label>
          <select
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
            required
          >
            <option value="">Select type</option>
            <option value="medical">Medical</option>
            <option value="fire">Fire</option>
            <option value="flood">Flood</option>
            <option value="other">Other</option>
          </select>

          {/* SEVERITY */}
          <label>Severity</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="severity"
                value="low"
                onChange={(e) => setSeverity(e.target.value)}
                required
              />
              Low
            </label>

            <label>
              <input
                type="radio"
                name="severity"
                value="medium"
                onChange={(e) => setSeverity(e.target.value)}
              />
              Medium
            </label>

            <label>
              <input
                type="radio"
                name="severity"
                value="high"
                onChange={(e) => setSeverity(e.target.value)}
              />
              High
            </label>
          </div>

          {/* DESCRIPTION */}
          <label>Description</label>
          <textarea
            placeholder="Briefly describe the situation..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          {/* LOCATION (DUMMY) */}
          <div className="location-box">
            📍 Location auto‑detected
          </div>

          <button type="submit" className="submit-btn">
            Submit Incident
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
