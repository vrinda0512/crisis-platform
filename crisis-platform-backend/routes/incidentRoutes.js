const express = require("express");
const router = express.Router();
const Incident = require("../models/Incident");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * 1️⃣ POST /api/incidents
 * Citizen can report incident
 */
router.post(
  "/",
  protect,
  authorize("citizen"),
  async (req, res) => {
    try {
      const { type, severity, description, location } = req.body;

      const incident = new Incident({
        type,
        severity,
        description,
        location,
        status: "reported",
      });

      const savedIncident = await incident.save();
      res.status(201).json(savedIncident);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * 2️⃣ GET /api/incidents
 * Coordinator dashboard
 */
router.get(
  "/",
  protect,
  authorize("coordinator"),
  async (req, res) => {
    try {
      const incidents = await Incident.find().sort({ createdAt: -1 });
      res.json(incidents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * 3️⃣ GET /api/incidents/:id
 * Citizen can view own incident status
 */
router.get(
  "/:id",
  protect,
  authorize("citizen", "coordinator"),
  async (req, res) => {
    try {
      const incident = await Incident.findById(req.params.id);

      if (!incident) {
        return res.status(404).json({ message: "Incident not found" });
      }

      res.json(incident);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * 4️⃣ PUT /api/incidents/:id
 * Coordinator updates status
 */
router.put(
  "/:id",
  protect,
  authorize("coordinator"),
  async (req, res) => {
    try {
      const { status } = req.body;

      const updatedIncident = await Incident.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      res.json(updatedIncident);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;