import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Jobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [employmentFilter, setEmploymentFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchJobs();
  }, []);

  // Search + Filters
  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !search ||
      job.title?.toLowerCase().includes(search) ||
      job.company?.toLowerCase().includes(search) ||
      job.location?.toLowerCase().includes(search) ||
      job.skills?.some((skill) =>
        skill.toLowerCase().includes(search)
      );

    const matchesLocation =
      !locationFilter ||
      job.location?.toLowerCase() ===
        locationFilter.toLowerCase();

    const matchesEmployment =
      !employmentFilter ||
      job.employmentType === employmentFilter;

    const matchesSalary =
      !salaryFilter ||
      (salaryFilter === "below5" && Number(job.salary) < 500000) ||
      (salaryFilter === "5to10" &&
        Number(job.salary) >= 500000 &&
        Number(job.salary) <= 1000000) ||
      (salaryFilter === "above10" &&
        Number(job.salary) > 1000000);

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
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-700 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-400">
            Loading jobs...
          </p>
        </div>
      </div>
    );
  }

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
            onClick={fetchJobs}
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
        <div className="mb-8">
          <p className="text-blue-500 font-medium mb-2">
            JobConnect Opportunities
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Find Your Next Job
              </h1>

              <p className="text-gray-400 mt-3">
                Explore the latest opportunities and find a role
                that matches your skills.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
              <span className="text-gray-400 text-sm">
                Available Jobs
              </span>

              <p className="text-xl font-bold text-white">
                {filteredJobs.length}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-5">
          <div className="relative max-w-3xl">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search jobs by title, company, location or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-blue-600 transition"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Location */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="">All Locations</option>

              {[...new Set(jobs.map((job) => job.location))]
                .filter(Boolean)
                .map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
            </select>

            {/* Employment Type */}
            <select
              value={employmentFilter}
              onChange={(e) =>
                setEmploymentFilter(e.target.value)
              }
              className="bg-slate-950 border border-slate-800 text-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="">All Employment Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>

            {/* Salary */}
            <select
              value={salaryFilter}
              onChange={(e) => setSalaryFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="">All Salaries</option>
              <option value="below5">Below ₹5 Lakh</option>
              <option value="5to10">₹5 - ₹10 Lakh</option>
              <option value="above10">Above ₹10 Lakh</option>
            </select>

            {/* Clear */}
            <button
              onClick={clearFilters}
              className="bg-slate-800 hover:bg-slate-700 text-white rounded-lg px-4 py-3 font-medium transition"
            >
              Clear Filters
            </button>

          </div>
        </div>

        {/* Jobs */}
        {filteredJobs.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-10 text-center">
            <div className="text-4xl mb-4">
              🔍
            </div>

            <h2 className="text-xl font-semibold mb-2">
              No matching jobs found
            </h2>

            <p className="text-gray-400 mb-5">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-900 hover:-translate-y-1 transition duration-300"
              >

                {/* Job Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-900 flex items-center justify-center text-xl">
                    💼
                  </div>

                  <span className="text-xs font-medium bg-slate-800 text-gray-300 px-3 py-1 rounded-full">
                    {job.employmentType}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white group-hover:text-blue-500 transition">
                  {job.title}
                </h2>

                {/* Company */}
                <p className="text-gray-400 mt-2">
                  🏢 {job.company}
                </p>

                {/* Info */}
                <div className="mt-5 space-y-3 text-sm">
                  <p className="text-gray-400">
                    📍 {job.location}
                  </p>

                  <p className="text-gray-400">
                    💰 ₹{job.salary}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mt-5 line-clamp-3">
                  {job.description}
                </p>

                {/* Skills */}
                {job.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-950/50 border border-blue-900 text-blue-400 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Details */}
                <button
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  View Job Details
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