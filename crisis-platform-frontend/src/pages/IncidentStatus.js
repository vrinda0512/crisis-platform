import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IncidentStatus = () => {
  const { id } = useParams(); // ✅ get ID from URL
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/incidents/${id}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch incident");
        }

        setIncident(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (id) fetchIncident(); // ✅ only call if id exists
  }, [id]);

  if (loading) return <p>Loading incident...</p>;
  if (!incident) return <p>Incident not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📍 Incident Status</h2>

      <p><b>ID:</b> {incident._id}</p>
      <p><b>Type:</b> {incident.type}</p>
      <p><b>Severity:</b> {incident.severity}</p>
      <p><b>Description:</b> {incident.description}</p>
      <p><b>Location:</b> {incident.location}</p>
      <p><b>Status:</b> {incident.status}</p>

      {/* ✅ GOOGLE MAP */}
      <iframe
        title="Incident Location"
        width="100%"
        height="300"
        style={{ border: 0, marginTop: "10px" }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          incident.location
        )}&output=embed`}
      />
    </div>
  );
};

export default IncidentStatus;