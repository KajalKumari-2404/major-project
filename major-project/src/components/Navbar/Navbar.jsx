import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../store/AuthContext";

const Navbar = () => {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          JobConnect
        </Link>

        {/* Navigation */}
        <div className="flex gap-6 items-center">

          {/* Common Links */}
          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="hover:text-blue-400 transition"
          >
            Jobs
          </Link>

          {/* Student Links */}
          {user?.role === "student" && (
            <>
              <Link
                to="/student/dashboard"
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/student/applications"
                className="hover:text-blue-400 transition"
              >
                My Applications
              </Link>

              <Link
                to="/student/profile"
                className="hover:text-blue-400 transition"
              >
                Profile
              </Link>
            </>
          )}

          {/* Recruiter Links */}
          {user?.role === "recruiter" && (
            <>
              <Link
                to="/recruiter/applications"
                className="hover:text-blue-400 transition"
              >
                Applications
              </Link>
            </>
          )}

          {/* Admin Links */}
          {user?.role === "admin" && (
            <>
              <Link
                to="/admin/dashboard"
                className="hover:text-blue-400 transition"
              >
                Admin Dashboard
              </Link>
            </>
          )}

          {/* Auth */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:text-blue-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-blue-400 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;