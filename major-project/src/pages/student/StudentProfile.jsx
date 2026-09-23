import { useEffect, useState } from "react";
import api from "../../api/axios";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    about: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==============================
  // Get Profile
  // ==============================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile");

        const user = response.data.user;

        setProfile({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          about: user.about || "",
          skills: user.skills || "",
          education: user.education || "",
          experience: user.experience || "",
          projects: user.projects || "",
          github: user.github || "",
          linkedin: user.linkedin || "",
          portfolio: user.portfolio || "",
        });
      } catch (error) {
        console.error(
          "Profile fetch error:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
            "Unable to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ==============================
  // Handle Input
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // Save Profile
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await api.put(
        "/auth/profile",
        profile
      );

      const user = response.data.user;

      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        about: user.about || "",
        skills: user.skills || "",
        education: user.education || "",
        experience: user.experience || "",
        projects: user.projects || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        portfolio: user.portfolio || "",
      });

      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error(
        "Profile update error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // Profile Completion
  // ==============================
  const filledFields = Object.values(profile).filter(
    (value) => value.trim() !== ""
  ).length;

  const totalFields = Object.keys(profile).length;

  const completion = Math.round(
    (filledFields / totalFields) * 100
  );

  // ==============================
  // Loading
  // ==============================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your personal and professional information.
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Profile Completion */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">

          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Profile Completion
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Complete your profile to improve your job opportunities.
              </p>
            </div>

            <span className="text-xl font-bold text-blue-600">
              {completion}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8"
        >

          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900">
              Personal Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add your basic information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* About */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About
            </label>

            <textarea
              name="about"
              value={profile.about}
              onChange={handleChange}
              rows="4"
              placeholder="Write something about yourself..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Education & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

            {/* Education */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>

              <textarea
                name="education"
                value={profile.education}
                onChange={handleChange}
                rows="4"
                placeholder="B.Tech CSE..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>

              <textarea
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                rows="4"
                placeholder="Add your experience..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

          </div>

          {/* Projects */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projects
            </label>

            <textarea
              name="projects"
              value={profile.projects}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your projects..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Social Links */}
          <div className="mt-8">

            <h2 className="text-xl font-bold text-gray-900">
              Social Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

              {/* GitHub */}
              <input
                type="url"
                name="github"
                value={profile.github}
                onChange={handleChange}
                placeholder="GitHub URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* LinkedIn */}
              <input
                type="url"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Portfolio */}
              <input
                type="url"
                name="portfolio"
                value={profile.portfolio}
                onChange={handleChange}
                placeholder="Portfolio URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default StudentProfile;