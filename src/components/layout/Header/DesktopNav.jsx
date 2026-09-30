import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const DesktopNav = ({ navItems, isScrolled }) => {
  const location = useLocation();

  return (
    <nav className={`hidden lg:flex items-center gap-2 p-1.5 rounded-full border backdrop-blur-xl transition-all duration-500 ${
      isScrolled 
        ? 'bg-surface/90 border-border shadow-md' 
        : 'bg-black/20 border-white/10 shadow-lg'
    }`}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`relative px-5 py-2 rounded-full transition-colors duration-200 z-10 ${
              isActive 
                ? 'text-white' 
                : isScrolled 
                  ? 'text-text-secondary hover:text-text-primary' 
                  : 'text-white/80 hover:text-white'
            }`}
          >
            <span className="relative z-20 text-button">
              {item.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="navbar-active"
                className="absolute inset-0 bg-primary rounded-full z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
