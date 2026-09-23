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

import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import RecruiterApplications from "../pages/recruiter/RecruiterApplications";
import CreateJob from "../pages/recruiter/CreateJob";
import MyJobs from "../pages/recruiter/MyJobs";
import EditJob from "../pages/recruiter/EditJob";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Jobs */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Student */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        {/* Recruiter */}
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/applications"
          element={
            <ProtectedRoute>
              <RecruiterApplications />
            </ProtectedRoute>
          }
        />

        {/* Create Job */}
        <Route
          path="/recruiter/jobs/create"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route
  path="/recruiter/jobs"
  element={
    <ProtectedRoute>
      <MyJobs />
    </ProtectedRoute>
  }
/>
<Route
  path="/recruiter/jobs/edit/:id"
  element={
    <ProtectedRoute>
      <EditJob />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;