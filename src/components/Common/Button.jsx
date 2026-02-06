import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  icon: Icon,
  ...props 
}) => {
    const baseStyles = "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-sm cursor-pointer border-2 select-none";
    
  const variants = {
    primary: "bg-amber-600 border-amber-600 text-white hover:bg-amber-700 hover:border-amber-700 shadow-amber-200 hover:shadow-lg",
    secondary: "bg-white border-gray-200 text-gray-700 hover:border-amber-600 hover:text-amber-600 hover:shadow-md",
    outline: "bg-transparent border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white",
    outlineWhite: "bg-transparent border-white text-white hover:bg-white hover:text-amber-600"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }} 
      whileTap={{ scale: 0.95 }}  
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {Icon && <Icon className="text-xl" />}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;