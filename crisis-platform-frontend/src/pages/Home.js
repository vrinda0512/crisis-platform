import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Community Crisis <span>Response Platform</span>
          </h1>
          <p>
            A unified system to report emergencies, track resources, and
            coordinate faster responses during critical situations.
          </p>

          <div className="hero-buttons">
            <button
              className="btn primary"
              onClick={() => navigate("/report")}
            >
              🚨 Report Incident
            </button>
            <button
              className="btn outline"
              onClick={() => navigate("/dashboard")}
            >
              🧭 Coordinator Dashboard
            </button>
          </div>
        </div>

        <div className="hero-glass">
          <h3>Why This Matters</h3>
          <p>
            During emergencies, delays cost lives. Our platform ensures
            real‑time visibility and faster coordination between citizens,
            volunteers, and authorities.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat-card">
          <h2>⚡ Faster</h2>
          <p>Incident Response</p>
        </div>
        <div className="stat-card">
          <h2>📍 Real‑Time</h2>
          <p>Tracking</p>
        </div>
        <div className="stat-card">
          <h2>🤝 Unified</h2>
          <p>Coordination</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2 className="section-title">Core Features</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🚨 Incident Reporting</h3>
            <p>
              Citizens can instantly report emergencies with severity,
              location, and description.
            </p>
          </div>

          <div className="feature-card">
            <h3>🗺️ Live Map Dashboard</h3>
            <p>
              Incidents and resources are visualized on a real‑time map
              for quick decision making.
            </p>
          </div>

          <div className="feature-card">
            <h3>🚑 Resource Management</h3>
            <p>
              Track availability of ambulances, volunteers, and shelters
              efficiently.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 Status Tracking</h3>
            <p>
              Monitor incidents from reported to resolved with complete
              transparency.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="workflow">
        <h2 className="section-title">How It Works</h2>

        <div className="workflow-steps">
          <div className="step">1️⃣ Report an emergency</div>
          <div className="step">2️⃣ Incident appears on dashboard</div>
          <div className="step">3️⃣ Resources are assigned</div>
          <div className="step">4️⃣ Incident resolved faster</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Built for Impact. Designed for Speed.</h2>
        <p>
          Empowering communities with technology during critical moments.
        </p>
        <button
          className="btn primary"
          onClick={() => navigate("/report")}
        >
          Get Started Now
        </button>
      </section>
    </div>
  );
};

export default Home;
