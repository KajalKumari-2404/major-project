import { useEffect, useState } from "react";
import api from "../../api/axios";

const RecruiterDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/applications/recruiter");

      setApplications(response.data.applications || []);
    } catch (error) {
      console.error("Recruiter dashboard error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Dashboard Statistics
  const totalApplications = applications.length;

  const shortlistedApplications = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length;

  const interviewApplications = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const selectedApplications = applications.filter(
    (application) => application.status === "Selected"
  ).length;

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-700 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
        <div className="max-w-3xl mx-auto bg-red-950/30 border border-red-900 rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Something went wrong
          </h2>

          <p className="text-gray-400">
            {error}
          </p>

          <button
            onClick={fetchApplications}
            className="mt-5 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-blue-500 font-medium mb-2">
            Recruiter Panel
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Recruiter Dashboard
          </h1>

          <p className="text-gray-400 mt-3">
            Manage applications and track your hiring activity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          {/* Total Applications */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">
              Applications
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalApplications}
            </h2>

            <p className="text-blue-500 text-sm mt-2">
              Total received
            </p>
          </div>

          {/* Shortlisted */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">
              Shortlisted
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {shortlistedApplications}
            </h2>

            <p className="text-yellow-500 text-sm mt-2">
              Candidates shortlisted
            </p>
          </div>

          {/* Interviews */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">
              Interviews
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {interviewApplications}
            </h2>

            <p className="text-purple-400 text-sm mt-2">
              Interviews scheduled
            </p>
          </div>

          {/* Selected */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">
              Selected
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {selectedApplications}
            </h2>

            <p className="text-green-400 text-sm mt-2">
              Candidates selected
            </p>
          </div>

        </div>

        {/* Recent Applications */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

          <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-bold">
              Recent Applications
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Latest candidates who applied to your jobs.
            </p>
          </div>

          {applications.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-4xl mb-4">
                📭
              </div>

              <h3 className="text-lg font-semibold">
                No applications yet
              </h3>

              <p className="text-gray-400 mt-2">
                Applications will appear here when candidates
                apply for your jobs.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">

              {applications.slice(0, 5).map((application) => (
                <div
                  key={application._id}
                  className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {application.job?.title}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      Applicant:{" "}
                      {application.student?.name ||
                        application.user?.name ||
                        "Student"}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      Applied on:{" "}
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="inline-block bg-slate-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                    {application.status}
                  </span>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default RecruiterDashboard;