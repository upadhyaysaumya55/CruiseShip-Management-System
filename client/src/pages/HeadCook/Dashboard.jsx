import React from 'react';
import { FaUtensils, FaConciergeBell, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateY: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      delay: i * 0.2,
      type: 'spring',
      stiffness: 100,
    },
  }),
};

const HeadCookDashboard = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      icon: <FaUtensils className="text-5xl text-red-600 mb-4" />,
      title: 'View Menu',
      desc: 'Check all available food items and update meals.',
      path: '/head_cook/menu',
    },
    {
      icon: <FaConciergeBell className="text-5xl text-green-600 mb-4" />,
      title: 'Catering Orders',
      desc: 'Manage catering bookings and status.',
      path: '/head_cook/catering',
    },
    {
      icon: <FaClipboardList className="text-5xl text-blue-600 mb-4" />,
      title: 'Kitchen Logs',
      desc: 'Track cooking logs and kitchen activities.',
      path: '/head_cook/logs',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 py-10 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, Head Cook</h1>
        <p className="text-lg text-gray-600">
          Manage catering items and monitor kitchen-related bookings.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05, rotateY: 5, boxShadow: '0 15px 25px rgba(0,0,0,0.2)' }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center cursor-pointer transform transition duration-300 hover:-translate-y-1"
            onClick={() => navigate(card.path)}
          >
            {card.icon}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-600 mb-4">{card.desc}</p>
            <button
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
              onClick={(e) => {
                e.stopPropagation();
                navigate(card.path);
              }}
            >
              Go
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeadCookDashboard;
