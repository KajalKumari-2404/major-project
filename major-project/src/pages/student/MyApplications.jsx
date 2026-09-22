import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications/my-applications");

      setApplications(response.data.applications);
    } catch (error) {
      console.error("Applications error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch applications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">
          Loading applications...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500">
              You have not applied for any jobs yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-bold mb-2">
                  {application.job?.title}
                </h2>

                <p className="text-gray-600 mb-2">
                  🏢 {application.job?.company}
                </p>

                <p className="text-gray-600 mb-2">
                  📍 {application.job?.location}
                </p>

                <p className="text-gray-600 mb-2">
                  💼 {application.job?.employmentType}
                </p>

                <p className="text-gray-600 mb-4">
                  💰 ₹{application.job?.salary}
                </p>

                <div className="border-t pt-4">

                  <p className="font-semibold mb-2">
                    Application Status
                  </p>

                  <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    {application.status}
                  </span>

                </div>

                <p className="text-gray-500 text-sm mt-4">
                  Applied on:{" "}
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyApplications;