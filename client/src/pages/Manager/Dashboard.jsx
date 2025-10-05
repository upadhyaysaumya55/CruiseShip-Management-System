import React from 'react';
import { FaUserTie, FaClipboardCheck, FaHotel } from 'react-icons/fa';
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
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 0.4,
      type: 'spring',
      stiffness: 200,
    },
  },
};

const ManagerDashboard = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      icon: <FaClipboardCheck className="text-5xl text-blue-600 mb-4" />,
      title: 'Manage Bookings',
      desc: 'View and manage all guest bookings in one place.',
      path: '/manager/bookings',
      buttonText: 'Go to Bookings',
    },
    {
      icon: <FaUserTie className="text-5xl text-blue-600 mb-4" />,
      title: 'Manage Staff',
      desc: 'View and update staff details and assignments.',
      path: '/manager/staff',
      buttonText: 'View Staff',
    },
    {
      icon: <FaHotel className="text-5xl text-blue-600 mb-4" />,
      title: 'Resort Availability',
      desc: 'Track available rooms and resort inventory.',
      path: '/manager/resorts',
      buttonText: 'Check Availability',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.h1
          className="text-4xl font-bold text-blue-900"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome, Manager
        </motion.h1>
        <p className="text-gray-700 mt-2">
          Oversee bookings, staff, and resort availability efficiently.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            onClick={() => navigate(card.path)}
          >
            {card.icon}
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600 mb-4">{card.desc}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent double navigation
                navigate(card.path);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              {card.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;
