import React from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import PopupWrapper from "../Components/PopupWrapper";
import "../Styles/Popups/CreateTask.css"; // ✅ reuse same CSS

export default function DeleteConfirmationPopup({ task, onClose, onDelete }) {
  return (
    <PopupWrapper>
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-header">
            <h2 className="popup-title">
              <FaTrash style={{ marginRight: "12px" }} /> Confirm Delete
            </h2>
            <button className="popup-close" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="popup-body">
            <p>
              Are you sure? This action Cannot be undone
            </p>
          </div>

          <div className="popup-actions">
            <button
              type="button"
              className="popup-btn popup-btn-secondary"
              onClick={onClose}
            >
              <FaTimes /> Cancel
            </button>
            <button
              type="button"
              className="popup-btn popup-btn-danger"
              onClick={() => {
                onDelete && onDelete(task);
                onClose();
              }}
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
}
