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
      console.error("My applications error:", error);

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
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl font-semibold">
            Loading applications...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              No Applications Yet
            </h2>

            <p className="text-gray-500">
              You have not applied for any jobs yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">

                  <div>
                    <h2 className="text-xl font-bold">
                      {application.job?.title}
                    </h2>

                    <p className="text-gray-600">
                      {application.job?.company}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      application.status === "Applied"
                        ? "bg-blue-100 text-blue-700"
                        : application.status === "Shortlisted"
                        ? "bg-yellow-100 text-yellow-700"
                        : application.status === "Interview"
                        ? "bg-purple-100 text-purple-700"
                        : application.status === "Selected"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {application.status}
                  </span>

                </div>

                <div className="space-y-2 text-gray-600">

                  <p>
                    📍 {application.job?.location}
                  </p>

                  <p>
                    💰 ₹{application.job?.salary}
                  </p>

                  <p>
                    💼 {application.job?.employmentType}
                  </p>

                  <p>
                    👤 Recruiter:{" "}
                    {application.recruiter?.name}
                  </p>

                  <p>
                    📧 {application.recruiter?.email}
                  </p>

                </div>

                <div className="mt-5 pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    Applied on:{" "}
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyApplications;