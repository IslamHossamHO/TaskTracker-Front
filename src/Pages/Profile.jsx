import { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaCalendarAlt, FaUserEdit } from "react-icons/fa";
import "../Styles/Pages/Profile.css";
import { GetTasksAssignedToUserId, UpdateTaskStatus, UpdateUser , GetUserById } from "../Api";
import TaskTable from "../Components/TaskTable";
import ViewTask from "../Popups/ViewTask";
import EditProfile from "../Popups/EditProfile";

export default function Profile() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState();
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("User");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      (async () => {
        const data = await GetAllTasksByUserID(parsedUser.id);

        const mapped = (data || []).map((t) => ({
          id: t.id,
          title: t.taskName,
          description: t.taskDescription,
          status: t.statusName,
          dueDate: t.taskDeadline,
          displayDueDate: new Date(t.taskDeadline).toLocaleDateString(),
          assignedBy: t.assignedByName,
          assignedTo: t.assignedToName,
          createdAt: t.createdAt,
        }));

        setTasks(mapped);
      })();
    }
  }, []);

  const handleStartTask = async (task) => {
    const updatedTask = { ...task, status: "In Progress" };
    try {
      await patchtask(task.id);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleCompleteTask = async (task) => {
    const updatedTask = { ...task, status: "Completed" };
    try {
      await patchtask(task.id);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      await UpdateUser(updatedUser.id, updatedUser);
      sessionStorage.setItem("User" , JSON.stringify(updatedUser))
      setEditUser(false);
      window.location.reload();
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };


  return (
    <div className="profile-wrapper">
      <h1 className="page-title">My Profile</h1>

      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-circle">
            {user?.fullNameEn?.charAt(0) || user?.name?.charAt(0)}
          </div>
          <div className="profile-text">
            <h2 className="profile-name">{user?.fullNameEn || user?.name}</h2>
            <span className="role-badge">{user?.role || "Engineer"}</span>
          </div>
          <button
            className="edit-profile-btn"
            onClick={() => setEditUser(true)}
          >
            <FaUserEdit className="btn-icon" /> Edit Profile
          </button>
        </div>

        <div className="profile-details-grid">
          <div className="profile-detail">
            <FaEnvelope className="icon" />
            <span>{user?.email}</span>
          </div>
          <div className="profile-detail">
            <FaPhone className="icon" />
            <span>{user?.phone}</span>
          </div>
          <div className="profile-detail">
            <FaCalendarAlt className="icon" />
            <span>
              {user?.createdAt || user?.joinDate}
            </span>
          </div>
        </div>
      </div>

      <div className="profile-tasks">
        <h2 className="section-title">My Tasks</h2>
        <TaskTable
          tasks={tasks}
          readOnly={true}
          onStartTask={handleStartTask}
          onCompleteTask={handleCompleteTask}
          onViewTask={(task) => setSelectedTask(task)}
        />
      </div>

      {selectedTask && (
        <ViewTask
          readOnly={true}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onStartTask={handleStartTask}
          onCompleteTask={handleCompleteTask}
        />
      )}

      {editUser && user && (
        <EditProfile
          user={user}
          onClose={() => setEditUser(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}
