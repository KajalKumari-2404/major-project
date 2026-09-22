const express = require("express");

const {
  applyForJob,
  getMyApplications,
  getRecruiterApplications,
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

// Get applications received by recruiter
router.get(
  "/recruiter",
  authMiddleware,
  roleMiddleware("recruiter"),
  getRecruiterApplications
);

module.exports = router;