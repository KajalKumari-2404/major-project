const express = require("express");

const { createJob, getAllJobs, getSingleJob, updateJob } = require("../Controllers/jobController");

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

const router = express.Router();

router.post("/",authMiddleware,roleMiddleware("recruiter"),createJob);
router.get("/", getAllJobs);
router.get("/:id", getSingleJob);
router.put("/:id",authMiddleware,roleMiddleware("recruiter"),updateJob);

module.exports = router;