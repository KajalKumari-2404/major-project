const express = require("express");

const { createJob } = require("../Controllers/jobController");

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("recruiter"),
  createJob
);

module.exports = router;