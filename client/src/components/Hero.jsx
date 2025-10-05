// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import cruiseShipBg from "../assets/cruise-ship.jpg";

const Hero = () => {
  const [location, setLocation] = useState("Guest");
  const [date, setDate] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const storedUser = JSON.parse(localStorage.getItem("user"));
    let role = storedUser?.role;

    if (role) {
      // ✅ Normalize role to match frontend expectations
      role = role.replace(/_/g, "").toLowerCase();
      setLocation(role);
    }
  }, []);

  const handleSearch = () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }
    alert(`🔍 Searching cruises for ${location} on ${date}`);
  };

  return (
    <header
      className="relative text-white min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${cruiseShipBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-0" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-[80vh] px-4">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-2xl text-yellow-300"
        >
          🌊 Explore & Travel in Style
        </motion.h3>

        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mt-3 drop-shadow-lg"
        >
          Let’s Go Now
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-300 max-w-xl mx-auto mt-4"
        >
          Cruise the seas with elegance and ease. Your next adventure awaits
          just beyond the horizon.
        </motion.p>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-md shadow-lg w-full max-w-3xl"
        >
          <div className="text-left">
            <label className="block text-sm font-medium text-white">
              Location
            </label>
            <strong className="block mt-1">{location}</strong>
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-white">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 p-2 rounded bg-white text-black"
            />
          </div>
          <button
            onClick={handleSearch}
            className="text-white bg-yellow-400 hover:bg-yellow-300 transition p-3 rounded-full text-xl shadow-md"
          >
            🔍
          </button>
        </motion.div>

        <motion.a
          href="#scroll-target"
          className="block mt-10 text-sm text-yellow-300 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          scroll down ↓
        </motion.a>
      </div>

      {/* Featured Cruises */}
      <section
        id="scroll-target"
        className="relative z-10 mt-20 px-6 md:px-20"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          🌟 Featured Weekend Cruises
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-center">
          Unwind and relax with our specially curated weekend getaways. Enjoy
          luxury, leisure, and unforgettable experiences.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {["⛵ Goa Delight", "🌴 Thailand Bliss", "🏝️ Maldives Escape"].map(
            (title, i) => (
              <motion.div
                key={title}
                data-aos="zoom-in"
                data-aos-delay={i * 150}
                whileHover={{ rotateY: 15, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-60 h-36 bg-white text-black rounded-xl flex items-center justify-center font-semibold text-lg shadow-xl hover:shadow-yellow-300 cursor-pointer transition-transform duration-300"
              >
                {title}
              </motion.div>
            )
          )}
        </div>
      </section>
    </header>
  );
};

export default Hero;
