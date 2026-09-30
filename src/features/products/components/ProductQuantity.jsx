import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const ProductQuantity = ({ quantity, setQuantity }) => {
  return (
    <div className="flex items-center justify-between gap-4 bg-surface rounded-2xl p-2 w-full sm:w-auto sm:min-w-[140px] border-2 border-border-strong">
      <button 
        onClick={() => setQuantity(Math.max(1, quantity - 1))} 
        className="w-12 h-12 flex items-center justify-center bg-surface-sunken rounded-xl text-text-secondary hover:bg-surface-elevated hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
      >
        <FaMinus size={14} aria-hidden="true" />
      </button>
      
      <span className="text-heading-2 w-8 text-center text-text-primary" aria-live="polite">
        {quantity}
      </span>
      
      <button 
        onClick={() => setQuantity(quantity + 1)} 
        className="w-12 h-12 flex items-center justify-center bg-surface-sunken rounded-xl text-text-secondary hover:bg-surface-elevated hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Increase quantity"
      >
        <FaPlus size={14} aria-hidden="true" />
      </button>
    </div>
  );
};

export default ProductQuantity;
