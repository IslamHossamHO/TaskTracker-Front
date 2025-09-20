import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import anion from "../Assets/analysis.png";
import clockicon from "../Assets/clock.png";
import successicon from "../Assets/completed.png";
import dangericon from "../Assets/danger.png";
import TaskTable from "../Components/TaskTable";
import CreateTask from "../Popups/CreateTask";
import EditTask from "../Popups/EditTask";
import DeleteTaskConfirm from "../Popups/DeleteConfirmation";
import ViewTask from "../Popups/ViewTask";
import "../Styles/Pages/TaskDashboard.css";

export default function TaskDashboard() {
  // Popup states
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [assignedToFilter, setAssignedToFilter] = useState("All Assignees");
  const [dueDateFilter, setDueDateFilter] = useState("All Due Dates");

  const navigate = useNavigate();

  // Example static data (replace later with API data)
  const tasks = [
    {
      id: 1,
      title: "Design Homepage",
      description: "Create homepage wireframe",
      status: "In Progress",
      assignedBy: "Admin",
      assignedTo: "You",
      dueDate: "2025-09-10",
    },
    {
      id: 2,
      title: "Fix Bugs",
      description: "Resolve critical bugs",
      status: "Not Started",
      assignedBy: "Mr. Wael",
      assignedTo: "You",
      dueDate: "2025-09-12",
    },
  ];

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      id="taskDashboardPage"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Title & Create Button */}
      <motion.div className="TitleSection" variants={itemVariants}>
        <h2 className="DashboardTitle">Task Dashboard</h2>
        <button
          id="btnOpenCreateTask"
          className="CreateNewTaskButton"
          onClick={() => setShowCreate(true)}
        >
          New Task
        </button>
      </motion.div>

      {/* Cards */}
      <motion.div className="CardSection" variants={itemVariants}>
        <Card imga={anion} slabel="Total Tasks" num={tasks.length} bgcolor="#1565c020" />
        <Card
          imga={successicon}
          slabel="Completed"
          num={tasks.filter((t) => t.status === "Completed").length}
          note="Progress"
          bgcolor="#15c01b20"
        />
        <Card
          imga={clockicon}
          slabel="In Progress"
          num={tasks.filter((t) => t.status === "In Progress").length}
          bgcolor="#ffff0020"
        />
        <Card
          imga={dangericon}
          slabel="Not Started"
          num={tasks.filter((t) => t.status === "Not Started").length}
          bgcolor="#ff000020"
        />
      </motion.div>

      {/* Filters */}
      <motion.div className="FilterSection" variants={itemVariants}>
        <input
          id="taskSearchInput"
          className="SearchBar"
          placeholder="Search Tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          id="filterStatus"
          className="DropDownSelect"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Statuses</option>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select
          id="filterAssignedTo"
          className="DropDownSelect"
          value={assignedToFilter}
          onChange={(e) => setAssignedToFilter(e.target.value)}
        >
          <option>All Assignees</option>
          <option>You</option>
          <option>User1</option>
          <option>User2</option>
        </select>
        <select
          id="filterDueDate"
          className="DropDownSelect"
          value={dueDateFilter}
          onChange={(e) => setDueDateFilter(e.target.value)}
        >
          <option>All Due Dates</option>
          <option>2025-09-10</option>
          <option>2025-09-12</option>
        </select>
      </motion.div>

      {/* My Tasks (editable) */}
      <motion.div variants={itemVariants}>
        <TaskTable
          tasks={tasks.filter((t) => t.assignedTo === "You")}
          actionType="edit-delete"
          readOnly={false}
          onEdit={(task) => setEditingTask(task)}
          onDelete={(task) => setDeletingTask(task)}
          onViewTask={(task) => setSelectedTask(task)}
        />
      </motion.div>

      {/* Assigned by Others (view only ✅) */}
      <motion.div variants={itemVariants}>
        <h3 style={{ padding: "0 30px" }}>Assigned by Others</h3>
        <TaskTable
          tasks={tasks.filter((t) => t.assignedBy !== "Admin")}
          actionType="view-only"
          readOnly={true}
          onViewTask={(task) => setSelectedTask(task)}
        />
      </motion.div>

      {/* Popups */}
      {showCreate && <CreateTask onClose={() => setShowCreate(false)} />}
      {editingTask && (
        <EditTask task={editingTask} onClose={() => setEditingTask(null)} />
      )}
      {deletingTask && (
        <DeleteTaskConfirm
          task={deletingTask}
          onClose={() => setDeletingTask(null)}
        />
      )}
      {selectedTask && (
        <ViewTask
          readOnly={true}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </motion.div>
  );
}
