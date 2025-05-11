import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" mt-20  py-10 px-4  ">
      <div className="max-w-5xl flex      justify-between mx-auto flex-wrap gap-10 p-4">
        {/* About Section */}
        <div>
          <h3 className="text-lg poppins-semibold mb-4">About Us</h3>
          <ul className="space-y-2 text-sm  ">
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Franchise</a>
            </li>
            <li>
              <a href="#">Corporate Enquiries</a>
            </li>
          </ul>
        </div>

        {/* Policies Section */}
        <div>
          <h3 className="text-lg poppins-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-sm  ">
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Cancellation Policy</a>
            </li>
          </ul>
        </div>

        {/* Top Cities Section */}
        <div>
          <h3 className="text-lg poppins-semibold mb-4">Top Cities</h3>
          <ul className="space-y-2 text-sm  ">
            <li>
              <a href="#">Mumbai</a>
            </li>
            <li>
              <a href="#">Delhi</a>
            </li>
            <li>
              <a href="#">Bangalore</a>
            </li>
            <li>
              <a href="#">Hyderabad</a>
            </li>
            <li>
              <a href="#">Chennai</a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Section */}
        <div>
          <h3 className="text-lg poppins-semibold mb-4">Contact Us</h3>
          <p className="text-sm   mb-4">Call us: +91-70-4242-4242</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="   ">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="   ">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="   ">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="YouTube" className="   ">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} HotelNow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
