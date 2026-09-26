// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";
// import { useAuth } from "../../store/AuthContext";

// function Login() {
//   const navigate = useNavigate();
//   const { getProfile } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await api.post("/auth/login", {
//         email,
//         password,
//       });

//       console.log("Login response:", response.data);

//       await getProfile();

//       navigate("/");
//     } catch (error) {
//       console.error(
//         "Login error:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">
//       <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-10 shadow-xl">

//         <h1 className="text-4xl font-bold text-white">
//           Welcome back
//         </h1>

//         <p className="text-slate-400 text-lg mt-3 mb-8">
//           Log in to continue to JobConnect.
//         </p>

//         <form onSubmit={handleLogin}>

//           <label className="block text-white font-semibold mb-2">
//             Email
//           </label>

//           <input
//             type="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 mb-6 outline-none focus:border-blue-500"
//           />

//           <label className="block text-white font-semibold mb-2">
//             Password
//           </label>

//           <input
//             type="password"
//             placeholder="••••••••"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 mb-6 outline-none focus:border-blue-500"
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
//           >
//             Log In
//           </button>

//         </form>

//         <div className="border-t border-slate-700 mt-7 pt-6">

//           <p className="text-slate-400 mb-4">
//             Demo accounts (password: demo123)
//           </p>

//           <div className="flex gap-3">

//             <button
//               type="button"
//               onClick={() =>
//                 setEmail("student@jobconnect.com")
//               }
//               className="bg-slate-800 text-white px-4 py-2 rounded-full"
//             >
//               Student
//             </button>

//             <button
//               type="button"
//               onClick={() =>
//                 setEmail("recruiter@jobconnect.com")
//               }
//               className="bg-slate-800 text-white px-4 py-2 rounded-full"
//             >
//               Recruiter
//             </button>

//             <button
//               type="button"
//               onClick={() =>
//                 setEmail("admin@jobconnect.com")
//               }
//               className="bg-slate-800 text-white px-4 py-2 rounded-full"
//             >
//               Admin
//             </button>

//           </div>
//         </div>

//         <p className="text-center text-slate-400 mt-8">
//           Don't have an account?{" "}
//           <button
//             type="button"
//             onClick={() => navigate("/register")}
//             className="text-blue-500 font-semibold"
//           >
//             Sign up
//           </button>
//         </p>

//       </div>
//     </div>
//   );
// }

// export default Login;