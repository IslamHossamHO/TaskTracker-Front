import React, { useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import PopupWrapper from "../Components/PopupWrapper";
import "../Styles/Popups/CreateTask.css";
import { DeleteUser } from "../Api";

export default function DeleteMemberC({ member, onClose, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await DeleteUser(member.id);
      onDelete?.(member.id); // notify parent that deletion succeeded
    } catch (error) {
      console.error("Failed to delete member:", error);
      // You can show an error toast/message here
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <PopupWrapper>
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-header">
            <h2 className="popup-title">
              <FaTrash style={{ marginRight: "12px" }} /> Confirm Delete
            </h2>
            <button className="popup-close" onClick={onClose} disabled={loading}>
              <FaTimes />
            </button>
          </div>

          <div className="popup-body">
            <p>Are you sure? This action cannot be undone.</p>
          </div>

          <div className="popup-actions">
            <button
              type="button"
              className="popup-btn popup-btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              <FaTimes /> Cancel
            </button>
            <button
              type="button"
              className="popup-btn popup-btn-danger"
              onClick={handleDelete}
              disabled={loading}
            >
              <FaTrash /> {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
}
