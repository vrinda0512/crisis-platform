const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Medical", "Fire", "Flood", "Other"],
    },

    severity: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "reported",
      enum: ["reported", "assigned", "resolved"],
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Incident", IncidentSchema);
