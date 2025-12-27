import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("incidents");

  const [incidents, setIncidents] = useState([
    {
      id: 1,
      type: "Medical",
      severity: "High",
      status: "Reported",
      location: "Sector 21",
    },
    {
      id: 2,
      type: "Fire",
      severity: "Medium",
      status: "Assigned",
      location: "MG Road",
    },
  ]);

  const resources = [
    { id: 1, name: "Ambulance A1", type: "Ambulance", status: "Available" },
    { id: 2, name: "Volunteer Team V2", type: "Volunteer", status: "Busy" },
  ];

  const assignResource = (id) => {
    const updated = incidents.map((incident) =>
      incident.id === id
        ? { ...incident, status: "Assigned" }
        : incident
    );
    setIncidents(updated);
  };

  return (
    <div className="dashboard-container">
      {/* LEFT MAP SECTION */}
      <div className="map-section">
        <h3>🗺️ Live Map View</h3>
        <div className="map-placeholder">
          <p>🔴 Incidents</p>
          <p>🟢 Resources</p>
          <p>(Map integration later)</p>
        </div>
      </div>

      {/* RIGHT CONTROL PANEL */}
      <div className="control-panel">
        <div className="tabs">
          <button
            className={activeTab === "incidents" ? "active" : ""}
            onClick={() => setActiveTab("incidents")}
          >
            Incidents
          </button>
          <button
            className={activeTab === "resources" ? "active" : ""}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </button>
        </div>

        {/* INCIDENTS TAB */}
        {activeTab === "incidents" && (
          <div className="list">
            {incidents.map((incident) => (
              <div key={incident.id} className="card">
                <h4>{incident.type}</h4>
                <p>📍 {incident.location}</p>
                <span className={`badge ${incident.severity.toLowerCase()}`}>
                  {incident.severity}
                </span>
                <p>Status: {incident.status}</p>

                {incident.status === "Reported" && (
                  <button
                    className="assign-btn"
                    onClick={() => assignResource(incident.id)}
                  >
                    Assign Resource
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* RESOURCES TAB */}
        {activeTab === "resources" && (
          <div className="list">
            {resources.map((res) => (
              <div key={res.id} className="card">
                <h4>{res.name}</h4>
                <p>Type: {res.type}</p>
                <p>Status: {res.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
