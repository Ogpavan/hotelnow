import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#00264d] text-white py-4">
      <div className="max-w-5xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} HotelNow. All rights reserved.</p>
        <p className="text-sm">Your comfort is our priority.</p>
      </div>
    </footer>
  );
};

export default Footer;