import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VoyagerRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // clear field error on change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : "",
      });
      setLoading(false);
      return;
    }

    try {
      // ✅ Only send email & password, backend generates username automatically
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      await axios.post("http://localhost:8000/api/voyager/register/", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess("🎉 Registration successful! Redirecting to login...");
      setFormData({ email: "", password: "" });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(
        "Voyager registration failed:",
        err.response?.data || err.message
      );

      if (err.response?.status === 403) {
        setErrors({
          non_field:
            "❌ Unauthorized. Please check if registration is allowed without login.",
        });
      } else {
        // ✅ Always look inside errors if it exists
        const serverResponse = err.response?.data || {};
        const serverErrors = serverResponse.errors || serverResponse;
        let formattedErrors = {};

        Object.keys(serverErrors).forEach((field) => {
          formattedErrors[field] = Array.isArray(serverErrors[field])
            ? serverErrors[field].join(" ")
            : serverErrors[field];
        });

        setErrors(formattedErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register as Voyager
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Non-field errors */}
          {errors.non_field && (
            <p className="text-red-500 text-center mt-2">{errors.non_field}</p>
          )}

          {/* Success message */}
          {success && (
            <p className="text-green-600 text-center mt-2">{success}</p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default VoyagerRegister;
