import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiOutlineX, HiOutlineShoppingBag } from 'react-icons/hi';
import { MdRestaurantMenu, MdDeliveryDining } from 'react-icons/md';
import { FaHome, FaInfoCircle, FaUtensils, FaPhoneAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/menu', label: 'Menu', icon: <FaUtensils /> },
    { path: '/delivery', label: 'Delivery', icon: <MdDeliveryDining /> },
    { path: '/about', label: 'About', icon: <FaInfoCircle /> },
    { path: '/contact', label: 'Contact', icon: <FaPhoneAlt /> },
  ];

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 bg-amber-600 rounded-xl text-white shadow-lg shadow-amber-200 group-hover:scale-105 transition-transform">
              <MdRestaurantMenu size={24} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tighter leading-none ${isScrolled ? 'text-gray-900' : 'text-amber-600'}`}>
                RESTAURANTLY
              </span>
              <span className={`text-[10px] font-bold tracking-widest uppercase ${isScrolled ? 'text-gray-400' : 'text-gray-500'}`}>
                Tasty & Fresh
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group py-2"
              >
                <span className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                  location.pathname === item.path 
                    ? 'text-amber-600' 
                    : (isScrolled ? 'text-gray-600 hover:text-amber-600' : 'text-gray-700 hover:text-amber-600')
                }`}>
                  {item.label}
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 transform origin-left transition-transform duration-300 ${
                  location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 group">
              <div className={`transition-colors ${isScrolled ? 'text-gray-800' : 'text-amber-800'}`}>
                <HiOutlineShoppingBag size={28} />
              </div>
              {cartItems.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                >
                  {cartItems.length}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-3xl text-amber-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <HiOutlineX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 w-full bg-white shadow-xl z-40 overflow-hidden lg:hidden border-t border-gray-100"
          >
            <div className="p-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    location.pathname === item.path 
                      ? 'bg-amber-50 text-amber-600 font-bold' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;