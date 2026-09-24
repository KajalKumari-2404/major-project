import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (user.role === "recruiter") {
      return <Navigate to="/recruiter/dashboard" replace />;
    }

    return <Navigate to="/student/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;