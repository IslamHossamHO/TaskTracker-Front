import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaTasks,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import PopupWrapper from "../Components/PopupWrapper";
import "../Styles/Popups/ViewMember.css";

export default function ViewMember({ member, onClose, onSave }) {
  const [role, setRole] = useState(member.role);

  return (
    <PopupWrapper>
      <div className="popup-overlay">
        <motion.div
          className="popup-container"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Header */}
          <div className="popup-header">
            <h2 className="popup-title">
              <FaUser style={{ marginRight: "12px" }} />
              Member Details
            </h2>
            <button className="popup-close" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="popup-body">
            <div className="member-profile-section">
              {/* Avatar and Basic Info */}
              <div className="member-avatar-section">
                <div className="member-avatar-large">
                  <FaUser size={48} color="#666" />
                </div>
                <div className="member-basic-info">
                  <h3 className="member-name-large">{member.name}</h3>
                  <div className="role-display-section">
                    <select
                      className="popup-select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Teacher">Teacher</option>
                      <option value="Engineer">Engineer</option>
                      <option value="SeniorTeacher">SeniorTeacher</option>
                      <option value="SeniorEngineer">SeniorEngineer</option>
                      <option value="School Principal">School Principal</option>
                      <option value="School Deputy">School Deputy</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Member Details */}
              <div className="member-details-grid">
                <div className="detail-item">
                  <div className="detail-icon">
                    <FaEnvelope />
                  </div>
                  <div className="detail-content">
                    <label className="detail-label">Email Address</label>
                    <span className="detail-value">{member.email}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <FaPhone />
                  </div>
                  <div className="detail-content">
                    <label className="detail-label">Phone Number</label>
                    <span className="detail-value">+123456789</span>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="detail-content">
                    <label className="detail-label">Join Date</label>
                    <span className="detail-value">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">
                    <FaTasks />
                  </div>
                  <div className="detail-content">
                    <label className="detail-label">Active Tasks</label>
                    <span className="detail-value">{member.tasks} tasks</span>
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
            <button
              className="popup-btn popup-btn-primary"
              onClick={() => onSave({ ...member, role })}
            >
              <FaSave /> Save Role
            </button>
          </div>
        </motion.div>
      </div>
    </PopupWrapper>
  );
}
