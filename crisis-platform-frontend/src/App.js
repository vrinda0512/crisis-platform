import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import ReportIncident from "./pages/ReportIncident";
import IncidentStatus from "./pages/IncidentStatus";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Incident reporting still public */}
        <Route path="/report" element={<ReportIncident />} />
        <Route path="/incident/:id" element={<IncidentStatus />} />

        {/* Legacy path */}
        <Route path="/dashboard" element={<Navigate to="/coordinator/dashboard" replace />} />

        {/* Coordinator Dashboard */}
        <Route
          path="/coordinator/dashboard"
          element={
            <ProtectedRoute allowedRoles={["coordinator"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Volunteer Dashboard */}
        <Route
          path="/volunteer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["volunteer"]}>
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App; 