import { useAuth } from "../../store/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.name} 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Find your next career opportunity with JobConnect.
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            My Profile
          </h2>
          

          <div className="space-y-3">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {user?.name}
            </p>

            <p>
              <span className="font-semibold">Email:</span>{" "}
              {user?.email}
            </p>

            <p>
              <span className="font-semibold">Role:</span>{" "}
              {user?.role}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;