const Notification = require("../Models/Notification");

// Get logged-in user's notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Notifications fetched successfully",
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

// Mark one notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update notification",
      error: error.message,
    });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.user.id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update notifications",
      error: error.message,
    });
  }
};


const createTestNotification = async (req, res) => {
  try {
    const notification = await Notification.create({
      user: req.user.id,
      message: "Test notification: Your application has been updated",
      type: "General",
    });

    res.status(201).json({
      message: "Test notification created successfully",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create test notification",
      error: error.message,
    });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
};