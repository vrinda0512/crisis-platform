import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/incidents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          const msg = data?.message || data?.error || "Unauthorized";
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            alert(msg);
            navigate("/login");
            return;
          }
          throw new Error(msg);
        }
        setIncidents(Array.isArray(data) ? data : []);
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
      });
  }, [navigate]);

      }
    };

    fetchIncidents();
    const interval = setInterval(fetchIncidents, 5000); // poll every 5s

    return () => clearInterval(interval);
  }, [token]);

  // Update incident status
  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem("token");

    const updateRes = await fetch(`http://localhost:5000/api/incidents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!updateRes.ok) {
      const data = await updateRes.json().catch(() => ({}));
      const msg = data?.message || data?.error || "Failed to update status";
      if (updateRes.status === 401 || updateRes.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        alert(msg);
        navigate("/login");
        return;
      }
      alert(msg);
      return;
    }

    // refresh after update
    const res = await fetch("http://localhost:5000/api/incidents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = data?.message || data?.error || "Failed to refresh incidents";
      alert(msg);
      return;
    }

    const data = await res.json();
    setIncidents(Array.isArray(data) ? data : []);
  };


  if (loading) return <h2>Loading incidents...</h2>;

  const hasHighSeverity = incidents.some(
    (i) => i.severity === "High" && i.status !== "resolved"
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧑‍💼 Coordinator Dashboard</h2>

      {incidents.length === 0 ? (
        <p>No incidents reported yet.</p>
      ) : (
        incidents.map((incident) => (
          <div
            key={incident._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <p><strong>Type:</strong> {incident.type}</p>
            <p><strong>Severity:</strong> {incident.severity}</p>
            <p><strong>Description:</strong> {incident.description}</p>
            <p><strong>Status:</strong> {incident.status}</p>

            {incident.status !== "resolved" && (
              <>
                <button
                  onClick={() => updateStatus(incident._id, "in-progress")}
                  style={{ marginRight: "10px" }}
                >
                  Mark In-Progress
                </button>

                <button
                  onClick={() => updateStatus(incident._id, "resolved")}
                >
                  Resolve
                </button>
              </>
            )}
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
