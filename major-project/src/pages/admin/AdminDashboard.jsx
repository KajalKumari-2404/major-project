import { useEffect, useState } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5000/api/v1";

  // Fetch Admin Data
  const fetchAdminData = async () => {
    try {
      setLoading(true);

      const [usersRes, jobsRes, applicationsRes] = await Promise.all([
        fetch(`${API}/admin/users`, {
          credentials: "include",
        }),
        fetch(`${API}/admin/jobs`, {
          credentials: "include",
        }),
        fetch(`${API}/admin/applications`, {
          credentials: "include",
        }),
      ]);

      const usersData = await usersRes.json();
      const jobsData = await jobsRes.json();
      const applicationsData = await applicationsRes.json();

      if (usersRes.ok) {
        setUsers(usersData.users || []);
      }

      if (jobsRes.ok) {
        setJobs(jobsData.jobs || []);
      }

      if (applicationsRes.ok) {
        setApplications(applicationsData.applications || []);
      }
    } catch (error) {
      console.error("Admin dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Block / Unblock User
  const toggleUserBlock = async (userId) => {
    try {
      const response = await fetch(`${API}/admin/users/${userId}/block`, {
        method: "PUT",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                isBlocked: data.user.isBlocked,
              }
            : user
        )
      );
    } catch (error) {
      console.error("Block/unblock error:", error);
      alert("Server error");
    }
  };

  // Statistics
  const totalUsers = users.length;

  const totalStudents = users.filter(
    (user) => user.role === "student"
  ).length;

  const totalRecruiters = users.filter(
    (user) => user.role === "recruiter"
  ).length;

  const blockedUsers = users.filter(
    (user) => user.isBlocked
  ).length;

  const totalJobs = jobs.length;
  const totalApplications = applications.length;

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-slate-400">
            Loading Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Dashboard Layout */}
      <div className="max-w-[1600px] mx-auto flex">

        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 min-h-[calc(100vh-73px)] border-r border-slate-800 bg-slate-900/60 flex-col">

          {/* Brand */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg">
                J
              </div>

              <div>
                <h2 className="font-bold">
                  JobConnect
                </h2>

                <p className="text-xs text-slate-500">
                  Administration
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">

            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === "overview"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>▦</span>
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === "users"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>◉</span>
              Users
            </button>

            <button
              onClick={() => setActiveTab("jobs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === "jobs"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>▣</span>
              Jobs
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === "applications"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>✓</span>
              Applications
            </button>

          </nav>

          {/* Bottom */}
          <div className="mt-auto p-4">
            <div className="bg-slate-800/60 rounded-xl p-4">
              <p className="text-xs text-slate-500">
                Admin Panel
              </p>

              <p className="text-sm font-medium mt-1">
                JobConnect Management
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">

          {/* Header */}
          <header className="border-b border-slate-800 bg-slate-900/50">
            <div className="px-5 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>
                <p className="text-blue-400 text-sm font-medium">
                  Administration
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold mt-1">
                  {activeTab === "overview" && "Dashboard Overview"}
                  {activeTab === "users" && "User Management"}
                  {activeTab === "jobs" && "Job Management"}
                  {activeTab === "applications" &&
                    "Application Management"}
                </h1>

                <p className="text-slate-400 text-sm mt-2">
                  Manage your JobConnect platform from one place.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
                  A
                </div>

                <div>
                  <p className="text-sm font-medium">
                    JobConnect Admin
                  </p>

                  <p className="text-xs text-slate-500">
                    Administrator
                  </p>
                </div>
              </div>

            </div>
          </header>

          {/* Mobile Navigation */}
          <div className="lg:hidden px-5 pt-5">
            <div className="flex gap-2 overflow-x-auto pb-2">

              {[
                ["overview", "Dashboard"],
                ["users", "Users"],
                ["jobs", "Jobs"],
                ["applications", "Applications"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setActiveTab(value)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium ${
                    activeTab === value
                      ? "bg-blue-600 text-white"
                      : "bg-slate-900 text-slate-400 border border-slate-800"
                  }`}
                >
                  {label}
                </button>
              ))}

            </div>
          </div>

          <div className="p-5 sm:p-8">

            {/* ================= OVERVIEW ================= */}
            {activeTab === "overview" && (
              <div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                  {/* Users */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-start justify-between">

                      <div>
                        <p className="text-sm text-slate-400">
                          Total Users
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                          {totalUsers}
                        </h2>
                      </div>

                      <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl">
                        ◉
                      </div>

                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800">
                      <p className="text-sm text-blue-400">
                        {totalStudents} Students
                      </p>
                    </div>
                  </div>

                  {/* Recruiters */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-start justify-between">

                      <div>
                        <p className="text-sm text-slate-400">
                          Recruiters
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                          {totalRecruiters}
                        </h2>
                      </div>

                      <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl">
                        ◈
                      </div>

                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800">
                      <p className="text-sm text-purple-400">
                        Registered recruiters
                      </p>
                    </div>
                  </div>

                  {/* Jobs */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-start justify-between">

                      <div>
                        <p className="text-sm text-slate-400">
                          Total Jobs
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                          {totalJobs}
                        </h2>
                      </div>

                      <div className="w-11 h-11 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center text-xl">
                        ▣
                      </div>

                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800">
                      <p className="text-sm text-green-400">
                        Jobs posted
                      </p>
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-start justify-between">

                      <div>
                        <p className="text-sm text-slate-400">
                          Applications
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                          {totalApplications}
                        </h2>
                      </div>

                      <div className="w-11 h-11 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center text-xl">
                        ✓
                      </div>

                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800">
                      <p className="text-sm text-yellow-400">
                        Total applications
                      </p>
                    </div>
                  </div>

                </div>

                {/* Lower cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">

                  {/* Users Summary */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-lg font-semibold">
                          User Overview
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                          Current platform users
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveTab("users")}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        View all
                      </button>
                    </div>

                    <div className="space-y-4">

                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">
                          Students
                        </span>

                        <span className="font-semibold">
                          {totalStudents}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">
                          Recruiters
                        </span>

                        <span className="font-semibold">
                          {totalRecruiters}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">
                          Blocked Users
                        </span>

                        <span className="font-semibold text-red-400">
                          {blockedUsers}
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* Platform Activity */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                    <div className="mb-6">
                      <h2 className="text-lg font-semibold">
                        Platform Activity
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        Current JobConnect activity
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                        <p className="text-xs text-slate-500">
                          Jobs
                        </p>

                        <p className="text-2xl font-bold mt-2">
                          {totalJobs}
                        </p>
                      </div>

                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                        <p className="text-xs text-slate-500">
                          Applications
                        </p>

                        <p className="text-2xl font-bold mt-2">
                          {totalApplications}
                        </p>
                      </div>

                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                        <p className="text-xs text-slate-500">
                          Students
                        </p>

                        <p className="text-2xl font-bold mt-2">
                          {totalStudents}
                        </p>
                      </div>

                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                        <p className="text-xs text-slate-500">
                          Recruiters
                        </p>

                        <p className="text-2xl font-bold mt-2">
                          {totalRecruiters}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* ================= USERS ================= */}
            {activeTab === "users" && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                <div className="p-6 border-b border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>
                      <h2 className="text-xl font-semibold">
                        User Management
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        Manage students, recruiters and platform users.
                      </p>
                    </div>

                    <div className="text-sm text-slate-400">
                      {totalUsers} users
                    </div>

                  </div>
                </div>

                {users.length === 0 ? (
                  <div className="p-12 text-center text-slate-500">
                    No users found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead className="bg-slate-950">
                        <tr className="text-left text-slate-400">
                          <th className="px-6 py-4">
                            User
                          </th>

                          <th className="px-6 py-4">
                            Role
                          </th>

                          <th className="px-6 py-4">
                            Status
                          </th>

                          <th className="px-6 py-4">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {users.map((user) => (
                          <tr
                            key={user._id}
                            className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                          >

                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium">
                                  {user.name}
                                </p>

                                <p className="text-xs text-slate-500 mt-1">
                                  {user.email}
                                </p>
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <span className="capitalize text-slate-300">
                                {user.role}
                              </span>
                            </td>

                            <td className="px-6 py-4">
                              {user.isBlocked ? (
                                <span className="inline-flex px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs">
                                  Blocked
                                </span>
                              ) : (
                                <span className="inline-flex px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                                  Active
                                </span>
                              )}
                            </td>

                            <td className="px-6 py-4">

                              {user.role !== "admin" ? (
                                <button
                                  onClick={() =>
                                    toggleUserBlock(user._id)
                                  }
                                  className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
                                    user.isBlocked
                                      ? "bg-green-600 hover:bg-green-700"
                                      : "bg-red-600 hover:bg-red-700"
                                  }`}
                                >
                                  {user.isBlocked
                                    ? "Unblock"
                                    : "Block"}
                                </button>
                              ) : (
                                <span className="text-slate-500 text-xs">
                                  Admin
                                </span>
                              )}

                            </td>

                          </tr>
                        ))}
                      </tbody>

                    </table>

                  </div>
                )}

              </div>
            )}

            {/* ================= JOBS ================= */}
            {activeTab === "jobs" && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                <div className="p-6 border-b border-slate-800">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>
                      <h2 className="text-xl font-semibold">
                        Job Management
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        Monitor all jobs posted on JobConnect.
                      </p>
                    </div>

                    <div className="text-sm text-slate-400">
                      {totalJobs} jobs
                    </div>

                  </div>

                </div>

                {jobs.length === 0 ? (
                  <div className="p-12 text-center text-slate-500">
                    No jobs found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead className="bg-slate-950">
                        <tr className="text-left text-slate-400">

                          <th className="px-6 py-4">
                            Job
                          </th>

                          <th className="px-6 py-4">
                            Company
                          </th>

                          <th className="px-6 py-4">
                            Location
                          </th>

                          <th className="px-6 py-4">
                            Recruiter
                          </th>

                          <th className="px-6 py-4">
                            Status
                          </th>

                        </tr>
                      </thead>

                      <tbody>

                        {jobs.map((job) => (
                          <tr
                            key={job._id}
                            className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                          >

                            <td className="px-6 py-4">
                              <p className="font-medium">
                                {job.title}
                              </p>

                              <p className="text-xs text-slate-500 mt-1">
                                {job.employmentType || "Job"}
                              </p>
                            </td>

                            <td className="px-6 py-4 text-slate-300">
                              {job.company}
                            </td>

                            <td className="px-6 py-4 text-slate-400">
                              {job.location}
                            </td>

                            <td className="px-6 py-4 text-slate-400">
                              {job.recruiter?.name || "N/A"}
                            </td>

                            <td className="px-6 py-4">

                              <span
                                className={`inline-flex px-3 py-1 rounded-full text-xs ${
                                  job.status === "closed"
                                    ? "bg-red-500/10 text-red-400"
                                    : "bg-green-500/10 text-green-400"
                                }`}
                              >
                                {job.status || "Active"}
                              </span>

                            </td>

                          </tr>
                        ))}

                      </tbody>

                    </table>

                  </div>
                )}

              </div>
            )}

            {/* ================= APPLICATIONS ================= */}
            {activeTab === "applications" && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                <div className="p-6 border-b border-slate-800">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>
                      <h2 className="text-xl font-semibold">
                        Application Management
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        Monitor applications submitted by students.
                      </p>
                    </div>

                    <div className="text-sm text-slate-400">
                      {totalApplications} applications
                    </div>

                  </div>

                </div>

                {applications.length === 0 ? (
                  <div className="p-12 text-center text-slate-500">
                    No applications found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead className="bg-slate-950">
                        <tr className="text-left text-slate-400">

                          <th className="px-6 py-4">
                            Student
                          </th>

                          <th className="px-6 py-4">
                            Job
                          </th>

                          <th className="px-6 py-4">
                            Company
                          </th>

                          <th className="px-6 py-4">
                            Recruiter
                          </th>

                          <th className="px-6 py-4">
                            Status
                          </th>

                        </tr>
                      </thead>

                      <tbody>

                        {applications.map((application) => (
                          <tr
                            key={application._id}
                            className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                          >

                            <td className="px-6 py-4">

                              <p className="font-medium">
                                {application.student?.name || "N/A"}
                              </p>

                              <p className="text-xs text-slate-500 mt-1">
                                {application.student?.email || ""}
                              </p>

                            </td>

                            <td className="px-6 py-4 text-slate-300">
                              {application.job?.title || "N/A"}
                            </td>

                            <td className="px-6 py-4 text-slate-400">
                              {application.job?.company || "N/A"}
                            </td>

                            <td className="px-6 py-4 text-slate-400">
                              {application.recruiter?.name || "N/A"}
                            </td>

                            <td className="px-6 py-4">

                              <span className="inline-flex px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs">
                                {application.status}
                              </span>

                            </td>

                          </tr>
                        ))}

                      </tbody>

                    </table>

                  </div>
                )}

              </div>
            )}

          </div>

        </main>

      </div>
    </div>
  );
}

export default AdminDashboard;