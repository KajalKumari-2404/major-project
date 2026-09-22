import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJob = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);

      setJob(response.data.job);
    } catch (error) {
      console.error("Job details error:", error);

      setError(
        error.response?.data?.message || "Failed to fetch job details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      const response = await api.post(`/applications/${job._id}`);

      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to apply for this job"
      );
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">
          Loading job details...
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

  if (!job) {
    return (
      <div className="p-6 text-center">
        <h2>Job not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-xl shadow-md p-8">

          <h1 className="text-3xl font-bold mb-4">
            {job.title}
          </h1>

          <p className="text-lg text-gray-600 mb-3">
            🏢 {job.company}
          </p>

          <p className="text-gray-600 mb-3">
            📍 {job.location}
          </p>

          <p className="text-gray-600 mb-3">
            💰 ₹{job.salary}
          </p>

          <p className="text-gray-600 mb-6">
            💼 {job.employmentType}
          </p>

          <hr className="mb-6" />

          <h2 className="text-xl font-semibold mb-3">
            Job Description
          </h2>

          <p className="text-gray-700 mb-6">
            {job.description}
          </p>

          <h2 className="text-xl font-semibold mb-3">
            Required Skills
          </h2>

          <div className="flex flex-wrap mb-8">
            {job.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {skill}
              </span>
            ))}
          </div>

          <button
            onClick={handleApply}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Apply Now
          </button>

        </div>

      </div>
    </div>
  );
};

export default JobDetails;