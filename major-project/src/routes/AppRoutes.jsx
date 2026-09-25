import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Navbar from "../components/Navbar/Navbar";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

import Jobs from "../pages/student/Jobs";
import JobDetails from "../pages/student/JobDetails";
import StudentDashboard from "../pages/student/StudentDashboard";
import MyApplications from "../pages/student/MyApplications";
import StudentProfile from "../pages/student/StudentProfile";
import SavedJobs from "../pages/student/SavedJobs";

import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import RecruiterApplications from "../pages/recruiter/RecruiterApplications";
import CreateJob from "../pages/recruiter/CreateJob";
import MyJobs from "../pages/recruiter/MyJobs";
import EditJob from "../pages/recruiter/EditJob";

import AdminDashboard from "../pages/admin/AdminDashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* ==============================
            Home
        ============================== */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              allowedRoles={["student", "recruiter", "admin"]}
            >
              <Home />
            </ProtectedRoute>
          }
        />

        {/* ==============================
            Authentication
        ============================== */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ==============================
            Jobs
        ============================== */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute
              allowedRoles={["student", "recruiter", "admin"]}
            >
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute
              allowedRoles={["student", "recruiter", "admin"]}
            >
              <JobDetails />
            </ProtectedRoute>
          }
        />

        {/* ==============================
            Student Routes
        ============================== */}

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/applications"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/saved-jobs"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        {/* ==============================
            Recruiter Routes
        ============================== */}

        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/applications"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/jobs"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/jobs/create"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <CreateJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/jobs/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <EditJob />
            </ProtectedRoute>
          }
        />

        {/* ==============================
            Admin Routes
        ============================== */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;