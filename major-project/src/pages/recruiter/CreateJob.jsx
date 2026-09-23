import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const CreateJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    employmentType: "Full-time",
    skills: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.salary ||
      !formData.skills ||
      !formData.description
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        salary: Number(formData.salary),
        employmentType: formData.employmentType,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill),
        description: formData.description,
      };

      const response = await api.post("/jobs", payload);

      setSuccess(response.data.message || "Job created successfully!");

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        employmentType: "Full-time",
        skills: "",
        description: "",
      });

      setTimeout(() => {
        navigate("/recruiter/dashboard");
      }, 1200);
    } catch (error) {
      console.error("Create job error:", error);

      setError(
        error.response?.data?.message || "Failed to create job."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-blue-500 font-semibold mb-2">
            Recruiter Panel
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Create New Job
          </h1>

          <p className="text-gray-400 mt-2">
            Post a new job opportunity and find the right candidate.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-950/50 border border-red-800 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-6 bg-green-950/50 border border-green-800 text-green-400 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title + Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. React Developer"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company *
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Google"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500"
                />
              </div>

            </div>

            {/* Location + Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location *
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Salary (Annual) *
                </label>

                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. 800000"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500"
                />
              </div>

            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Employment Type *
              </label>

              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skills *
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, MongoDB, JavaScript"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500"
              />

              <p className="text-xs text-gray-500 mt-2">
                Separate multiple skills using commas.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Description *
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="7"
                placeholder="Write a detailed description about the job..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition"
              >
                {loading ? "Creating Job..." : "Create Job"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/recruiter/dashboard")}
                className="border border-slate-700 hover:bg-slate-800 px-6 py-3 rounded-lg font-semibold transition"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;