const express = require("express");

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  createTestNotification,
} = require("../Controllers/notificationController");

const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

// Get logged-in user's notifications
router.get("/", authMiddleware, getNotifications);

// router.post("/test", authMiddleware, createTestNotification);

// Mark one notification as read
router.put("/:id/read", authMiddleware, markAsRead);

// Mark all notifications as read
router.put("/read-all", authMiddleware, markAllAsRead);

module.exports = router;