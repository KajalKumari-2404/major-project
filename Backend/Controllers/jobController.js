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

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "active" })
      .populate("recruiter", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Jobs fetched successfully",
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Get all jobs error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


//getsingle job
const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id)
      .populate("recruiter", "name email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    console.error("Get single job error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


module.exports = { createJob, getAllJobs, getSingleJob, };