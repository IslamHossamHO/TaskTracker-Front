import React, { useState, useEffect } from "react";
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

import {
  GetTasksAssignedByUserId,
  GetTasksNotAssignedByUserId,
  CreateTaskAPI,
  UpdateTaskAPI,
  DeleteTaskAPI,
} from "../Api";

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

  // Data
  const [myTasks, setMyTasks] = useState([]);
  const [othersTasks, setOthersTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(sessionStorage.getItem("User"));
  const navigate = useNavigate();

  // 🔥 Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!user?.id) return;
        const assigned = await GetTasksAssignedByUserId(user.id);
        const notAssigned = await GetTasksNotAssignedByUserId(user.id);

        setMyTasks(assigned || []);
        setOthersTasks(notAssigned || []);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user?.id]);

  // 🔥 Handlers
  const handleCreateTask = async (taskData) => {
    try {
      // Add the current user as the assignedByName if not specified
      if (!taskData.assignedByName && user) {
        taskData.assignedByName = user.name;
      }
      
      // Format the date properly for the API
      if (taskData.dueDate) {
        const date = new Date(taskData.dueDate);
        taskData.dueDate = date.toISOString();
      }
      
      await CreateTaskAPI(taskData);
      
      // Refresh tasks after creation
      const assigned = await GetTasksAssignedByUserId(user.id);
      setMyTasks(assigned || []);
      setShowCreate(false);
    } catch (err) {
      console.error("Failed to create task:", err);
      alert("Failed to create task. Please try again.");
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      // Format the date properly for the API
      if (updatedTask.dueDate) {
        const date = new Date(updatedTask.dueDate);
        updatedTask.dueDate = date.toISOString();
      }
      
      await UpdateTaskAPI(updatedTask.id, updatedTask);
      
      // Refresh tasks after update
      const assigned = await GetTasksAssignedByUserId(user.id);
      setMyTasks(assigned || []);
      setEditingTask(null);
    } catch (err) {
      console.error("Failed to update task:", err);
      alert("Failed to update task. Please try again.");
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      await DeleteTaskAPI(task.id);
      console.log(task.id);
      
      // Refresh tasks after deletion
      const assigned = await GetTasksAssignedByUserId(user.id);
      setMyTasks(assigned || []);
      setDeletingTask(null);
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Failed to delete task. Please try again.");
    }
  };

  // 🔍 Filters
  const applyFilters = (tasks) => {
    return tasks
      .filter((t) =>
        search ? t.title.toLowerCase().includes(search.toLowerCase()) : true
      )
      .filter((t) =>
        statusFilter !== "All Statuses" ? t.status === statusFilter : true
      )
      .filter((t) =>
        assignedToFilter !== "All Assignees"
          ? t.assignedTo === assignedToFilter
          : true
      )
      .filter((t) =>
        dueDateFilter !== "All Due Dates" ? t.dueDate === dueDateFilter : true
      );
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

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
        <Card imga={anion} slabel="Total Tasks" num={myTasks.length + othersTasks.length} bgcolor="#1565c020" />
        <Card
          imga={successicon}
          slabel="Completed"
          num={[...myTasks, ...othersTasks].filter((t) => t.status === "Completed").length}
          bgcolor="#15c01b20"
        />
        <Card
          imga={clockicon}
          slabel="In Progress"
          num={[...myTasks, ...othersTasks].filter((t) => t.status === "In Progress").length}
          bgcolor="#ffff0020"
        />
        <Card
          imga={dangericon}
          slabel="Not Started"
          num={[...myTasks, ...othersTasks].filter((t) => t.status === "Not Started").length}
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
          {/* you could dynamically map other users here */}
        </select>
        <select
          id="filterDueDate"
          className="DropDownSelect"
          value={dueDateFilter}
          onChange={(e) => setDueDateFilter(e.target.value)}
        >
          <option>All Due Dates</option>
          {/* if you want, dynamically map all unique dueDates */}
        </select>
      </motion.div>

      {/* My Tasks */}
      <motion.div variants={itemVariants}>
        <TaskTable
          tasks={applyFilters(myTasks)}
          actionType="edit-delete"
          readOnly={false}
          onEdit={(task) => setEditingTask(task)}
          onDelete={(task) => setDeletingTask(task)}
          onViewTask={(task) => setSelectedTask(task)}
        />
      </motion.div>

      {/* Assigned by Others */}
      <motion.div variants={itemVariants}>
        <h3 style={{ padding: "0 30px" }}>Assigned by Others</h3>
        <TaskTable
          tasks={applyFilters(othersTasks)}
          actionType="view-only"
          readOnly={true}
          onViewTask={(task) => setSelectedTask(task)}
        />
      </motion.div>

      {/* Popups */}
      {showCreate && <CreateTask onClose={() => setShowCreate(false)} onSave={handleCreateTask} />}
      {editingTask && (
        <EditTask task={editingTask} onClose={() => setEditingTask(null)} onSave={handleUpdateTask} />
      )}
      {deletingTask && (
        <DeleteTaskConfirm task={deletingTask} onClose={() => setDeletingTask(null)} onConfirm={handleDeleteTask} />
      )}
      {selectedTask && (
        <ViewTask readOnly={true} task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </motion.div>
  );
}
