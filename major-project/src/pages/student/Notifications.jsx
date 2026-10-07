import { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/v1";

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/notifications`, {
        withCredentials: true,
      });

      setNotifications(response.data.notifications);
    } catch (error) {
      console.error(error);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${API_URL}/notifications/${id}/read`,
        {},
        {
          withCredentials: true,
        }
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        `${API_URL}/notifications/read-all`,
        {},
        {
          withCredentials: true,
        }
      );

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading notifications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Notifications
        </h1>

        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No notifications
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-4 rounded-lg border ${
                notification.isRead
                  ? "bg-white"
                  : "bg-blue-50 border-blue-300"
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="font-semibold">
                    {notification.type}
                  </h2>

                  <p className="text-gray-700 mt-1">
                    {notification.message}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;