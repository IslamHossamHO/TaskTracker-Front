import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Styles/Pages/Notifications.css";
import { FaCheckCircle, FaExclamationCircle, FaBell, FaTimes } from "react-icons/fa";
import { IoIosAlarm, IoMdTime } from "react-icons/io";

export default function Notifications() {
  const [filter, setFilter] = useState("all");

  // ✨ Mock data for UI only
  const notificationsList = [
    {
      id: 1,
      title: "Task Completed",
      description: "Your assigned task 'Update API' has been marked completed.",
      isRead: false,
      priority: "high",
      time: "2025-09-06 21:15",
      icon: <FaExclamationCircle className="icon red" />,
    },
    {
      id: 2,
      title: "Reminder",
      description: "Don't forget the meeting tomorrow at 10 AM.",
      isRead: true,
      priority: "normal",
      time: "2025-09-05 14:30",
      icon: <FaCheckCircle className="icon green" />,
    },
    {
      id: 3,
      title: "Deadline Approaching",
      description: "Project Alpha deadline is in 2 days.",
      isRead: false,
      priority: "medium",
      time: "2025-09-04 18:00",
      icon: <IoMdTime className="icon yellow" />,
    },
    {
      id: 4,
      title: "System Alert",
      description: "Your password will expire in 5 days.",
      isRead: true,
      priority: "normal",
      time: "2025-09-03 09:45",
      icon: <IoIosAlarm className="icon orange" />,
    },
  ];

  // Filtering (UI only)
  const filteredNotifications = notificationsList.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  const unreadCount = notificationsList.filter((n) => !n.isRead).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const notificationVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="notifications-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div className="notifications-header" variants={itemVariants}>
        <div className="header-left">
          <h2 className="page-title">
            <FaBell className="title-icon" />
            Notifications
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount}</span>
            )}
          </h2>
          <p className="header-subtitle">
            Stay updated with your latest activities and tasks
          </p>
        </div>
        <div className="header-actions">
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
          <button className="mark-read-btn">Mark all as read</button>
        </div>
      </motion.div>

      {/* Notifications Content */}
      <motion.div className="notifications-content" variants={itemVariants}>
        {filteredNotifications.length > 0 ? (
          <div className="notifications-list">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                className={`notification-item ${
                  notification.isRead ? "read" : "unread"
                }`}
                variants={notificationVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="notification-icon">
                  {notification.icon}
                  {!notification.isRead && (
                    <div className="unread-indicator"></div>
                  )}
                </div>

                <div className="notification-content">
                  <div className="notification-header">
                    <h4 className="notification-title">{notification.title}</h4>
                    <div className="notification-actions">
                      {!notification.isRead && (
                        <button className="mark-read-single">
                          Mark as read
                        </button>
                      )}
                      <button className="delete-notification">
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                  <p className="notification-description">
                    {notification.description}
                  </p>
                  <div className="notification-meta">
                    <span className="notification-time">{notification.time}</span>
                    <span
                      className={`priority-badge ${notification.priority}`}
                    >
                      {notification.priority}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="no-notifications"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="no-notifications-icon">🔔</div>
            <h3>No notifications found</h3>
            <p>You're all caught up! Check back later for new updates.</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
