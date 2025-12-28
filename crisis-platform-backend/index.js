const incidentRoutes = require("./routes/incidentRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

//app.use("/api/incidents", incidentRoutes);
app.use("/api/incidents", require("./routes/incidentRoutes"));


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
