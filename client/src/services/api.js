// client/src/services/api.js
import axios from "axios";

// -------------------- Axios Instance --------------------
const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api/",
  headers: { "Content-Type": "application/json" },
});

// -------------------- Request Interceptor --------------------
API.interceptors.request.use(
  (req) => {
    // Prefer accessToken from localStorage
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      // fallback to user.token if accessToken not found
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
      }
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// -------------------- Response Interceptor --------------------
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Handle expired access token (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem("refreshToken") ||
          JSON.parse(localStorage.getItem("user"))?.refresh;

        if (refreshToken) {
          // Request new access token
          const res = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "/api/token/refresh/",
            { refresh: refreshToken }
          );

          const newAccess = res.data.access;

          // Update storage consistently
          const user = JSON.parse(localStorage.getItem("user")) || {};
          user.token = newAccess;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("accessToken", newAccess);

          // Update headers
          API.defaults.headers.Authorization = `Bearer ${newAccess}`;
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;

          // Retry original request with new token
          return API(originalRequest);
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default API;
