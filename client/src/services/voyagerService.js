// src/services/voyagerService.js
import axiosInstance from "../api/axiosInstance";

// ================================
// Role-based API fetching
// ================================
/**
 * Fetch items/data based on user role
 * @param {string} role - Role of the user (voyager, admin, manager, head_cook, supervisor)
 * @returns {Array|Object} - Data from backend or empty array on error
 */
export const fetchItemsByRole = async (role) => {
  let endpoint = "";

  switch (role.toLowerCase()) {
    case "voyager":
      // Choose which Voyager data you want: catering or stationery
      endpoint = "/voyager/catering/";
      break;
    case "admin":
      endpoint = "/admin/items/";
      break;
    case "manager":
      endpoint = "/manager/bookings/";
      break;
    case "head_cook":
      endpoint = "/head_cook/orders/";
      break;
    case "supervisor":
      endpoint = "/supervisor/orders/";
      break;
    default:
      console.warn(`Unknown role: ${role}`);
      return [];
  }

  try {
    const res = await axiosInstance.get(endpoint, {
      headers: { "Content-Type": "application/json" },
    });
    // Handle different backend response formats
    return res.data.items || res.data.results || res.data || [];
  } catch (error) {
    console.error(
      `Error fetching data for role "${role}":`,
      error.response?.data || error.message
    );
    return [];
  }
};

// ================================
// Voyager Booking APIs
// ================================
export const fetchBookings = async () => {
  try {
    const res = await axiosInstance.get("/voyager/bookings/");
    return res.data.results || res.data || [];
  } catch (error) {
    console.error("Error fetching bookings:", error.response?.data || error.message);
    return [];
  }
};

export const createBooking = async (data) => {
  try {
    const res = await axiosInstance.post("/voyager/bookings/", data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating booking:", error.response?.data || error.message);
    throw error;
  }
};

export const updateBooking = async (id, data) => {
  try {
    const res = await axiosInstance.put(`/voyager/bookings/${id}/`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating booking:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    await axiosInstance.delete(`/voyager/bookings/${id}/`);
    return true;
  } catch (error) {
    console.error("Error deleting booking:", error.response?.data || error.message);
    throw error;
  }
};

// ================================
// Voyager Registration API
// ================================
export const registerVoyager = async (data) => {
  try {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required for registration.");
    }

    const payload = {
      email: data.email,
      username: data.email.split("@")[0], // Use part before @ as username
      password: data.password,
    };

    const res = await axiosInstance.post("/voyager/register/", payload, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    console.error(
      "Voyager registration failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};
