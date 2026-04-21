import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VolunteerDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/incidents/available/list", {
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
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <h2>Loading incidents...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🤝 Volunteer Dashboard</h2>
      <p>Incidents that may need assistance (not resolved).</p>

      {incidents.length === 0 ? (
        <p>No active incidents right now.</p>
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
            <p>
              <strong>Type:</strong> {incident.type}
            </p>
            <p>
              <strong>Severity:</strong> {incident.severity}
            </p>
            <p>
              <strong>Description:</strong> {incident.description}
            </p>
            <p>
              <strong>Location:</strong> {incident.location}
            </p>
            <p>
              <strong>Status:</strong> {incident.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default VolunteerDashboard;

