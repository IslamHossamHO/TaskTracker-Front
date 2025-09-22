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
import { ChangeUserRole } from "../Api";

export default function ViewMember({ member, onClose, onSave }) {
  const [role, setRole] = useState(member.roleHash); // stores encrypted ID
  const [loading, setLoading] = useState(false);

  // Map of encrypted role IDs to human-readable names
  const roleMap = {
    "e64d8a3d9a": "Super Admin",
    "8c6976e5b5": "Admin",
    "a55c5c897d": "Senior Engineer",
    "f9a27d94f2": "Engineer",
    "b5284c8720": "Senior Teacher",
    "b5284c2794": "Teacher",
    "x2951g0725": "Reviewer",
  };

  // Convert roleMap to an array for dropdown
  const roleOptions = Object.entries(roleMap).map(([key, value]) => ({
    key,
    value,
  }));

  const handleSave = async () => {
    if (!role) return;
    setLoading(true);
    try {
      await ChangeUserRole(member.id, role); // encrypted ID
      // Update parent with human-readable role
      onSave && onSave({ ...member, role: roleMap[role], roleHash: role });
      onClose();
    } catch (error) {
      console.error("Failed to change role:", error);
      alert("Failed to update role. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <PopupWrapper>
      <div className="popup-overlay">
        <motion.div
          className="popup-container"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
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
              <div className="member-avatar-section">
                <div className="member-avatar-large">
                  <FaUser size={48} color="#666" />
                </div>
                <div className="member-basic-info">
                  <h3 className="member-name-large">{member.name}</h3>
                  <div className="role-display-section">
                    <select
                      className="popup-select"
                      value={role} // encrypted ID
                      onChange={(e) => setRole(e.target.value)} // updates encrypted ID
                      disabled={loading}
                    >
                      {roleOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.value} {/* human-readable name */}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Member Details */}
              <div className="member-details-grid">
                <div className="detail-item">
                  <div className="detail-icon"><FaEnvelope /></div>
                  <div className="detail-content">
                    <label className="detail-label">Email Address</label>
                    <span className="detail-value">{member.email}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon"><FaPhone /></div>
                  <div className="detail-content">
                    <label className="detail-label">Phone Number</label>
                    <span className="detail-value">+123456789</span>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon"><FaCalendarAlt /></div>
                  <div className="detail-content">
                    <label className="detail-label">Join Date</label>
                    <span className="detail-value">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon"><FaTasks /></div>
                  <div className="detail-content">
                    <label className="detail-label">Active Tasks</label>
                    <span className="detail-value">3 tasks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="popup-actions">
            <button className="popup-btn popup-btn-secondary" onClick={onClose} disabled={loading}>
              <FaTimes /> Close
            </button>
            <button className="popup-btn popup-btn-primary" onClick={handleSave} disabled={loading}>
              <FaSave /> {loading ? "Saving..." : "Save Role"}
            </button>
          </div>
        </motion.div>
      </div>
    </PopupWrapper>
  );
}
