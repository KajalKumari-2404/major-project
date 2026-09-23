const Application = require("../Models/Application");
const Job = require("../Models/Job");

// Apply for a job
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.status !== "active") {
      return res.status(400).json({
        message: "This job is no longer active",
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      student: req.user.id,
    });

    if (existingApplication) {
      return res.status(409).json({
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      student: req.user.id,
      recruiter: job.recruiter,
    });

    res.status(201).json({
      message: "Job application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply job error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get logged-in student's applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    })
      .populate(
        "job",
        "title company location salary employmentType description skills"
      )
      .populate("recruiter", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Applications fetched successfully",
      applications,
    });
  } catch (error) {
    console.error("Get applications error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get applications received by logged-in recruiter
const getRecruiterApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      recruiter: req.user.id,
    })
      .populate(
        "job",
        "title company location salary employmentType"
      )
      .populate(
        "student",
        "name email"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Recruiter applications fetched successfully",
      applications,
    });
  } catch (error) {
    console.error(
      "Get recruiter applications error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Update application status by recruiter
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Applied",
      "Shortlisted",
      "Interview",
      "Rejected",
      "Selected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid application status",
      });
    }

    const application = await Application.findOne({
      _id: applicationId,
      recruiter: req.user.id,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error(
      "Update application status error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getRecruiterApplications,
  updateApplicationStatus,
};