import React from "react";
import { FaEye, FaTimes, FaCalendarAlt, FaUser, FaClock } from "react-icons/fa";
import PopupWrapper from "../Components/PopupWrapper";
import "../Styles/Popups/PopupBase.css";

export default function ViewTask({ task, onClose }) {
  if (!task) return null;

  return (
    <PopupWrapper>
      <div className="popup-overlay">
        <div className="popup-container">
          {/* Header */}
          <div className="popup-header">
            <h2 className="popup-title">
              <FaEye style={{ marginRight: "12px" }} />
              Task Details
            </h2>
            <button className="popup-close" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="popup-body">
            <div className="task-details-section">
              {/* Task Header */}
              <div className="task-header">
                <h3 className="task-title-large">{task.title}</h3>
                <div className="task-meta">
                  <span className="status-badge-large" style={{ color: "var(--text-secondary)" }}>
                    {task.status}
                  </span>
                </div>
              </div>

              {/* Task Description */}
              {task.description && (
                <div className="task-description-section">
                  <h4 className="section-title">Description</h4>
                  <p className="task-description-text">{task.description}</p>
                </div>
              )}

              {/* Task Details Grid */}
              <div className="task-details-grid">
                <div className="detail-item">
                  <div className="detail-icon">
                    <FaUser />
                  </div>
                  <div className="detail-content">
                    <label className="detail-label">Assigned To</label>
                    <span className="detail-value">{task.assignedBy}</span>
                  </div>
                </div>

                {task.weeks && (
                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaClock />
                    </div>
                    <div className="detail-content">
                      <label className="detail-label">Duration</label>
                      <span className="detail-value">{task.weeks}</span>
                    </div>
                  </div>
                )}

                <div className="detail-item">
                  <div className="detail-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="detail-content">
                    <label className="detail-label">Due Date</label>
                    <span className="detail-value">{task.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="popup-actions">
            <button className="popup-btn popup-btn-secondary" onClick={onClose}>
              <FaTimes /> Close
            </button>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
}
