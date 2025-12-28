import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all incidents
  useEffect(() => {
    fetch("http://localhost:5000/api/incidents")
      .then((res) => res.json())
      .then((data) => {
        setIncidents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Update incident status
  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/incidents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    // Refresh list after update
    const res = await fetch("http://localhost:5000/api/incidents");
    const data = await res.json();
    setIncidents(data);
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
                  onClick={() => updateStatus(incident._id, "assigned")}
                  style={{ marginRight: "10px" }}
                >
                  Assign
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
