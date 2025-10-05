// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid = () =>
    formData.email.trim() !== "" && formData.password.trim() !== "";

  const handleLogin = async () => {
    if (!isFormValid()) return;

    try {
      // Call AuthContext login
      const decoded = await login({
        email: formData.email,
        password: formData.password,
      });

      // ✅ Save JWT tokens to localStorage (keys match your dashboard code)
      if (decoded.access) localStorage.setItem("access", decoded.access);
      if (decoded.refresh) localStorage.setItem("refresh", decoded.refresh);

      // ✅ Save user role to localStorage (fallback: voyager)
      const role = decoded.role || "voyager";
      localStorage.setItem("role", role);

      // Navigate to dashboard
      navigate(getDashboardPath(role));
    } catch (error) {
      alert(error.message || "Login failed. Please try again.");
    }
  };

  const getDashboardPath = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "/admin";
      case "voyager":
        return "/voyager";
      case "head_cook":
        return "/head_cook";
      case "manager":
        return "/manager";
      case "supervisor":
        return "/supervisor";
      default:
        return "/unauthorized";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🚢 CruiseMate Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm text-gray-600">Remember Me</label>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-2 rounded-xl text-white font-semibold transition 
            ${
              !isFormValid()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 shadow-lg"
            }`}
          onClick={handleLogin}
          disabled={!isFormValid()}
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
