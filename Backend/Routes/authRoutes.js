const express = require("express");
const { registerUser, loginUser, logoutUser, getProfile, updateProfile, changePassword } = require("../Controllers/authController");
const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// router.get("/profile", authMiddleware, (req, res) => {
//   res.status(200).json({
//     message: "Profile accessed successfully",
//     user: req.user,
//   });
// });

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);

router.get(
  "/recruiter-dashboard",
  authMiddleware,
  roleMiddleware("recruiter"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome to recruiter dashboard",
      user: req.user,
    });
  }
);

module.exports = router;