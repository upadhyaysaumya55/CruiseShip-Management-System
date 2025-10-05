// src/pages/CreateAccount.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
import axiosInstance from "../../api/axiosInstance";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const isFormValid = Object.values(formData).every(Boolean);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const roleEndpoints = {
        voyager: "/voyager/register/",
        admin: "/admin/register/",
        manager: "/manager/register/",
        head_cook: "/head_cook/register/",
        supervisor: "/supervisor/register/",
      };

      const endpoint = roleEndpoints[formData.role];
      if (!endpoint) {
        alert("Invalid role selected");
        return;
      }

      await axiosInstance.post(endpoint, formData);

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(
        "Error: " + JSON.stringify(error.response?.data || error.message)
      );
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 px-4">
      {/* Floating gradient blobs */}
      <div className="absolute w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 bottom-20 right-16"></div>
      <div className="absolute w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000 top-1/2 left-1/3"></div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        data-aos="zoom-in"
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md relative z-10 border border-white/20"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-8">
          ✨ Create an Account
        </h2>

        <input
          name="user_id"
          type="text"
          placeholder="User ID"
          className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
          value={formData.user_id}
          onChange={handleChange}
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email ID"
          className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
          value={formData.password}
          onChange={handleChange}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
        >
          <option value="">Select Role</option>
          <option value="voyager">Voyager</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="supervisor">Supervisor</option>
          <option value="head_cook">Head-Cook</option>
        </select>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!isFormValid}
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition-all 
            ${
              !isFormValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-600"
            }`}
        >
          Create Account
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CreateAccount;
