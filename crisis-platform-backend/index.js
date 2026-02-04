const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ✅ ROUTE IMPORTS
const incidentRoutes = require("./routes/incidentRoutes");
const authRoutes = require("./routes/authRoutes");

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ ROUTES
app.use("/api/incidents", require("./routes/incidentRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// ✅ PORT
const PORT = process.env.PORT || 5000;

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
