import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

import event1 from '../assets/event1.jpg';
import event2 from '../assets/event2.jpg';
import event3 from '../assets/event3.jpg';
import event4 from '../assets/event4.jpg';

const gradientColors = [
  'from-indigo-900 via-purple-900 to-black',
  'from-blue-900 via-cyan-800 to-black',
  'from-purple-800 via-pink-700 to-black',
  'from-gray-800 via-zinc-700 to-black',
];

const Events = () => {
  const [currentGradient, setCurrentGradient] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });

    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradientColors.length);
    }, 5000); // Change background every 5s

    return () => clearInterval(interval);
  }, []);

  const events = [
    {
      title: 'Sunset Cruise Party',
      image: event1,
      description: 'Enjoy a beautiful sunset party with live music, snacks, and ocean views.',
    },
    {
      title: 'Cultural Night',
      image: event2,
      description: 'Experience cultural performances and traditional cuisines onboard.',
    },
    {
      title: 'Live DJ Night',
      image: event3,
      description: 'Dance the night away with our live DJ spinning your favorite tracks.',
    },
    {
      title: 'Wine Tasting',
      image: event4,
      description: 'Sample the best wines while enjoying scenic views of the open sea.',
    },
  ];

  return (
    <motion.section
      className={`transition-all duration-[3000ms] ease-in-out min-h-screen text-white relative overflow-hidden py-20 px-4 bg-gradient-to-br ${gradientColors[currentGradient]}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Floating blurred glow effect */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-ping"></div>

      <h2
        className="text-5xl font-extrabold text-center mb-16 text-white drop-shadow-lg"
        data-aos="fade-down"
      >
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto relative z-10">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-gray-200 border-opacity-20 transform transition duration-300 hover:scale-105 hover:bg-purple-900 hover:bg-opacity-20 hover:shadow-2xl"
            data-aos="zoom-in-up"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded-t-3xl"
            />
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-semibold text-purple-300">{event.title}</h3>
              <p className="text-sm text-gray-200">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Events;
