const express = require("express");

const {
  applyForJob,
  getMyApplications,
} = require("../Controllers/applicationController");

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

const router = express.Router();

// Apply for a job
router.post(
  "/:jobId",
  authMiddleware,
  roleMiddleware("student"),
  applyForJob
);

// Get logged-in student's applications
router.get(
  "/my-applications",
  authMiddleware,
  roleMiddleware("student"),
  getMyApplications
);

module.exports = router;