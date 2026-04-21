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

async function connectToMongo() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("Missing MONGO_URI in backend/.env");
  }
  
  // Avoid "buffering timed out" by ensuring we are connected before serving requests.
  await mongoose.connect(uri, {
    dbName: process.env.MONGO_DB_NAME || "crisisplatform",
    serverSelectionTimeoutMS: 5000,
  });

  console.log("MongoDB connected");
}

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ ROUTES
app.use("/api/incidents", require("./routes/incidentRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// ✅ PORT
const PORT = process.env.PORT || 5000;

// ✅ START SERVER (only after DB is ready)
connectToMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to MongoDB connection error.");
    console.error(err);
    process.exit(1);
  });
