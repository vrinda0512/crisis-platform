import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IncidentStatus = () => {
  const { id } = useParams();
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchIncident();
  }, [id]);

  if (loading) return <p style={{ color: "#fff" }}>Loading...</p>;
  if (!incident) return <p style={{ color: "#fff" }}>Incident not found</p>;

  const isHighSeverity = incident.severity === "High";

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📍 Incident Status</h2>

        {isHighSeverity && (
          <div style={styles.alert}>
            🚨 URGENT: HIGH SEVERITY INCIDENT
          </div>
        )}

        <div style={styles.row}>
          <span style={styles.label}>ID</span>
          <span style={styles.value}>{incident._id}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Type</span>
          <span style={styles.value}>{incident.type}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Severity</span>
          <span
            style={{
              ...styles.badge,
              backgroundColor:
                incident.severity === "High"
                  ? "#dc2626"
                  : incident.severity === "Medium"
                  ? "#f59e0b"
                  : "#16a34a",
            }}
          >
            {incident.severity}
          </span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Status</span>
          <span
            style={{
              ...styles.badge,
              backgroundColor:
                incident.status === "resolved"
                  ? "#16a34a"
                  : "#2563eb",
            }}
          >
            {incident.status}
          </span>
        </div>

        <div style={styles.desc}>
          <b>Description:</b> {incident.description}
        </div>

        <div style={styles.mapWrapper}>
          <iframe
            title="Incident Location"
            width="100%"
            height="220"
            style={{ borderRadius: "10px", border: 0 }}
            loading="lazy"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              incident.location
            )}&output=embed`}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "#020617",
    color: "#e5e7eb",
    width: "420px",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 0 20px rgba(0,0,0,0.6)",
  },
  heading: {
    marginBottom: "10px",
  },
  alert: {
    backgroundColor: "#7f1d1d",
    color: "#fecaca",
    padding: "8px",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: "12px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  label: {
    color: "#94a3b8",
  },
  value: {
    fontWeight: "500",
  },
  badge: {
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    color: "#fff",
  },
  desc: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#cbd5f5",
  },
  mapWrapper: {
    marginTop: "14px",
  },
};

export default IncidentStatus;
