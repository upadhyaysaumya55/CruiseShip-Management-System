import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import maldivesImg from '../assets/maldives.jpg';
import dubaiImg from '../assets/dubai.jpg';
import goaImg from '../assets/goa.jpg';
import singaporeImg from '../assets/singapore.jpg';

// Gradients for background animation
const gradientColors = [
  'from-indigo-900 via-purple-900 to-black',
  'from-blue-900 via-cyan-800 to-black',
  'from-purple-800 via-pink-700 to-black',
  'from-gray-800 via-zinc-700 to-black',
];

const Destinations = () => {
  const [currentGradient, setCurrentGradient] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
      AOS.init({ duration: 1200, once: true });
  
      const interval = setInterval(() => {
        setCurrentGradient((prev) => (prev + 1) % gradientColors.length);
      }, 5000); // Change background every 5s
  
      return () => clearInterval(interval);
    }, []);

  const destinations = [
    {
      title: 'Maldives',
      image: maldivesImg,
      description: 'A tropical paradise with white sands and crystal waters.',
    },
    {
      title: 'Dubai',
      image: dubaiImg,
      description: 'Luxury cityscape mixed with beach resorts and desert tours.',
    },
    {
      title: 'Goa',
      image: goaImg,
      description: 'Indian coastal gem known for its beaches and nightlife.',
    },
    {
      title: 'Singapore',
      image: singaporeImg,
      description: 'A futuristic city with rich culture and greenery.',
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
        Popular Destinations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {destinations.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-105 hover:rotate-[1deg] hover:bg-blue-100 hover:bg-opacity-70 hover:shadow-xl hover:shadow-blue-300 border border-transparent hover:border-blue-400"
            data-aos="zoom-in"
            whileHover={{ rotateY: 5 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Destinations;
