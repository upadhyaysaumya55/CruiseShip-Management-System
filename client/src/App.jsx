// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Navbar from "./components/Navbar";

// Auth Pages
import Login from "./pages/Auth/Login";
import CreateAccount from "./pages/Auth/CreateAccount";

// Dashboards
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/Admin/Dashboard";
import VoyagerDashboard from "./pages/Voyager/Dashboard";
import HeadCookDashboard from "./pages/HeadCook/Dashboard";
import ManagerDashboard from "./pages/Manager/Dashboard";
import SupervisorDashboard from "./pages/Supervisor/Dashboard";

// ✅ Register Voyager Page
import VoyagerRegister from "./pages/Register/VoyagerRegister";

// Public Pages
import Hero from "./components/Hero";
import Offers from "./pages/Offers";
import Destinations from "./pages/Destinations";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import WebCheckin from "./pages/WebCheckin";
import WeekendGateway from "./components/WeekendGateway";

import "./index.css";

// AOS imports
import AOS from "aos";
import "aos/dist/aos.css";

function AppWrapper() {
  const location = useLocation();

  // ✅ Hide Navbar on Login & Create Account pages
  const hideNavbar = ["/login", "/create-account"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/voyager-register" element={<VoyagerRegister />} />
        <Route path="/web-checkin" element={<WebCheckin />} />
        <Route path="/weekend-gateway" element={<WeekendGateway />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/voyager"
          element={
            <PrivateRoute allowedRoles={["voyager"]}>
              <VoyagerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/head_cook"
          element={
            <PrivateRoute allowedRoles={["head_cook"]}>
              <HeadCookDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <PrivateRoute allowedRoles={["manager"]}>
              <ManagerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/supervisor"
          element={
            <PrivateRoute allowedRoles={["supervisor"]}>
              <SupervisorDashboard />
            </PrivateRoute>
          }
        />

        {/* Unauthorized + NotFound */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<h2 className="text-center mt-10">404 - Page Not Found</h2>} />
      </Routes>
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppWrapper />
      </Router>
    </AuthProvider>
  );
}

export default App;
