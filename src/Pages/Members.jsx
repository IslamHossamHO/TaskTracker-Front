import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../Styles/Pages/Members.css";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import { MdGroups, MdTaskAlt } from "react-icons/md";
import { GetAllAccounts, UpdateUser, DeleteAccount } from "../Api";
import ViewMemberPopup from "../Popups/ViewMember";
import DeleteConfirmationPopup from "../Popups/DeleteConfirmation";

export default function Members() {
  const [demoMembers, setDemoMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [popupType, setPopupType] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      const res = await GetAllAccounts();
      setDemoMembers(res.data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  }

  async function handleUpdate(updated) {
    try {
      await UpdateUser(updated.id, updated);
      setDemoMembers((prev) =>
        prev.map((m) => (m.id === updated.id ? { ...m, ...updated } : m))
      );
      setPopupType(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  }

  // ✅ handle delete
  async function handleDelete(member) {
    try {
      await DeleteAccount(member.id);
      setDemoMembers((prev) => prev.filter((m) => m.id !== member.id));
      setPopupType(null);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  }

  return (
    <motion.div className="members-dashboard" initial="hidden" animate="visible">
      <motion.h2 className="page-title">Members Dashboard</motion.h2>

      {/* Stats */}
      <motion.div className="dashboard-cards">
        <div className="card">
          <MdGroups className="card-icon blue" />
          <div>
            <div className="card-title">Total Members</div>
            <div className="card-sub">{demoMembers.length}</div>
            <div className="card-desc">2 unique roles</div>
          </div>
        </div>
        <div className="card">
          <MdTaskAlt className="card-icon green" />
          <div>
            <div className="card-title">Task Distribution</div>
            <div className="card-sub">20</div>
            <div className="card-desc">10 tasks per member avg</div>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div className="members-table">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Tasks</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoMembers.map((m) => (
              <tr key={m.id}>
                <td>
                  <div className="member-cell">
                    <FaUserCircle className="member-avatar" />
                    <div className="member-info">
                      <div className="member-name">{m.name}</div>
                      <div className="member-email">{m.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="role-badge">{m.role}</span>
                </td>
                <td>{m.tasks}</td>
                <td>{new Date(m.joinDate).toLocaleDateString()}</td>
                <td className="actions-cell">
                  <button
                    className="action-btn view-btn"
                    onClick={() => {
                      setSelectedMember(m);
                      setPopupType("view");
                    }}
                  >
                    View
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => {
                      setSelectedMember(m);
                      setPopupType("delete");
                    }}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* ✅ Popups */}
      {popupType === "view" && selectedMember && (
        <ViewMemberPopup
          member={selectedMember}
          onClose={() => setPopupType(null)}
          onSave={handleUpdate} // now hooked up
        />
      )}

      {popupType === "delete" && selectedMember && (
        <DeleteConfirmationPopup
          member={selectedMember}
          onClose={() => setPopupType(null)}
          onDelete={handleDelete} // now hooked up
        />
      )}
    </motion.div>
  );
}
