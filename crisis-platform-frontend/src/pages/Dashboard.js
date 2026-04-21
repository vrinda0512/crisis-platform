import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [navigate]);


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
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
