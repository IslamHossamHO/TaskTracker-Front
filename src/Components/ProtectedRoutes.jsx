import TaskDashboard from "../Pages/TaskDashboard";
import Profile from "../Pages/Profile";
import Members from "../Pages/Members";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ role, location }) {
  const allowedRoles1 = [
    "SuperAdmin",
    "Senior Engineer",
    "Senior Teacher",
    "StaffAdmin",
    "Reviewer",
    "Senior_Engineer",
    "Senior_Teacher",
  ];

  const allowedRoles2 = ["SuperAdmin"];

  if (location === "/dashboard") {
    return allowedRoles1.includes(role) ? (
      <TaskDashboard />
    ) : (
      <Navigate to="/profile" replace />
    );
  } else if (location === "/members") {
    return allowedRoles2.includes(role) ? (
      <Members />
    ) : (
      <Navigate to="/profile" replace />
    );
  } else {
    return <Navigate to="/profile" replace />;
  }
}
