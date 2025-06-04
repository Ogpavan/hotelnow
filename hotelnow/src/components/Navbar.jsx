import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-[#00264d]">
          HotelNow
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/hotels" className="text-gray-600 hover:text-blue-600">
            Hotels
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;