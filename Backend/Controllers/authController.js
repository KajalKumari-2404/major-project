const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");


// registerUser
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// loginUser
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }
);

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    res.status(200).json({
  message: "Login successful",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({
    message: "Logout successful",
  });
};

//get profile
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Profile accessed successfully",
      user: req.user,
    });
  } catch (error) {
    console.error("Profile error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// updateProfile
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check required fields
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    // Check if email is already used by another user
    const existingUser = await User.findOne({
      email,
      _id: { $ne: req.user.id },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// changePassword
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Check required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    // Check new password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    // Find user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check current password
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Save new password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


module.exports = { registerUser, loginUser, logoutUser, getProfile, updateProfile, changePassword, };