import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportIncident.css";

const ReportIncident = () => {
  const navigate = useNavigate();

  const [incidentType, setIncidentType] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const incidentData = {
      type: incidentType,          // must match backend enum
      severity: severity,
      description: description,
      location: "Auto-detected",   // dummy for now
    };

    try {
      const res = await fetch("http://localhost:5000/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incidentData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert("Incident reported successfully");

      // Redirect to STATUS PAGE with real ID
      navigate(`/incident/${data._id}`);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
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
            <option value="Medical">Medical</option>
            <option value="Fire">Fire</option>
            <option value="Flood">Flood</option>
            <option value="Other">Other</option>
          </select>

          {/* SEVERITY */}
          <label>Severity</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="severity"
                value="Low"
                onChange={(e) => setSeverity(e.target.value)}
                required
              />
              Low
            </label>

            <label>
              <input
                type="radio"
                name="severity"
                value="Medium"
                onChange={(e) => setSeverity(e.target.value)}
              />
              Medium
            </label>

            <label>
              <input
                type="radio"
                name="severity"
                value="High"
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

          {/* LOCATION */}
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