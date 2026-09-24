import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [closingJobId, setClosingJobId] = useState(null);
  

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/jobs");
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("My jobs error:", error);
      setError(
        error.response?.data?.message || "Failed to fetch jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleCloseJob = async (jobId) => {
    const confirmClose = window.confirm(
      "Are you sure you want to close this job?"
    );

    if (!confirmClose) return;

    try {
      setClosingJobId(jobId);
      setError("");

      await api.delete(`/jobs/${jobId}`);

      // Remove closed job from UI
      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId)
      );
    } catch (error) {
      console.error("Close job error:", error);

      setError(
        error.response?.data?.message || "Failed to close job."
      );
    } finally {
      setClosingJobId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-gray-400">Loading your jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-950/40 border border-red-900 text-red-400 p-4 rounded-xl">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-blue-500 font-semibold mb-2">
              Recruiter Panel
            </p>

            <h1 className="text-3xl md:text-4xl font-bold">
              My Jobs
            </h1>

            <p className="text-gray-400 mt-2">
              Manage the jobs you have posted.
            </p>
          </div>

          <Link
            to="/recruiter/jobs/create"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold transition text-center"
          >
            + Post New Job
          </Link>
        </div>

        {/* No Jobs */}
        {jobs.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
            <h2 className="text-xl font-semibold mb-2">
              No active jobs found
            </h2>

            <p className="text-gray-400 mb-6">
              You have not posted any active jobs yet.
            </p>

            <Link
              to="/recruiter/jobs/create"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold"
            >
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-900 transition"
              >

                {/* Job Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-xl font-bold">
                      {job.title}
                    </h2>

                    <p className="text-blue-400 mt-1">
                      {job.company}
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-green-950 text-green-400">
                    {job.status}
                  </span>
                </div>

                {/* Job Info */}
                <div className="space-y-2 text-gray-400 text-sm mb-5">
                  <p>📍 {job.location}</p>

                  <p>
                    💰 ₹
                    {Number(job.salary).toLocaleString("en-IN")}
                  </p>

                  <p>💼 {job.employmentType}</p>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-5">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-950/50 border border-blue-900 text-blue-400 px-3 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">

                  <Link
                    to={`/jobs/${job._id}`}
                    className="flex-1 text-center border border-slate-700 hover:bg-slate-800 px-4 py-2.5 rounded-lg font-medium transition"
                  >
                    View
                  </Link>

                  <Link
                    to={`/recruiter/jobs/edit/${job._id}`}
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg font-medium transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleCloseJob(job._id)}
                    disabled={closingJobId === job._id}
                    className="flex-1 border border-red-800 text-red-400 hover:bg-red-950 px-4 py-2.5 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {closingJobId === job._id
                      ? "Closing..."
                      : "Close"}
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;