import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const MenuCard = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(item, 1, []);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden group border border-gray-100 flex flex-col h-full"
    >
      <Link to={`/menu/${item.id}`} className="relative h-56 overflow-hidden block cursor-pointer">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold shadow-sm">
          <FaStar className="text-amber-500" />
          <span>{item.rating}</span>
        </div>
        {item.isNew && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            NEW
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/menu/${item.id}`}>
            <h3 className="font-bold text-gray-900 text-lg hover:text-amber-600 transition-colors line-clamp-1">
              {item.name}
            </h3>
          </Link>
          <span className="text-amber-600 font-black text-lg">{item.price} EGP</span>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">{item.description}</p>
        
        <button 
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-800 py-3 rounded-xl hover:bg-amber-600 hover:text-white transition-all font-bold active:scale-95"
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default MenuCard;