const express = require("express");

const { createJob, getAllJobs, getSingleJob } = require("../Controllers/jobController");

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

const router = express.Router();

router.post("/",authMiddleware,roleMiddleware("recruiter"),createJob);
router.get("/", getAllJobs);
router.get("/:id", getSingleJob);

module.exports = router;