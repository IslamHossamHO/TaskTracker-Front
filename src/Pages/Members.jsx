import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../Styles/Pages/Members.css";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import { MdGroups, MdTaskAlt } from "react-icons/md";
import ViewMemberPopup from "../Popups/ViewMember";
import DeleteMemberC from "../Popups/DeleteMember";
import { GetAllUsers, DeleteUser, ChangeUserRole } from "../Api";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [popupType, setPopupType] = useState(null);

  // Map of encrypted IDs → human-readable names
  const roleMap = {
    "e64d8a3d9a": "Super Admin",
    "8c6976e5b5": "Admin",
    "a55c5c897d": "Senior Engineer",
    "f9a27d94f2": "Engineer",
    "b5284c8720": "Senior Teacher",
    "b5284c2794": "Teacher",
    "x2951g0725": "Reviewer",
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      const res = await GetAllUsers();
      setMembers(res || []);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  }

  // Update role of a member
  async function handleUpdate(updated) {
    try {
      await ChangeUserRole(updated.id, updated.roleHash); // send encrypted ID
      await fetchMembers(); // refresh table
      setPopupType(null);
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user. Please try again.");
    }
  }

  // Delete a member
  async function handleDelete(member) {
    try {
      await DeleteUser(member.id);
      await fetchMembers();
      setPopupType(null);
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    }
  }

  // Helper: get human-readable role
  const getRoleName = (member) => {
    if (!member.roleHash) return "N/A";
    return roleMap[member.roleHash] ?? "N/A";
  };

  return (
    <motion.div className="members-dashboard" initial="hidden" animate="visible">
      <motion.h2 className="page-title">Members Dashboard</motion.h2>

      {/* Stats */}
      <motion.div className="dashboard-cards">
        <div className="card">
          <MdGroups className="card-icon blue" />
          <div>
            <div className="card-title">Total Members</div>
            <div className="card-sub">{members.length}</div>
            <div className="card-desc">
              {new Set(members.map((m) => getRoleName(m))).size} unique roles
            </div>
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

      {/* Members Table */}
      <motion.div className="members-table">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
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
                  <span className="role-badge">{getRoleName(m)}</span>
                </td>
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

      {/* Popups */}
      {popupType === "view" && selectedMember && (
        <ViewMemberPopup
          member={selectedMember}
          onClose={() => setPopupType(null)}
          onSave={handleUpdate}
        />
      )}

      {popupType === "delete" && selectedMember && (
        <DeleteMemberC
          member={selectedMember}
          onClose={() => setPopupType(null)}
          onConfirm={handleDelete}
        />
      )}
    </motion.div>
  );
}
