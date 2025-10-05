import axios from "axios";

// -------------------- Axios Instance --------------------
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // 🔹 Django API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------- Request Interceptor --------------------
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------- Response Interceptor --------------------
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔹 Handle 401 Unauthorized (access token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh_token");
        if (refresh) {
          // Request new access token
          const res = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            { refresh },
            { headers: { "Content-Type": "application/json" } }
          );

          const newAccess = res.data.access;
          localStorage.setItem("access_token", newAccess);

          // Update headers for retry + future requests
          axiosInstance.defaults.headers["Authorization"] = `Bearer ${newAccess}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

          // Retry the original request
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        console.error("Token refresh failed:", err);

        // Clear tokens & redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
