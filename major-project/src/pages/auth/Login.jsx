import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../store/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { getProfile } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      await getProfile();

      navigate("/");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl px-9 py-10 shadow-xl">

        {/* Header */}
        <div className="mb-9">
          <h1 className="text-4xl font-bold text-white">
            Welcome back
          </h1>

          <p className="text-slate-400 text-lg mt-3">
            Log in to continue to JobConnect.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-7">

          {/* Email */}
          <div>
            <label className="block text-white font-semibold mb-3">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-5 py-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white font-semibold mb-3">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-5 py-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Login */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-4 rounded-lg transition"
          >
            Log In
          </button>
        </form>

        {/* Demo Accounts */}
        <div className="border-t border-slate-700 mt-7 pt-7">
          <p className="text-slate-400 mb-4">
            Demo accounts (password: demo123)
          </p>

          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={() => setEmail("student@jobconnect.com")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-3 rounded-full"
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => setEmail("recruiter@jobconnect.com")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-3 rounded-full"
            >
              Recruiter
            </button>

            <button
              type="button"
              onClick={() => setEmail("admin@jobconnect.com")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-3 rounded-full"
            >
              Admin
            </button>

          </div>
        </div>

        {/* Sign Up */}
        <div className="text-center mt-9">
          <p className="text-slate-400 text-lg">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-500 hover:text-blue-400 font-semibold"
            >
              Sign up
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;