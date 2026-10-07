import { useEffect, useState } from "react";
import api from "../../api/axios";

const Resume = () => {
  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    about: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
    achievements: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // ==============================
  // Get Resume Data
  // ==============================
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get("/auth/profile");

        const user = response.data.user;

        setResume({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          about: user.about || "",
          skills: user.skills || "",
          education: user.education || "",
          experience: user.experience || "",
          projects: user.projects || "",
          achievements: user.achievements || "",
          github: user.github || "",
          linkedin: user.linkedin || "",
          portfolio: user.portfolio || "",
        });
      } catch (error) {
        console.error(
          "Resume fetch error:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
            "Unable to load resume"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  // ==============================
  // Handle Input
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setResume((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // Save Resume
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await api.put(
        "/auth/profile",
        resume
      );

      const user = response.data.user;

      setResume({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        about: user.about || "",
        skills: user.skills || "",
        education: user.education || "",
        experience: user.experience || "",
        projects: user.projects || "",
        achievements: user.achievements || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        portfolio: user.portfolio || "",
      });

      setMessage("Resume updated successfully!");
    } catch (error) {
      console.error(
        "Resume update error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to update resume"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // Loading
  // ==============================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">
          Loading resume...
        </p>
      </div>
    );
  }

  // ==============================
  // Preview
  // ==============================
  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Resume Preview
              </h1>

              <p className="text-gray-500 mt-1">
                Preview your professional resume.
              </p>
            </div>

            <button
              onClick={() => setShowPreview(false)}
              className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-lg font-semibold"
            >
              Edit Resume
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10">

            {/* Header */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {resume.name || "Your Name"}
              </h2>

              <div className="text-sm text-gray-500 mt-3 space-y-1">
                {resume.email && <p>{resume.email}</p>}
                {resume.phone && <p>{resume.phone}</p>}
              </div>

              <div className="flex flex-wrap gap-4 mt-3 text-sm">
                {resume.github && (
                  <a
                    href={resume.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                )}

                {resume.linkedin && (
                  <a
                    href={resume.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn
                  </a>
                )}

                {resume.portfolio && (
                  <a
                    href={resume.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Portfolio
                  </a>
                )}
              </div>
            </div>

            {/* About */}
            {resume.about && (
              <div className="mt-7">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  About
                </h3>

                <p className="text-gray-600 whitespace-pre-line">
                  {resume.about}
                </p>
              </div>
            )}

            {/* Skills */}
            {resume.skills && (
              <div className="mt-7">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Skills
                </h3>

                <p className="text-gray-600 whitespace-pre-line">
                  {resume.skills}
                </p>
              </div>
            )}

            {/* Education */}
            {resume.education && (
              <div className="mt-7">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Education
                </h3>

                <p className="text-gray-600 whitespace-pre-line">
                  {resume.education}
                </p>
              </div>
            )}

            {/* Experience */}
            {resume.experience && (
              <div className="mt-7">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Experience
                </h3>

                <p className="text-gray-600 whitespace-pre-line">
                  {resume.experience}
                </p>
              </div>
            )}

            {/* Projects */}
            {resume.projects && (
              <div className="mt-7">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Projects
                </h3>

                <p className="text-gray-600 whitespace-pre-line">
                  {resume.projects}
                </p>
              </div>
            )}

            {/* Achievements */}
            {resume.achievements && (
              <div className="mt-7">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Achievements
                </h3>

                <p className="text-gray-600 whitespace-pre-line">
                  {resume.achievements}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

  // ==============================
  // Resume Form
  // ==============================
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              My Resume
            </h1>

            <p className="text-gray-500 mt-2">
              Create and manage your professional resume.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-lg font-semibold"
          >
            Preview Resume
          </button>

          <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            Download Resume
            </button>
        </div>

        {/* Success */}
        {message && (
          <div className="mb-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8"
        >

          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Personal Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add your basic professional information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

            <input
              type="text"
              name="name"
              value={resume.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              value={resume.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              name="phone"
              value={resume.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="skills"
              value={resume.skills}
              onChange={handleChange}
              placeholder="Skills - React, Node.js, MongoDB"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* About */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About
            </label>

            <textarea
              name="about"
              value={resume.about}
              onChange={handleChange}
              rows="4"
              placeholder="Write something about yourself..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Education */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education
            </label>

            <textarea
              name="education"
              value={resume.education}
              onChange={handleChange}
              rows="4"
              placeholder="B.Tech CSE..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Experience */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience
            </label>

            <textarea
              name="experience"
              value={resume.experience}
              onChange={handleChange}
              rows="4"
              placeholder="Add your experience..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Projects */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projects
            </label>

            <textarea
              name="projects"
              value={resume.projects}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your projects..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Achievements */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Achievements
            </label>

            <textarea
              name="achievements"
              value={resume.achievements}
              onChange={handleChange}
              rows="4"
              placeholder="Add your achievements..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Social Links */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              Social Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

              <input
                type="url"
                name="github"
                value={resume.github}
                onChange={handleChange}
                placeholder="GitHub URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="url"
                name="linkedin"
                value={resume.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="url"
                name="portfolio"
                value={resume.portfolio}
                onChange={handleChange}
                placeholder="Portfolio URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>
          </div>

          {/* Save */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              {saving ? "Saving..." : "Save Resume"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Resume;