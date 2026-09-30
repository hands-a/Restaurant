import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../../context/CartContext';

const CartButton = ({ isScrolled }) => {
  const { cartCount } = useCart();
  const count = cartCount || 0;

  return (
    <Link 
      to="/cart" 
      className="relative w-12 h-12 flex items-center justify-center rounded-full group focus:outline-none focus:ring-2 focus:ring-primary transition-colors" 
      aria-label="Cart"
      title="Cart"
    >
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`transition-colors flex items-center justify-center ${
          count > 0 
            ? 'text-primary' 
            : isScrolled 
              ? 'text-text-primary hover:text-primary' 
              : 'text-white/90 hover:text-primary'
        }`}
      >
        <FaShoppingCart size={24} />
      </motion.div>

      <AnimatePresence>
        {count > 0 && (
          <motion.span 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default CartButton;
