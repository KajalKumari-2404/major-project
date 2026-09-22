import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import StudentDashboard from "../pages/student/StudentDashboard";
import Jobs from "../pages/student/Jobs";
import JobDetails from "../pages/student/JobDetails";
import MyApplications from "../pages/student/MyApplications";

// const Login = () => {
//   return <h1>Login Page</h1>;
// };

// const Register = () => {
//   return <h1>Register Page</h1>;
// };

// const Jobs = () => {
//   return <h1>Jobs Page</h1>;
// };

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/"element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/student/dashboard"element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/student/applications"element={<ProtectedRoute><MyApplications /></ProtectedRoute> }/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;