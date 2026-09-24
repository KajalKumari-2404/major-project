const User = require("../Models/User");
const Job = require("../Models/Job");
const Application = require("../Models/Application");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("recruiter", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error("Get all jobs error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("student", "name email")
      .populate("recruiter", "name email")
      .populate("job", "title company location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Applications fetched successfully",
      applications,
    });
  } catch (error) {
    console.error("Get all applications error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Block / Unblock user
const toggleUserBlock = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        message: "Admin cannot be blocked",
      });
    }

    user.isBlocked = !user.isBlocked;

    await user.save();

    res.status(200).json({
      message: user.isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.error("Toggle user block error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getAllUsers,
  getAllJobs,
  getAllApplications,
  toggleUserBlock,
};