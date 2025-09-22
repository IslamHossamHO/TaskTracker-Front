import React, { useEffect, useState } from "react";
import { FaRegEdit, FaClock, FaSave, FaTimes } from "react-icons/fa";
import PopupWrapper from "../Components/PopupWrapper";
import "../Styles/Popups/CreateTask.css";
import { GetAllUsers, CreateTaskAPI } from "../Api";

export default function CreateTaskPopup({ onClose, onCreate }) {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedToId: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);

  // 👉 Fetch all users on mount
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

  // 👉 Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 👉 Handle submit (match TaskCreateDto)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(sessionStorage.getItem("User"));

      const assignedToUser = users.find(
        (u) => u.id == formData.assignedToId
      );

      const payload = {
        taskName: formData.title,
        taskDescription: formData.description,
        assignedToName: assignedToUser?.fullName || assignedToUser?.name,
        assignedByName: user?.fullName || user?.name || "Unknown",
        status: "Not Started",
        dueDate: formData.dueDate,
      };

      const createdTask = await CreateTaskAPI(payload);
      if (createdTask) {
        onCreate && onCreate(createdTask);
        onClose();
      }
    } catch (err) {
      console.error("Failed to create task:", err);
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
              <FaRegEdit style={{ marginRight: "12px" }} /> Create New Task
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
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">Assigned To</label>
                <select
                  name="assignedToId"
                  className="form-select"
                  value={formData.assignedToId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select User</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
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
                  className="form-input"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
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
                  <FaSave /> {loading ? "Creating..." : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
}
