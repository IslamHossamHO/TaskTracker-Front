import TaskDashboard from "../Pages/TaskDashboard";
import Profile from "../Pages/Profile";
import Members from "../Pages/Members";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ role, location }) {
  const allowedRoles1 = [
    "e64d8a3d9a",
    "a55c5c897d",
    "8c6976e5b5",
    "b5284c8720",
  ];

  const allowedRoles2 = ["e64d8a3d9a"];

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
