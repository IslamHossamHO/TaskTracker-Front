import React from "react";
import { FaRegEdit, FaClock, FaSave, FaTimes } from "react-icons/fa";
import PopupWrapper from "../Components/PopupWrapper";
import "../Styles/Popups/CreateTask.css";

export default function CreateTaskPopup({ onClose, onCreate }) {
  return (
    <PopupWrapper>
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-header">
            <h2 className="popup-title">
              <FaRegEdit style={{ marginRight: "12px" }} /> Create New Task
            </h2>
            <button className="popup-close" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="popup-body">
            <form
              className="popup-form"
              onSubmit={(e) => {
                e.preventDefault();
                onCreate && onCreate(); // ✅ send data up
                onClose();
              }}
            >
              <div className="form-field">
                <label className="form-label">Task Title</label>
                <input type="text" name="title" className="form-input" />
              </div>

              <div className="form-field">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-textarea" />
              </div>

              <div className="form-field">
                <label className="form-label">Assigned To</label>
                <select name="assignedToId" className="form-select">
                  <option value="">Select User</option>
                  <option value="1">User One</option>
                  <option value="2">User Two</option>
                </select>
              </div>

              <div className="field-grid">
                <div className="form-field">
                  <label className="form-label">Begin Date</label>
                  <input type="date" name="beginDate" className="form-input" />
                </div>
                <div className="form-field">
                  <label className="form-label">Due Date</label>
                  <input type="date" name="dueDate" className="form-input" />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Duration</label>
                <div className="duration-display">
                  <FaClock style={{ marginRight: "8px" }} />
                  3 day(s)
                </div>
              </div>

              <div className="popup-actions">
                <button
                  type="button"
                  className="popup-btn popup-btn-secondary"
                  onClick={onClose}
                >
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="popup-btn popup-btn-primary">
                  <FaSave /> Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
}
