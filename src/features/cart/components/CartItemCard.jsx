import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import Card from '../../../components/ui/Card';

const CartItemCard = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50, height: 0, marginBottom: 0, transition: { duration: 0.2 } }}
    >
      <Card 
        variant="default"
        padding="none"
        className="flex flex-col sm:flex-row items-stretch overflow-hidden border border-border-strong/50 shadow-sm"
      >
        <div className="w-full sm:w-40 sm:h-40 overflow-hidden relative">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-heading-2 mb-1 text-text-primary">{item.name}</h3>
              {item.selectedSize && (
                <span className="inline-block px-2 py-1 bg-surface-sunken text-text-secondary text-overline rounded-md mb-2">
                  Size: {item.selectedSize}
                </span>
              )}
              {item.extras && item.extras.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.extras.map(e => (
                    <span key={e.name} className="text-caption text-text-secondary bg-surface-sunken px-2 py-1 rounded-full border border-border-strong/50">
                      + {e.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => removeFromCart(item.uniqueId)} 
              aria-label="Remove item" 
              className="text-text-muted hover:text-error p-2 rounded-full hover:bg-error/10 transition-colors"
            >
              <FaTrash aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-end justify-between mt-6">
            <div className="flex flex-col">
              <span className="text-body-sm text-text-secondary mb-1">Item Total</span>
              <span className="text-primary text-heading-3">
                {(item.price + (item.extras?.reduce((s,e)=>s+e.price,0) || 0)) * item.quantity} EGP
              </span>
            </div>

            <div className="flex items-center gap-4 bg-surface-sunken rounded-full p-1 border border-border-strong/50">
              <button 
                onClick={() => updateQuantity(item.uniqueId, -1)} 
                aria-label="Decrease quantity" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface shadow-sm hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <FaMinus />
              </button>
              <span className="text-heading-3 w-6 text-center text-text-primary">
                {item.quantity}
              </span>
              <button 
                onClick={() => updateQuantity(item.uniqueId, 1)} 
                aria-label="Increase quantity" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface shadow-sm hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CartItemCard;
