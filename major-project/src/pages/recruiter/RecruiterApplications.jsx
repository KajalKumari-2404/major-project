import { useEffect, useState } from "react";
import api from "../../api/axios";

const RecruiterApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications/recruiter");

      setApplications(response.data.applications);
    } catch (error) {
      console.error("Recruiter applications error:", error);

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

  const getStatusStyle = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-50 text-blue-700 border border-blue-200";

      case "Shortlisted":
        return "bg-green-50 text-green-700 border border-green-200";

      case "Rejected":
        return "bg-red-50 text-red-700 border border-red-200";

      case "Hired":
        return "bg-purple-50 text-purple-700 border border-purple-200";

      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-lg">
            Loading applications...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-red-200 rounded-2xl p-6 text-center">
            <h2 className="text-lg font-semibold text-red-600">
              Something went wrong
            </h2>

            <p className="text-gray-500 mt-2">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Recruiter Applications
          </h1>

          <p className="text-gray-500 mt-2">
            Manage applications received for your jobs.
          </p>
        </div>

        {/* Application Count */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <span className="text-gray-500 text-sm">
              Total Applications
            </span>

            <span className="font-bold text-gray-900">
              {applications.length}
            </span>
          </div>
        </div>

        {/* Empty State */}
        {applications.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">

            <div className="text-5xl mb-4">
              📄
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't received any applications for your jobs yet.
            </p>

          </div>
        ) : (
          /* Applications */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >

                {/* Applicant Header */}
                <div className="p-6">

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-4">

                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                        {application.student?.name
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-gray-900">
                          {application.student?.name ||
                            "Unknown Student"}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          {application.student?.email ||
                            "No email available"}
                        </p>
                      </div>

                    </div>

                    {/* Status */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>

                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-6"></div>

                  {/* Job */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">
                      Applied For
                    </p>

                    <h3 className="text-xl font-bold text-gray-800">
                      {application.job?.title || "Job Title"}
                    </h3>
                  </div>

                  {/* Job Details */}
                  <div className="grid grid-cols-2 gap-4 mt-5">

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Company
                      </p>

                      <p className="text-sm font-medium text-gray-700">
                        🏢 {application.job?.company || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Location
                      </p>

                      <p className="text-sm font-medium text-gray-700">
                        📍 {application.job?.location || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Employment
                      </p>

                      <p className="text-sm font-medium text-gray-700">
                        💼{" "}
                        {application.job?.employmentType || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Salary
                      </p>

                      <p className="text-sm font-medium text-gray-700">
                        💰 ₹
                        {application.job?.salary || "Not specified"}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Footer */}
                <div className="bg-gray-50 border-t border-gray-100 px-6 py-4">

                  <div className="flex items-center justify-between">

                    <p className="text-sm text-gray-500">
                      Applied on
                    </p>

                    <p className="text-sm font-semibold text-gray-700">
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default RecruiterApplications;