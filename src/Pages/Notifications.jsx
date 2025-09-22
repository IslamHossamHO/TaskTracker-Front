import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../Styles/Pages/Notifications.css";
import { FaCheckCircle, FaExclamationCircle, FaBell, FaTimes } from "react-icons/fa";
import { IoIosAlarm, IoMdTime } from "react-icons/io";
import { DeleteNotification, GetNotificationByUserID, UpdateNotification } from "../Api";

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(sessionStorage.getItem("User"));

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!user?.id) return;
        const data = await GetNotificationByUserID(user.id);
        setNotifications(data || []);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [user?.id]);

  // 🔥 Mark one notification as read
  const markAsRead = async (id) => {
    try {
      await UpdateNotification(id); // only send ID
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };
  const HandleDelete = async (id) => {
    try {
      await DeleteNotification(id);
      // Remove the deleted notification from state
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };


  // 🔥 Mark all as read
  const markAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.filter((n) => !n.isRead).map((n) => UpdateNotification(n.id))
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
    }
  };

  // 🔥 Filtering
  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const notificationVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };

  // Icon (optional logic: here just use type/title fallback)
  const getIcon = (n) => {
    if (!n.isRead) return <FaExclamationCircle className="icon red" />;
    return <FaCheckCircle className="icon green" />;
  };

  return (
    <motion.div
      className="notifications-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="notifications-header" variants={itemVariants}>
        <div className="header-left">
          <h2 className="page-title">
            <FaBell className="title-icon" />
            Notifications
            {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
          </h2>
          <p className="header-subtitle">Stay updated with your latest activities</p>
        </div>
        <div className="header-actions">
          <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
          <button className="mark-read-btn" onClick={markAllAsRead}>
            Mark all as read
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div className="notifications-content" variants={itemVariants}>
        {loading ? (
          <p>Loading...</p>
        ) : filteredNotifications.length > 0 ? (
          <div className="notifications-list">
            {filteredNotifications.map((n, index) => (
              <motion.div
                key={n.id}
                className={`notification-item ${n.isRead ? "read" : "unread"}`}
                variants={notificationVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="notification-icon">
                  {getIcon(n)}
                  {!n.isRead && <div className="unread-indicator"></div>}
                </div>

                <div className="notification-content">
                  <div className="notification-header">
                    <h4 className="notification-title">{n.title}</h4>
                    <div className="notification-actions">
                      {!n.isRead && (
                        <button className="mark-read-single" onClick={() => markAsRead(n.id)}>
                          Mark as read
                        </button>
                      )}
                      <button
                        className="delete-notification"
                        onClick={() => HandleDelete(n.id)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                  <p className="notification-description">{n.message}</p>
                  <div className="notification-meta">
                    <span className="notification-time">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div className="no-notifications" variants={itemVariants} initial="hidden" animate="visible">
            <div className="no-notifications-icon">🔔</div>
            <h3>No notifications found</h3>
            <p>You're all caught up! Check back later for new updates.</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
