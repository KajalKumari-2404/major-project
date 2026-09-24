const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        message: "Your account has been blocked by admin",
      });
    }

    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;