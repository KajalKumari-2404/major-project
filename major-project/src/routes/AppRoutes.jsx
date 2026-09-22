import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// const Login = () => {
//   return <h1>Login Page</h1>;
// };

// const Register = () => {
//   return <h1>Register Page</h1>;
// };

const Jobs = () => {
  return <h1>Jobs Page</h1>;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;