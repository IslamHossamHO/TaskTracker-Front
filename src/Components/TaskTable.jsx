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
      default:
        return "";
    }
  };

  const renderActions = (task) => {
    if (readOnly) {
      // ✅ when readOnly + view-only → just "View"
      if (actionType === "view-only") {
        return (
          <td className="actions">
            <button
              className="table-btn view-btn"
              onClick={(e) => {
                e.stopPropagation();
                onViewTask && onViewTask(task);
              }}
            >
              View Details
            </button>
          </td>
        );
      }

      // ✅ readOnly but not "view-only" → keep Start/Complete + View
      return (
        <td className="actions">
          {task.status === "Not Started" && (
            <button
              className="table-btn start-btn"
              onClick={(e) => {
                e.stopPropagation();
                onStartTask && onStartTask(task);
              }}
            >
              Start Task
            </button>
          )}
          {task.status === "In Progress" && (
            <button
              className="table-btn complete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onCompleteTask && onCompleteTask(task);
              }}
            >
              Mark Complete
            </button>
          )}
          <button
            className="table-btn view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onViewTask && onViewTask(task);
            }}
          >
            View Details
          </button>
        </td>
      );
    }

    // ✅ Normal editable actions
    switch (actionType) {
      case "start-complete":
        return (
          <td className="actions">
            {task.status === "Not Started" && (
              <button
                className="table-btn start-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onStartTask && onStartTask(task);
                }}
              >
                Start Task
              </button>
            )}
            {task.status === "In Progress" && (
              <button
                className="table-btn complete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onCompleteTask && onCompleteTask(task);
                }}
              >
                Complete Task
              </button>
            )}
            <button
              className="table-btn view-btn"
              onClick={(e) => {
                e.stopPropagation();
                onViewTask && onViewTask(task);
              }}
            >
              View Details
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
                onViewTask && onViewTask(task);
              }}
            >
              View Details
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
                onEdit && onEdit(task);
              }}
            >
              Edit
            </button>
            <button
              className="table-btn delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(task);
              }}
            >
              Delete
            </button>
          </td>
        );
    }
  };

  return (
    <div className="table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Assigned By</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, idx) => (
              <tr
                key={idx}
                className="task-row"
                onClick={() => onViewTask && onViewTask(task)}
              >
                <td className="task-title-cell">
                  <div className="task-title">{task.title}</div>
                  {task.description && (
                    <div className="task-description">{task.description}</div>
                  )}
                </td>
                <td>
                  <span className={getStatusClass(task.status)}>
                    {task.status}
                  </span>
                </td>
                <td className="due-date-cell">
                  <div className="due-date">{task.dueDate}</div>
                  {task.weeks && <div className="weeks">{task.weeks}</div>}
                </td>
                <td>{task.assignedBy || "—"}</td>
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
