import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const gradientVariants = {
  animate: {
    background: [
      "linear-gradient(to right, #e0f7fa, #e1f5fe)",
      "linear-gradient(to right, #fce4ec, #f8bbd0)",
      "linear-gradient(to right, #ede7f6, #d1c4e9)",
      "linear-gradient(to right, #f3e5f5, #ce93d8)",
      "linear-gradient(to right, #f1f8e9, #dcedc8)",
    ],
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const Offers = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const dummyOffers = [
    {
      title: "20% Off Resort Booking",
      desc: "Enjoy a luxury stay with 20% discount.",
      bg: "/offers/resort.jpg",
    },
    {
      title: "Buy 1 Get 1 Movie Ticket",
      desc: "Limited time movie ticket offer for voyagers.",
      bg: "/offers/movie.jpg",
    },
    {
      title: "Spa & Salon Combo",
      desc: "Relax with our exclusive spa + salon package.",
      bg: "/offers/spa.jpg",
    },
    {
      title: "Fitness Membership",
      desc: "Get 1-month free with a 6-month plan.",
      bg: "/offers/fitness.jpg",
    },
    {
      title: "Party Hall Discount",
      desc: "Flat 25% off for early bookings.",
      bg: "/offers/party.jpg",
    },
  ];

  return (
    <motion.div
      variants={gradientVariants}
      animate="animate"
      className="py-16 px-4 min-h-screen transition-all duration-1000"
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-3">Our Best Offers</h1>
        <p className="text-gray-700 text-lg">Unlock amazing experiences on your voyage</p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
        {dummyOffers.map((offer, index) => (
          <motion.div
            key={index}
            data-aos="flip-up"
            whileHover={{ rotateY: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-500/60 group transition-shadow duration-500 border border-transparent hover:border-blue-500"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-75 group-hover:brightness-60 transition-all duration-500"
              style={{ backgroundImage: `url(${offer.bg})` }}
            ></div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-blue-300/20 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none blur-sm" />

            {/* Content Overlay */}
            <div className="relative z-10 p-6 flex flex-col justify-end h-64 text-white bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform">{offer.title}</h3>
              <p className="text-sm opacity-90">{offer.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Offers;
