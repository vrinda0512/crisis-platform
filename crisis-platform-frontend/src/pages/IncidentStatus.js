import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IncidentStatus = () => {
  const { id } = useParams(); // 👈 from URL
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/incidents/${id}`
        );
        const data = await res.json();
        setIncident(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  if (loading) return <h2>Loading incident...</h2>;

  if (!incident || incident.message)
    return <h2>Incident not found</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>📍 Incident Status</h2>
      <p><strong>ID:</strong> {incident._id}</p>
      <p><strong>Type:</strong> {incident.type}</p>
      <p><strong>Severity:</strong> {incident.severity}</p>
      <p><strong>Description:</strong> {incident.description}</p>
      <p><strong>Location:</strong> {incident.location}</p>
      <p><strong>Status:</strong> {incident.status}</p>
    </div>
  );
};

export default IncidentStatus;
