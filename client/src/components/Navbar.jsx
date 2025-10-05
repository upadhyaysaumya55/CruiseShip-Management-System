import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPagesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav
      className="bg-gray-900 shadow-md sticky top-0 z-50"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent tracking-wider hover:scale-110 transition-transform duration-300"
            data-aos="fade-right"
          >
            CruiseMate✨
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 items-center text-white font-medium">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition duration-200">
                Home
              </Link>
            </li>

            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsPagesOpen(!isPagesOpen)}
                className="hover:text-yellow-400 transition duration-200 flex items-center gap-1"
              >
                Pages ▾
              </button>

              <AnimatePresence>
                {isPagesOpen && (
                  <motion.ul
                    className="absolute bg-gray-800 text-white shadow-xl rounded-md mt-2 py-2 w-56 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {[
                      { path: '/login', label: 'Login' },
                      { path: '/create-account', label: 'Create Account' },
                      { path: '/admin', label: 'Admin Dashboard' },
                      { path: '/voyager', label: 'Voyager Dashboard' },
                      { path: '/head_cook', label: 'Head Cook Dashboard' },
                      { path: '/manager', label: 'Manager Dashboard' },
                      { path: '/supervisor', label: 'Supervisor Dashboard' },
                    ].map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className="block px-4 py-2 hover:bg-yellow-500 hover:text-black transition-all duration-200"
                          onClick={() => setIsPagesOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Link to="/offers" className="hover:text-yellow-400 transition duration-200">
                Offers
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-yellow-400 transition duration-200">
                Events
              </Link>
            </li>
            <li>
              <Link to="/destinations" className="hover:text-yellow-400 transition duration-200">
                Destinations
              </Link>
            </li>
            <li>
              <Link to="/web-checkin" className="hover:text-yellow-400 transition duration-200">
                Web Check-in
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-yellow-400 transition duration-200">
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-yellow-400 text-3xl focus:outline-none hover:scale-110 transition-transform"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-800 text-white shadow-md px-4 py-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/"
                  className="block hover:text-yellow-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              <li>
                <button
                  onClick={() => setIsPagesOpen(!isPagesOpen)}
                  className="w-full text-left hover:text-yellow-400"
                >
                  Pages ▾
                </button>
                {isPagesOpen && (
                  <ul className="mt-2 space-y-2 pl-4 text-sm">
                    {[
                      { path: '/login', label: 'Login' },
                      { path: '/create-account', label: 'Create Account' },
                      { path: '/admin', label: 'Admin Dashboard' },
                      { path: '/voyager', label: 'Voyager Dashboard' },
                      { path: '/head_cook', label: 'Head Cook Dashboard' },
                      { path: '/manager', label: 'Manager Dashboard' },
                      { path: '/supervisor', label: 'Supervisor Dashboard' },
                    ].map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className="block hover:text-yellow-300"
                          onClick={() => {
                            setIsPagesOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <Link
                  to="/offers"
                  className="block hover:text-yellow-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Offers
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="block hover:text-yellow-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/destinations"
                  className="block hover:text-yellow-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/web-checkin"
                  className="block hover:text-yellow-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Web Check-in
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block hover:text-yellow-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
