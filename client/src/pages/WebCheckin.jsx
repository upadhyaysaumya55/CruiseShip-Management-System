import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const gradientColors = [
  'linear-gradient(135deg, #1e3a8a, #9333ea)',
  'linear-gradient(135deg, #0f766e, #2563eb)',
  'linear-gradient(135deg, #6d28d9, #dc2626)',
  'linear-gradient(135deg, #be185d, #3b82f6)',
];

const WebCheckin = () => {
  const [formData, setFormData] = useState({
    name: '',
    bookingId: '',
    cabinNumber: '',
    travelDate: '',
  });

  const controls = useAnimation();
  const [bgIndex, setBgIndex] = useState(0);

  // Animate background change every few seconds
  useEffect(() => {
    AOS.init({ duration: 1000 });

    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % gradientColors.length);
      controls.start({ background: gradientColors[(bgIndex + 1) % gradientColors.length] });
    }, 6000);

    return () => clearInterval(interval);
  }, [bgIndex, controls]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Check-in Successful!');
  };

  return (
    <motion.section
      animate={controls}
      initial={{ background: gradientColors[0] }}
      className="min-h-screen flex items-center justify-center py-16 px-4 md:px-8 transition-colors duration-1000"
      style={{
        backgroundSize: '400% 400%',
        backgroundRepeat: 'no-repeat',
        transition: 'background 2s ease-in-out',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full mx-auto bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/20"
        data-aos="zoom-in-up"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Online Web Check-In
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Complete your check-in before boarding to save time!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
            { id: 'bookingId', label: 'Booking ID', type: 'text', placeholder: 'Enter booking ID' },
            { id: 'cabinNumber', label: 'Cabin Number', type: 'text', placeholder: 'Enter your cabin number' },
            { id: 'travelDate', label: 'Travel Date', type: 'date', placeholder: '' },
          ].map((field, index) => (
            <motion.div
              key={field.id}
              className="flex flex-col"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <label htmlFor={field.id} className="mb-1 text-sm font-semibold text-gray-300">
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-cyan-400 
                           transition-all duration-300 
                           hover:bg-gray-700 hover:shadow-lg hover:shadow-cyan-500/30"
              />
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full mt-6 bg-cyan-600 text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-cyan-700 transition-all duration-300"
          >
            Check-In
          </motion.button>
        </form>
      </motion.div>
    </motion.section>
  );
};

export default WebCheckin;
