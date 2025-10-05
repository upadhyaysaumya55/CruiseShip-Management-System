// src/pages/voyager/VoyagerDashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import avatar from "../../assets/avatar-voyager.jpg";
import "aos/dist/aos.css";

// ✅ Import the updated role-based API
import { fetchItemsByRole } from "../../services/voyagerService";

const VoyagerDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // --- Load items dynamically based on role + token ---
  useEffect(() => {
    const loadItems = async () => {
      try {
        // ✅ Get token (from localStorage or AuthContext)
        const token = localStorage.getItem("access") || user?.access || null;

        if (!token) {
          alert("You must log in first.");
          setLoading(false);
          return;
        }

        const data = await fetchItemsByRole(user?.role || "voyager", token);
        setItems(data); // already returns array
      } catch (error) {
        console.error("Error fetching items:", error);
        alert("Failed to fetch items. Please log in again.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [user?.role, user?.access]); // ✅ include access token too

  const bookings = [
    { type: "resort", label: "Resort / Lounge", icon: "🏖️" },
    { type: "movie", label: "Movie Theater", icon: "🎬" },
    { type: "salon", label: "Beauty Salon", icon: "💇‍♀️" },
    { type: "fitness", label: "Fitness Center", icon: "🏋️‍♂️" },
    { type: "party", label: "Party Hall", icon: "🎉" },
  ];

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Profile Card */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg flex items-center gap-6 p-6 mb-10 max-w-xl mx-auto"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src={avatar}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-4 border-indigo-300"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.username || "Voyager"}</h2>
          <p className="text-gray-500">Role: {user?.role || "voyager"}</p>
        </div>
      </motion.div>

      {/* Catering Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          🍽️ Catering Items
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading catering items...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items
              .filter((i) => i.category === "catering")
              .map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition duration-300 hover:scale-105 cursor-pointer"
                  whileHover={{ rotate: 2 }}
                >
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-indigo-600 font-bold mt-1">₹{item.price}</p>
                </motion.div>
              ))}
          </div>
        )}
      </section>

      {/* Stationery Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          ✏️ Stationery Items
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">
            Loading stationery items...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items
              .filter((i) => i.category === "stationery")
              .map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition duration-300 hover:scale-105 cursor-pointer"
                  whileHover={{ rotate: -2 }}
                >
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-pink-600 font-bold mt-1">₹{item.price}</p>
                </motion.div>
              ))}
          </div>
        )}
      </section>

      {/* Booking Buttons */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          🛎️ Book Services
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {bookings.map((b) => (
            <motion.button
              key={b.type}
              onClick={() => navigate(`/voyager/book/${b.type}`)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-xl shadow transition-all duration-300 flex flex-col items-center justify-center gap-1"
            >
              <span className="text-3xl">{b.icon}</span>
              <span className="text-sm">{b.label}</span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VoyagerDashboard;
