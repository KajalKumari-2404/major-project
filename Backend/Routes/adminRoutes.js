const express = require("express");

const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

const {
  getAllUsers,
  getAllJobs,
  getAllApplications,
  toggleUserBlock,
} = require("../Controllers/adminController");

// Get all users
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

// Get all jobs
router.get(
  "/jobs",
  authMiddleware,
  roleMiddleware("admin"),
  getAllJobs
);

// Get all applications
router.get(
  "/applications",
  authMiddleware,
  roleMiddleware("admin"),
  getAllApplications
);

// Block / Unblock user
router.put(
  "/users/:userId/block",
  authMiddleware,
  roleMiddleware("admin"),
  toggleUserBlock
);

module.exports = router;