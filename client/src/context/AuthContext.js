// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import API from "../services/api"; // ✅ axios instance with baseURL
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ---------------- Load existing user ----------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed?.token) {
          const decoded = jwtDecode(parsed.token);

          // ✅ Normalize role from localStorage too
          const normalizedRole = parsed.role
            ? parsed.role.replace(/_/g, "").toLowerCase()
            : "";

          setUser({ ...decoded, ...parsed, role: normalizedRole });
        }
      } catch (err) {
        console.error("Token decode error:", err);
        logout();
      }
    }
  }, []);

  // ---------------- Login ----------------
  const login = async ({ email, password }) => {
    try {
      const res = await API.post("token/", { email, password });

      const { access, refresh, role, username, email: userEmail, user_id } =
        res.data;

      // ✅ Keep exact backend role for API calls
      const backendRole = role;

      // ✅ Normalize role to remove underscores and lowercase
      const normalizedRole = role ? role.replace(/_/g, "").toLowerCase() : "";

      // Store tokens + user info in one object
      const userData = {
        token: access, // access token
        refresh, // refresh token
        role: normalizedRole, // ✅ use normalized role
        backendRole, 
        username,
        email: userEmail,
        user_id,
      };

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Decode for extra claims
      const decoded = jwtDecode(access);

      // Merge decoded claims with our userData
      const finalUser = { ...decoded, ...userData };
      setUser(finalUser);

      // ✅ Return full object (not just decoded)
      return finalUser;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      let errorMsg = "Invalid email or password. Please try again.";
      if (error.response?.data) {
        const data = error.response.data;
        if (data.error) errorMsg = data.error;
        else if (data.non_field_errors)
          errorMsg = data.non_field_errors.join(" ");
      }
      throw new Error(errorMsg);
    }
  };

  // ---------------- Logout ----------------
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
