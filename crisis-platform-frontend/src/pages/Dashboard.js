import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 🔔 Audio ref (created once)
  const alertAudioRef = useRef(null);
  const prevCountRef = useRef(0);

  // initialize audio once
  useEffect(() => {
    alertAudioRef.current = new Audio("/alert.mp3");
  }, []);

  // Fetch incidents (polling)
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/incidents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();

        // 🔔 Play sound ONLY if a new HIGH severity incident arrives
        if (
          prevCountRef.current !== 0 &&
          data.length > prevCountRef.current
        ) {
          const hasNewHigh = data.some(
            (i) => i.severity === "High" && i.status !== "resolved"
          );

          if (hasNewHigh && alertAudioRef.current) {
            alertAudioRef.current.play().catch(() => {});
          }
        }

        prevCountRef.current = data.length;
        setIncidents(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchIncidents();
    const interval = setInterval(fetchIncidents, 5000); // poll every 5s

    return () => clearInterval(interval);
  }, [token]);

  // Update incident status
  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/incidents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    // refresh after update
    const res = await fetch("http://localhost:5000/api/incidents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setIncidents(data);
  };

  if (loading) return <h2>Loading incidents...</h2>;

  const hasHighSeverity = incidents.some(
    (i) => i.severity === "High" && i.status !== "resolved"
  );

  return (
    <div className="dashboard-container">
      <div className="control-panel">
        <h2>🧑‍💼 Coordinator Dashboard</h2>

        {/* 🚨 TOP ALERT */}
        {hasHighSeverity && (
          <div className="top-alert">
            🚨 ACTIVE HIGH‑SEVERITY INCIDENTS PRESENT
          </div>
        )}

        {incidents.length === 0 ? (
          <p>No incidents reported yet.</p>
        ) : (
          <div className="list">
            {incidents.map((incident) => (
              <div key={incident._id} className="card">
                {incident.severity === "High" &&
                  incident.status !== "resolved" && (
                    <div className="urgent-alert">
                      🚨 URGENT: HIGH SEVERITY INCIDENT
                    </div>
                  )}

                <p><strong>Type:</strong> {incident.type}</p>

                <p>
                  <strong>Severity:</strong>{" "}
                  <span
                    className={`badge ${incident.severity.toLowerCase()}`}
                  >
                    {incident.severity}
                  </span>
                </p>

                <p><strong>Description:</strong> {incident.description}</p>
                <p><strong>Status:</strong> {incident.status}</p>

                {incident.status !== "resolved" && (
                  <>
                    <button
                      className="assign-btn"
                      onClick={() =>
                        updateStatus(incident._id, "assigned")
                      }
                    >
                      Assign
                    </button>

                    <button
                      className="assign-btn"
                      style={{ background: "#2563eb", marginLeft: "10px" }}
                      onClick={() =>
                        updateStatus(incident._id, "resolved")
                      }
                    >
                      Resolve
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
