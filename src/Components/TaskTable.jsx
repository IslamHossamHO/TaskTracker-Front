import React from "react";
import "../Styles/Components/TaskTable.css";

export default function TaskTable({
  tasks = [],
  onEdit,
  onDelete,
  onStartTask,
  onCompleteTask,
  onViewTask,
  readOnly = false,
  actionType = "edit-delete",
}) {
  const getStatusClass = (status) => {
    switch (status) {
      case "In Progress":
        return "status in-progress";
      case "Completed":
        return "status done";
      case "Not Started":
        return "status not-started";
      case "Active":
        return "status active";
      default:
        return "status";
    }
  };

  const renderActions = (task) => {
    if (readOnly) {
      if (actionType === "view-only") {
        return (
          <td className="actions">
            <button
              className="table-btn view-btn"
              onClick={(e) => {
                e.stopPropagation();
                onViewTask?.(task);
              }}
            >
              View
            </button>
          </td>
        );
      }

      return (
        <td className="actions">
          {task.status === "Not Started" && (
            <button
              className="table-btn start-btn"
              onClick={(e) => {
                e.stopPropagation();
                onStartTask?.(task);
              }}
            >
              Start
            </button>
          )}
          {task.status === "In Progress" && (
            <button
              className="table-btn complete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onCompleteTask?.(task);
              }}
            >
              Mark Complete
            </button>
          )}
          <button
            className="table-btn view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onViewTask?.(task);
            }}
          >
            View
          </button>
        </td>
      );
    }

    switch (actionType) {
      case "start-complete":
        return (
          <td className="actions">
            {task.status === "Not Started" && (
              <button
                className="table-btn start-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onStartTask?.(task);
                }}
              >
                Start
              </button>
            )}
            {task.status === "In Progress" && (
              <button
                className="table-btn complete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onCompleteTask?.(task);
                }}
              >
                Complete
              </button>
            )}
            <button
              className="table-btn view-btn"
              onClick={(e) => {
                e.stopPropagation();
                onViewTask?.(task);
              }}
            >
              View
            </button>
          </td>
        );
      case "view-only":
        return (
          <td className="actions">
            <button
              className="table-btn view-btn"
              onClick={(e) => {
                e.stopPropagation();
                onViewTask?.(task);
              }}
            >
              View
            </button>
          </td>
        );
      default:
        return (
          <td className="actions">
            <button
              className="table-btn edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(task);
              }}
            >
              Edit
            </button>
            <button
              className="table-btn delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(task);
              }}
            >
              Delete
            </button>
          </td>
        );
    }
  };

  // Determine which columns to show based on actionType
  const getTableHeaders = () => {
    if (actionType === "view-only") {
      return (
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Assigned To</th>
          <th>Assigned By</th>
          <th style={{ textAlign: "center" }}>Actions</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Assigned To</th>
          <th style={{ textAlign: "center" }}>Actions</th>
        </tr>
      );
    }
  };

  return (
    <div className="table-container">
      <table className="task-table">
        <thead>
          {getTableHeaders()}
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr
                key={task.id}
                className="task-row"
                onClick={() => onViewTask?.(task)}
              >
                <td className="task-title-cell">
                  <div className="task-title">{task.taskName}</div>
                  {task.taskDescription && (
                    <div className="task-description">{task.taskDescription}</div>
                  )}
                </td>
                <td>
                  <span className={getStatusClass(task.status)}>
                    {task.status}
                  </span>
                </td>
                <td className="due-date-cell">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleString()
                    : "—"}
                </td>
                <td>{task.assignedToName || "—"}</td>
                {actionType === "view-only" && <td>{task.assignedByName || "—"}</td>}
                {renderActions(task)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="no-tasks">
                <div className="no-tasks-content">
                  <div className="no-tasks-icon">📋</div>
                  <div className="no-tasks-text">No tasks found</div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
