import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";

import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import StudentDashboard from "../pages/student/StudentDashboard";
import StudentProfile from "../pages/student/StudentProfile";
import Jobs from "../pages/student/Jobs";
import JobDetails from "../pages/student/JobDetails";
import MyApplications from "../pages/student/MyApplications";
import SavedJobs from "../pages/student/SavedJobs";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      {/* Navbar */}
      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Student Dashboard */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Student Profile */}
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        {/* Jobs */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Jobs />
            </ProtectedRoute>
          }
        />

        {/* Job Details */}
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        {/* My Applications */}
        <Route
          path="/student/applications"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* Saved Jobs */}
        <Route
          path="/student/saved-jobs"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <SavedJobs />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;