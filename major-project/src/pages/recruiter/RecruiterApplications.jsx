import { useEffect, useState } from "react";
import api from "../../api/axios";

const RecruiterApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  const [activeFilter, setActiveFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const filters = [
    "All",
    "Applied",
    "Shortlisted",
    "Interview",
    "Rejected",
  ];

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/applications/recruiter");

      setApplications(response.data.applications || []);
    } catch (error) {
      console.error("Fetch applications error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter applications
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter(
          (application) => application.status === activeFilter
        )
      );
    }
  }, [applications, activeFilter]);

  // Update application status
  const updateStatus = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);
      setError("");

      await api.put(
        `/applications/${applicationId}/status`,
        {
          status,
        }
      );

      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status,
              }
            : application
        )
      );
    } catch (error) {
      console.error("Update status error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update application status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Status badge
  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      case "Shortlisted":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      case "Interview":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";

      case "Selected":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "Rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-blue-400 font-medium mb-2">
            Recruiter Panel
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Applications
          </h1>

          <p className="text-gray-400 mt-2">
            Review applicants and manage their application status.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-lg border transition ${
                activeFilter === filter
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
            <p className="text-gray-400">
              Loading applications...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && filteredApplications.length === 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
            <h2 className="text-xl font-semibold mb-2">
              No applications found
            </h2>

            <p className="text-gray-400">
              There are no applications in this category.
            </p>
          </div>
        )}

        {/* Applications */}
        {!loading && filteredApplications.length > 0 && (
          <div className="space-y-5">
            {filteredApplications.map((application) => (
              <div
                key={application._id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                  {/* Applicant Information */}
                  <div className="flex-1">

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                      <h2 className="text-xl font-semibold">
                        {application.student?.name || "Unknown Applicant"}
                      </h2>

                      <span
                        className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium border ${getStatusClass(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">

                      <p className="text-gray-300">
                        <span className="text-gray-500">
                          Email:
                        </span>{" "}
                        {application.student?.email || "N/A"}
                      </p>

                      <p className="text-gray-300">
                        <span className="text-gray-500">
                          Job:
                        </span>{" "}
                        {application.job?.title || "N/A"}
                      </p>

                      <p className="text-gray-300">
                        <span className="text-gray-500">
                          Company:
                        </span>{" "}
                        {application.job?.company || "N/A"}
                      </p>

                      <p className="text-gray-300">
                        <span className="text-gray-500">
                          Location:
                        </span>{" "}
                        {application.job?.location || "N/A"}
                      </p>

                      <p className="text-gray-400">
                        Applied on:{" "}
                        {new Date(
                          application.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 lg:max-w-md lg:justify-end">

                    <button
                      onClick={() =>
                        updateStatus(
                          application._id,
                          "Shortlisted"
                        )
                      }
                      disabled={updatingId === application._id}
                      className="px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 transition"
                    >
                      Shortlist
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          application._id,
                          "Interview"
                        )
                      }
                      disabled={updatingId === application._id}
                      className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition"
                    >
                      Interview
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          application._id,
                          "Selected"
                        )
                      }
                      disabled={updatingId === application._id}
                      className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 transition"
                    >
                      Select
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          application._id,
                          "Rejected"
                        )
                      }
                      disabled={updatingId === application._id}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 transition"
                    >
                      Reject
                    </button>

                  </div>
                </div>

                {/* Updating message */}
                {updatingId === application._id && (
                  <p className="text-sm text-gray-500 mt-4">
                    Updating application status...
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterApplications;