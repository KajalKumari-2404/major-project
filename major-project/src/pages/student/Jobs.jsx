import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Jobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs");

      setJobs(response.data.jobs);
    } catch (error) {
      console.error("Jobs error:", error);

      setError(
        error.response?.data?.message || "Failed to fetch jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">
          Loading jobs...
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
          Available Jobs
        </h1>

        {jobs.length === 0 ? (
          <p className="text-gray-500">
            No jobs available right now.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-bold mb-2">
                  {job.title}
                </h2>

                <p className="text-gray-600 mb-2">
                  🏢 {job.company}
                </p>

                <p className="text-gray-600 mb-2">
                  📍 {job.location}
                </p>

                <p className="text-gray-600 mb-2">
                  💰 ₹{job.salary}
                </p>

                <p className="text-gray-600 mb-2">
                  💼 {job.employmentType}
                </p>

                <p className="text-gray-700 mt-3">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap mt-4">
                  {job.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Jobs;