import React, { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center justify-between px-6 py-4 font-poppins">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 to-blue-500"></div>
          <span className="text-xl font-bold text-gray-800">hotelnow</span>
        </div>

        {/* Center Navigation Items */}
        <div className="flex space-x-10 text-gray-600 font-medium mx-auto">
          <div className="flex items-center space-x-1 text-blue-600 cursor-pointer">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
            <span>Discover</span>
          </div>
          <div
            onClick={() => setSearchOpen(true)}
            className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer"
          >
            <FiSearch className="w-5 h-5" />
            <span>Search</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 1a11 11 0 000 22 11 11 0 000-22zm0 4v6l4 2" />
            </svg>
            <span>Contact Us</span>
          </div>
        </div>

        {/* Book Now Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
          Book Now
        </button>
      </nav>

      {/* Mobile Navbar */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden font-poppins">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 to-blue-500"></div>
          <span className="text-lg font-bold text-gray-800">hotelnow</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setSearchOpen(true)}>
            <FiSearch className="w-6 h-6 text-gray-700" />
          </button>
          <button onClick={() => setMenuOpen(true)}>
            <FiMenu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm px-4 pt-20 flex flex-col items-center"
          >
            <div className="w-full max-w-xl bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
              <FiSearch className="w-6 h-6 text-blue-600" />
              <input
                type="text"
                placeholder="Search for hotels, cities..."
                className="w-full outline-none text-gray-800 text-lg placeholder-gray-500"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg p-6 flex flex-col space-y-6 font-poppins"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-800">Menu</span>
              <FiX
                className="w-6 h-6 text-gray-600 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            </div>
            <div className="flex flex-col space-y-4 text-gray-700 font-medium">
              <button className="text-left">Discover</button>
              <button
                onClick={() => {
                  setSearchOpen(true);
                  setMenuOpen(false);
                }}
                className="text-left"
              >
                Search
              </button>
              <button className="text-left">Contact Us</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition w-full text-center">
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
