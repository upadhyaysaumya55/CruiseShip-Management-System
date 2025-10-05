import React from 'react';
import { FaClipboardList, FaBoxes, FaUserShield } from 'react-icons/fa';
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
  hover: {
    scale: 1.05,
    rotateY: 5,
    transition: { type: 'spring', stiffness: 200 },
  },
};

const SupervisorDashboard = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      icon: <FaClipboardList className="text-5xl text-indigo-600 mb-4" />,
      title: 'Stationery Orders',
      desc: 'View all stationery requests from voyagers.',
      path: '/supervisor/stationery',
      color: 'bg-indigo-100',
    },
    {
      icon: <FaBoxes className="text-5xl text-orange-500 mb-4" />,
      title: 'Delivery Dispatch',
      desc: 'Approve and dispatch items to respective departments.',
      path: '/supervisor/dispatch',
      color: 'bg-orange-100',
    },
    {
      icon: <FaUserShield className="text-5xl text-green-600 mb-4" />,
      title: 'Supervise Inventory',
      desc: 'Inspect and audit inventory records and supply logs.',
      path: '/supervisor/inventory',
      color: 'bg-green-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome, Supervisor
        </motion.h1>
        <p className="text-gray-700 text-lg">
          Monitor and manage all stationery and logistics requests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
            className={`p-6 rounded-2xl shadow-lg cursor-pointer ${card.color} flex flex-col items-center text-center`}
            onClick={() => navigate(card.path)}
          >
            {card.icon}
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600 mb-4">{card.desc}</p>
            <button className="px-5 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition duration-300">
              Go
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SupervisorDashboard;
