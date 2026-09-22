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
    console.error("Logout error:", error.response?.data || error.message);
  }
};
  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          JobConnect
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>

          <Link to="/jobs" className="hover:text-blue-400">
            Jobs
          </Link>

          {!user ? (
  <>
    <Link to="/login" className="hover:text-blue-400">
      Login
    </Link>

    <Link to="/register" className="hover:text-blue-400">
      Register
    </Link>
  </>
) : (
  <button
    onClick={handleLogout}
    className="hover:text-red-400"
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