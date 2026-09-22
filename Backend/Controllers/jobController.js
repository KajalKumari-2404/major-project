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

//update job
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      company,
      description,
      location,
      salary,
      employmentType,
      skills,
      status,
    } = req.body;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check job ownership
    if (job.recruiter.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this job",
      });
    }

    job.title = title ?? job.title;
    job.company = company ?? job.company;
    job.description = description ?? job.description;
    job.location = location ?? job.location;
    job.salary = salary ?? job.salary;
    job.employmentType = employmentType ?? job.employmentType;
    job.skills = skills ?? job.skills;
    job.status = status ?? job.status;

    await job.save();

    res.status(200).json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error("Update job error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { createJob, getAllJobs, getSingleJob, updateJob};