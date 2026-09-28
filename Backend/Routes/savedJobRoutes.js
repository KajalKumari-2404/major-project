const express = require("express");

const {
  saveJob,
  unsaveJob,
  getSavedJobs,
} = require("../Controllers/savedJobController");

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

const router = express.Router();

// Save Job
router.post(
  "/:jobId",
  authMiddleware,
  roleMiddleware("student"),
  saveJob
);

// Unsave Job
router.delete(
  "/:jobId",
  authMiddleware,
  roleMiddleware("student"),
  unsaveJob
);

// Get Saved Jobs
router.get(
  "/",
  authMiddleware,
  roleMiddleware("student"),
  getSavedJobs
);

module.exports = router;