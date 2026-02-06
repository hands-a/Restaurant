import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
        
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-amber-500">RESTAURANTLY</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Serving the best food in town since 2026. We promise an experience, not just a meal.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                <FaFacebookF />
            </div>
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                <FaTwitter />
            </div>
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                <FaInstagram />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li><a href="/" className="hover:text-amber-500 transition-colors">Home</a></li>
            <li><a href="/menu" className="hover:text-amber-500 transition-colors">Our Menu</a></li>
            <li><a href="/delivery" className="hover:text-amber-500 transition-colors">Delivery</a></li>
            <li><a href="/contact" className="hover:text-amber-500 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-amber-500" />
              <span>123 Street, Cairo, Egypt</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-amber-500" />
              <span>+20 123 456 789</span>
            </li>
          </ul>
        </div>
      </div>
      
      <p className="text-center text-gray-600 text-sm mt-8">
        © 2026 Restaurantly. All rights reserved by Abdullah Sayed.
      </p>
    </footer>
  );
};

export default Footer;