import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
} from "../../services/adminService";
import { registerVoyager } from "../../services/voyagerService";

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "catering", price: "" });
  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState({ name: "", category: "catering", price: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Backend URL from .env
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // --- Logging helper ---
  const logAction = async (actionType, details) => {
    try {
      await fetch(`${backendUrl}/api/logs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ actionType, details }),
      });
    } catch (err) {
      console.error("Logging failed:", err);
    }
  };

  // --- Load all items ---
  const loadItems = async () => {
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (err) {
      console.error("Fetch items error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // --- Add new item ---
  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createItem(newItem);
      await logAction("AddItem", { ...newItem });
      setNewItem({ name: "", category: "catering", price: "" });
      loadItems();
    } catch (err) {
      console.error("Add item error:", err.response?.data || err.message);
      alert("Failed to add item.");
    } finally {
      setLoading(false);
    }
  };

  // --- Start editing item ---
  const startEdit = (item) => {
    setEditItemId(item.id);
    setEditItemData({ name: item.name, category: item.category, price: item.price });
  };

  // --- Cancel editing ---
  const cancelEdit = () => {
    setEditItemId(null);
    setEditItemData({ name: "", category: "catering", price: "" });
  };

  // --- Update item ---
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!editItemId) return;
    setLoading(true);
    try {
      await updateItem(editItemId, editItemData);
      await logAction("UpdateItem", { id: editItemId, ...editItemData });
      cancelEdit();
      loadItems();
    } catch (err) {
      console.error("Update item error:", err.response?.data || err.message);
      alert("Failed to update item.");
    } finally {
      setLoading(false);
    }
  };

  // --- Delete item ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteItem(id);
      await logAction("DeleteItem", { id });
      loadItems();
    } catch (err) {
      console.error("Delete item error:", err.response?.data || err.message);
      alert("Failed to delete item.");
    }
  };

  // --- Register Voyager ---
  const handleRegisterVoyager = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!email || !password) return alert("Email and password required");
    setLoading(true);
    try {
      await registerVoyager({ email, password });
      alert("Voyager registered successfully!");
      await logAction("RegisterVoyager", { email });
      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.error?.includes("UNIQUE")) {
        alert("Email already exists.");
      } else {
        alert("Voyager registration failed.");
      }
      console.error("Register voyager error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <motion.h2
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Admin Dashboard 🚀
      </motion.h2>

      {/* --- Add Item Section --- */}
      <motion.section
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-12 shadow-lg hover:shadow-indigo-500/30 transition-all"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-semibold mb-6">➕ Add New Item</h3>
        <form onSubmit={handleAddItem} className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Item name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="px-4 py-2 bg-white/20 text-white rounded-lg focus:outline-none"
          >
            <option value="catering">Catering</option>
            <option value="stationery">Stationery</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="col-span-full md:col-span-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
          >
            {loading ? "Processing..." : "Add Item"}
          </button>
        </form>
      </motion.section>

      {/* --- Menu Item List --- */}
      <motion.section
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-12 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h3 className="text-2xl font-semibold mb-6">📦 Menu Items</h3>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.li
              key={item.id}
              className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow hover:shadow-lg transition duration-300 relative border border-white/30"
              whileHover={{ rotate: 1.5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              {editItemId === item.id ? (
                <form onSubmit={handleUpdateItem} className="space-y-2">
                  <input
                    type="text"
                    value={editItemData.name}
                    onChange={(e) => setEditItemData({ ...editItemData, name: e.target.value })}
                    className="px-3 py-1 bg-white/20 rounded-lg text-black w-full"
                    required
                  />
                  <select
                    value={editItemData.category}
                    onChange={(e) => setEditItemData({ ...editItemData, category: e.target.value })}
                    className="px-3 py-1 bg-white/20 rounded-lg text-black w-full"
                  >
                    <option value="catering">Catering</option>
                    <option value="stationery">Stationery</option>
                  </select>
                  <input
                    type="number"
                    value={editItemData.price}
                    onChange={(e) => setEditItemData({ ...editItemData, price: e.target.value })}
                    className="px-3 py-1 bg-white/20 rounded-lg text-black w-full"
                    required
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-green-500 px-3 py-1 rounded-lg">Save</button>
                    <button type="button" onClick={cancelEdit} className="bg-red-500 px-3 py-1 rounded-lg">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-300">
                    ₹{item.price} • {item.category}
                  </p>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button onClick={() => startEdit(item)} className="text-yellow-400 hover:text-yellow-600" title="Edit">
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600" title="Delete">
                      🗑
                    </button>
                  </div>
                </>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* --- Register Voyager --- */}
      <motion.section
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-semibold mb-6">🧑‍🚀 Register Voyager</h3>
        <form onSubmit={handleRegisterVoyager} className="grid gap-4 sm:grid-cols-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className="col-span-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
          >
            {loading ? "Processing..." : "Register Voyager"}
          </button>
        </form>
      </motion.section>
    </div>
  );
};

export default AdminDashboard;
