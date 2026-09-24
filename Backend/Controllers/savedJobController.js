const SavedJob = require("../Models/SavedJob");
const Job = require("../Models/Job");

// Save Job
const saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check already saved
    const existingSavedJob = await SavedJob.findOne({
      user: req.user.id,
      job: jobId,
    });

    if (existingSavedJob) {
      return res.status(400).json({
        message: "Job already saved",
      });
    }

    // Save job
    const savedJob = await SavedJob.create({
      user: req.user.id,
      job: jobId,
    });

    res.status(201).json({
      message: "Job saved successfully",
      savedJob,
    });
  } catch (error) {
    console.error("Save job error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Unsave Job
const unsaveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const savedJob = await SavedJob.findOneAndDelete({
      user: req.user.id,
      job: jobId,
    });

    if (!savedJob) {
      return res.status(404).json({
        message: "Saved job not found",
      });
    }

    res.status(200).json({
      message: "Job removed from saved jobs",
    });
  } catch (error) {
    console.error("Unsave job error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get Saved Jobs
const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({
      user: req.user.id,
    })
      .populate({
        path: "job",
        populate: {
          path: "recruiter",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Saved jobs fetched successfully",
      count: savedJobs.length,
      savedJobs,
    });
  } catch (error) {
    console.error("Get saved jobs error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  saveJob,
  unsaveJob,
  getSavedJobs,
};