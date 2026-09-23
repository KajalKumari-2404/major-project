const express = require("express");

const {
  applyForJob,
  getMyApplications,
  getRecruiterApplications,
  updateApplicationStatus,
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

// Update application status by recruiter
router.put(
  "/:applicationId/status",
  authMiddleware,
  roleMiddleware("recruiter"),
  updateApplicationStatus
);

module.exports = router;