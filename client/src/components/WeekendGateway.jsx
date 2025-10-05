import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import cruiseImg from '../assets/weekend-cruise.jpg';

const WeekendGateway = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-sky-100 to-blue-50">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-12 gap-10">
        {/* Text Section */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-sky-800 mb-4">
            🌴 Weekend Getaway Specials
          </h2>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            Escape the ordinary and indulge in luxury. Discover our exclusive weekend cruise offers with gourmet dining, live entertainment, and breathtaking destinations.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-full shadow-lg transition duration-300"
          >
            Explore Packages
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={cruiseImg}
            alt="Cruise Weekend"
            className="rounded-2xl shadow-xl hover:scale-105 transition duration-300"
            data-aos="zoom-in"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WeekendGateway;
