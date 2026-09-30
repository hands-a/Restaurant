import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';

const ProductActions = ({ handleAddToCart, totalPrice }) => {
  return (
    <div className="flex-1 w-full">
      <motion.button
        onClick={handleAddToCart}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-primary text-white shadow-button hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
        aria-label={`Add to order for ${totalPrice} EGP`}
      >
        <span className="flex items-center gap-3 text-button">
          <FaShoppingCart size={20} aria-hidden="true" />
          Add to Order
        </span>
        <div className="flex items-baseline gap-1.5 bg-black/20 px-4 py-1.5 rounded-xl">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={totalPrice}
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="text-heading-3"
            >
              {totalPrice}
            </motion.span>
          </AnimatePresence>
          <span className="text-overline text-white/80">EGP</span>
        </div>
      </motion.button>
    </div>
  );
};

export default ProductActions;
