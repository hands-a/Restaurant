import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useFavorites } from '../../../context/FavoritesContext';

const FavoritesButton = ({ isScrolled }) => {
  const { favorites } = useFavorites();
  const count = favorites.length;

  return (
    <Link 
      to="/favorites" 
      className="relative w-12 h-12 flex items-center justify-center rounded-full group focus:outline-none focus:ring-2 focus:ring-primary transition-colors" 
      aria-label="Favorites"
      title="Favorites"
    >
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`transition-colors flex items-center justify-center ${
          count > 0 
            ? 'text-error' 
            : isScrolled 
              ? 'text-text-primary group-hover:text-error' 
              : 'text-white/90 group-hover:text-error'
        }`}
      >
        {count > 0 ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
      </motion.div>

      <AnimatePresence>
        {count > 0 && (
          <motion.span 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 bg-error text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default FavoritesButton;
