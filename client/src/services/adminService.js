// client/src/services/adminService.js
import API from "./api";

// Helper to attach Authorization header
const authHeader = () => {
  const token = localStorage.getItem("access_token"); // ✅ consistent key
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// -------------------- Admin APIs --------------------

// Fetch all items
export const fetchItems = async () => {
  try {
    const response = await API.get("admin/items/", {
      headers: authHeader(),
    });
    return response.data; // should be an array
  } catch (error) {
    console.error(
      "Error fetching items:",
      error.response?.data || error.message
    );
    return []; // fallback so .map() won’t break
  }
};

// Create new item
export const createItem = async (data) => {
  try {
    const response = await API.post("admin/items/", data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating item:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update item
export const updateItem = async (id, data) => {
  try {
    const response = await API.put(`admin/items/${id}/`, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating item:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete item
export const deleteItem = async (id) => {
  try {
    await API.delete(`admin/items/${id}/`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    console.error(
      "Error deleting item:",
      error.response?.data || error.message
    );
    throw error;
  }
};
