
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Jobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [savingJobId, setSavingJobId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [employmentFilter, setEmploymentFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/jobs");

      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Jobs error:", error);

      setError(
        error.response?.data?.message || "Failed to fetch jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch saved jobs
  const fetchSavedJobs = async () => {
    try {
      const response = await api.get("/saved-jobs");

      const savedIds = (response.data.savedJobs || []).map(
        (savedJob) => savedJob.job?._id || savedJob.job
      );

      setSavedJobIds(savedIds);
    } catch (error) {
      console.error("Saved jobs error:", error);
    }
  };

  // Save / Unsave job
  const handleSaveJob = async (jobId) => {
    try {
      setSavingJobId(jobId);

      const isSaved = savedJobIds.includes(jobId);

      if (isSaved) {
        await api.delete(`/saved-jobs/${jobId}`);

        setSavedJobIds((prev) =>
          prev.filter((id) => id !== jobId)
        );
      } else {
        await api.post(`/saved-jobs/${jobId}`);

        setSavedJobIds((prev) => [...prev, jobId]);
      }
    } catch (error) {
      console.error("Save job error:", error);

      alert(
        error.response?.data?.message || "Failed to save job"
      );
    } finally {
      setSavingJobId(null);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      job.title?.toLowerCase().includes(search) ||
      job.description?.toLowerCase().includes(search) ||
      job.skills?.some((skill) =>
        skill.toLowerCase().includes(search)
      );

    const matchesLocation =
      !locationFilter ||
      job.location?.toLowerCase() === locationFilter.toLowerCase();

    const matchesEmployment =
      !employmentFilter ||
      job.employmentType?.toLowerCase() ===
        employmentFilter.toLowerCase();

    let matchesSalary = true;

    if (salaryFilter === "below5") {
      matchesSalary = job.salary < 500000;
    }

    if (salaryFilter === "5to10") {
      matchesSalary =
        job.salary >= 500000 && job.salary <= 1000000;
    }

    if (salaryFilter === "above10") {
      matchesSalary = job.salary > 1000000;
    }

    return (
      matchesSearch &&
      matchesLocation &&
      matchesEmployment &&
      matchesSalary
    );
  });

  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setEmploymentFilter("");
    setSalaryFilter("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Find Your Next Job
        </h1>

        <p className="text-gray-600 mt-2">
          Explore the latest opportunities and find a role that
          matches your skills.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Search and Filters */}
        <div className="bg-white p-5 rounded-xl shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Search
              </label>

              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Location
              </label>

              <select
                value={locationFilter}
                onChange={(e) =>
                  setLocationFilter(e.target.value)
                }
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">All Locations</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Bhopal">Bhopal</option>
              </select>
            </div>

            {/* Employment */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Employment Type
              </label>

              <select
                value={employmentFilter}
                onChange={(e) =>
                  setEmploymentFilter(e.target.value)
                }
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">All Employment Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Salary
              </label>

              <select
                value={salaryFilter}
                onChange={(e) =>
                  setSalaryFilter(e.target.value)
                }
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">All Salaries</option>
                <option value="below5">Below ₹5 Lakh</option>
                <option value="5to10">₹5 - ₹10 Lakh</option>
                <option value="above10">Above ₹10 Lakh</option>
              </select>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </div>

        {/* Available Jobs */}
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">
            Available Jobs
          </h2>

          <p className="text-gray-500">
            {filteredJobs.length} jobs found
          </p>
        </div>

        {/* Jobs */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500">
              No jobs found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => {
              const isSaved = savedJobIds.includes(job._id);
              const isSaving = savingJobId === job._id;

              return (
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow p-6"
                >
                  {/* Job Type */}
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-3">
                    {job.employmentType}
                  </span>

                  {/* Job Title */}
                  <h3 className="text-2xl font-bold text-gray-800">
                    {job.title}
                  </h3>

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
                      onClick={() => handleSaveJob(job._id)}
                      disabled={isSaving}
                      className={`px-4 py-2 rounded-lg border ${
                        isSaved
                          ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      {isSaving
                        ? "Saving..."
                        : isSaved
                        ? "★ Saved"
                        : "☆ Save"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;