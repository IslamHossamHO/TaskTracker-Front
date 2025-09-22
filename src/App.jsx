import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./Components/PageWrapper";
import MainLayout from "./Components/MainLayout";

import Login from "./Pages/Login";
import TaskDashboard from "./Pages/TaskDashboard";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import Members from "./Pages/Members";
import ProtectedRoutes from "./Components/ProtectedRoutes";

function AnimatedRoutes() {
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("User"));

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/dashboard" element={user ? <MainLayout><PageWrapper><ProtectedRoutes role = {user.roleHash} location = {"/dashboard"}/></PageWrapper></MainLayout> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={user ? <MainLayout><PageWrapper><Profile /></PageWrapper></MainLayout> : <Navigate to="/login" replace />} />
        <Route path="/notifications" element={user ? <MainLayout><PageWrapper><Notifications /></PageWrapper></MainLayout> : <Navigate to="/login" replace />} />
        <Route path="/members" element={user ? <MainLayout><PageWrapper><ProtectedRoutes role = {user.roleHash} location = {"/members"}/></PageWrapper></MainLayout> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={user ? "/profile" : "/login"} replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
