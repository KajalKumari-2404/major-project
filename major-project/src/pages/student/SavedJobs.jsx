import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const SavedJobs = () => {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch saved jobs
  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/saved-jobs");

      setSavedJobs(response.data.savedJobs || []);
    } catch (error) {
      console.error("Saved jobs error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch saved jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  // Unsave job
  const handleUnsave = async (jobId) => {
    try {
      await api.delete(`/saved-jobs/${jobId}`);

      setSavedJobs((prev) =>
        prev.filter((saved) => {
          const id = saved.job?._id || saved.job;
          return id !== jobId;
        })
      );
    } catch (error) {
      console.error("Unsave job error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to remove saved job"
      );
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading saved jobs...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Saved Jobs
          </h1>

          <p className="text-gray-600 mt-2">
            Jobs you have saved for later.
          </p>
        </div>

        {/* No Saved Jobs */}
        {savedJobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <div className="text-5xl mb-4">☆</div>

            <h2 className="text-2xl font-semibold text-gray-800">
              No Saved Jobs
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't saved any jobs yet.
            </p>

            <button
              onClick={() => navigate("/jobs")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <>
            {/* Count */}
            <div className="mb-5">
              <p className="text-gray-600">
                {savedJobs.length} saved job
                {savedJobs.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Saved Jobs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedJobs.map((saved) => {
                const job = saved.job;

                if (!job) return null;

                return (
                  <div
                    key={saved._id}
                    className="bg-white rounded-xl shadow p-6"
                  >
                    {/* Employment Type */}
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-3">
                      {job.employmentType}
                    </span>

                    {/* Job Title */}
                    <h2 className="text-2xl font-bold text-gray-800">
                      {job.title}
                    </h2>

                    {/* Company */}
                    <p className="text-gray-600 mt-2">
                      🏢 {job.companyName || "Company"}
                    </p>

                    {/* Location */}
                    <p className="text-gray-600 mt-1">
                      📍 {job.location}
                    </p>

                    {/* Salary */}
                    <p className="text-gray-600 mt-1">
                      💰 ₹{job.salary}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 mt-4 line-clamp-3">
                      {job.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() =>
                          navigate(`/jobs/${job._id}`)
                        }
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        View Job Details
                      </button>

                      <button
                        onClick={() =>
                          handleUnsave(job._id)
                        }
                        className="px-4 py-2 rounded-lg border border-red-300 bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;