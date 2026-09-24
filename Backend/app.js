const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const authRoutes = require("./Routes/authRoutes");
const jobRoutes = require("./Routes/jobRoutes");
const applicationRoutes = require("./Routes/applicationRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const savedJobRoutes = require("./Routes/savedJobRoutes");

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/saved-jobs", savedJobRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "JobConnect API is running",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

module.exports = app;