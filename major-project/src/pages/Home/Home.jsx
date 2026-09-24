import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="px-6 pt-16 pb-20">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-blue-950/60 border border-blue-900 px-4 py-2 text-sm text-blue-400 mb-6">
            Find opportunities. Build your career.
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Find your next role on
            <span className="block text-blue-600 mt-2">
              JobConnect
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto mt-6 text-gray-400 text-base sm:text-lg leading-relaxed">
            A complete job and career platform for students, recruiters,
            and admins — search jobs, track applications, manage postings,
            and grow your career.
          </p>
          

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

            <Link
              to="/jobs"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-gray-700 hover:bg-gray-900 px-6 py-3 rounded-lg font-semibold transition"
            >
              Log In
            </Link>

          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Student */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-900 transition">
            <div className="text-3xl mb-5">
              🎓
            </div>

            <h2 className="text-xl font-bold mb-2">
              For Students
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Search jobs, apply to opportunities, and track every
              application from one place.
            </p>
          </div>

          {/* Recruiter */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-900 transition">
            <div className="text-3xl mb-5">
              🏢
            </div>

            <h2 className="text-xl font-bold mb-2">
              For Recruiters
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Post jobs, manage applications, and find the right
              candidates efficiently.
            </p>
          </div>

          {/* Admin */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-900 transition">
            <div className="text-3xl mb-5">
              🛡️
            </div>

            <h2 className="text-xl font-bold mb-2">
              For Admins
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Manage users, recruiters, jobs, and overall platform
              activity.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;