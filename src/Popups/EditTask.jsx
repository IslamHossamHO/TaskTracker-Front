import React from "react";
import { FaRegEdit, FaSave, FaTimes } from "react-icons/fa";
import PopupWrapper from "../Components/PopupWrapper";
import "../Styles/Popups/CreateTask.css"; // ✅ reuse same CSS for consistency

export default function EditTaskPopup({ task, onClose, onSave }) {
  return (
    <PopupWrapper>
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-header">
            <h2 className="popup-title">
              <FaRegEdit style={{ marginRight: "12px" }} /> Edit Task
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
                onSave && onSave(task); // ✅ send updated data up
                onClose();
              }}
            >
              <div className="form-field">
                <label className="form-label">Task Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={task?.title}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  defaultValue={task?.description}
                  className="form-textarea"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Assigned To</label>
                <select
                  name="assignedToId"
                  defaultValue={task?.assignedToId}
                  className="form-select"
                >
                  <option value="">Select User</option>
                  <option value="1">User One</option>
                  <option value="2">User Two</option>
                </select>
              </div>

              <div className="field-grid">
                <div className="form-field">
                  <label className="form-label">Begin Date</label>
                  <input
                    type="date"
                    name="beginDate"
                    defaultValue={task?.beginDate}
                    className="form-input"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    defaultValue={task?.dueDate}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  defaultValue={task?.status}
                  className="form-select"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
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
                  <FaSave /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
}
