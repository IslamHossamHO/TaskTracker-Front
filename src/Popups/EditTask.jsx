import React, { useEffect, useState } from "react";
import { FaRegEdit, FaSave, FaTimes } from "react-icons/fa";
import PopupWrapper from "../Components/PopupWrapper";
import "../Styles/Popups/CreateTask.css";
import { GetAllUsers, UpdateTaskAPI } from "../Api";

export default function EditTaskPopup({ task, onClose, onSave }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: task?.id || "",
    taskName: task?.taskName || "",
    taskDescription: task?.taskDescription || "",
    assignedToName: task?.assignedToName || "",
    status: task?.status || "Not Started",
    dueDate: task?.dueDate?.split("T")[0] || "",
  });

  // 🔹 Fetch users for dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await GetAllUsers();
        setUsers(data || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await UpdateTaskAPI(formData.id, formData); // ✅ fixed
      if (updated) {
        onSave && onSave(updated);
        onClose();
      }
    } catch (err) {
      console.error("Failed to update task:", err);
    } finally {
      setLoading(false);
    }
  };

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
            <form className="popup-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="form-label">Task Title</label>
                <input
                  type="text"
                  name="taskName"
                  value={formData.taskName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">Description</label>
                <textarea
                  name="taskDescription"
                  value={formData.taskDescription}
                  onChange={handleChange}
                  className="form-textarea"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Assigned To</label>
                <select
                  name="assignedToName"
                  value={formData.assignedToName}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select User</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.fullName || u.name}>
                      {u.fullName || u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
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
                  disabled={loading}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  type="submit"
                  className="popup-btn popup-btn-primary"
                  disabled={loading}
                >
                  <FaSave /> {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
}
