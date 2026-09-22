const Job = require("../Models/Job");

// Create Job
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      location,
      salary,
      employmentType,
      skills,
    } = req.body;

    if (
      !title ||
      !company ||
      !description ||
      !location ||
      salary === undefined ||
      !employmentType ||
      !skills
    ) {
      return res.status(400).json({
        message: "All job fields are required",
      });
    }

    const job = await Job.create({
      title,
      company,
      description,
      location,
      salary,
      employmentType,
      skills,
      recruiter: req.user.id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("Create job error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createJob,
};