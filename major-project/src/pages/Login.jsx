// import { useState } from "react";
// import api from "../api/axios";
// import { useAuth } from "../../store/AuthContext";

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

      // await getProfile();
      // navigate("/");
      await getProfile();

console.log("Going to Home...");


navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;