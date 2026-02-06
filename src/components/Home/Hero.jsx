import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineRestaurantMenu, MdDeliveryDining } from 'react-icons/md';
import Button from '../Common/Button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-amber-50 to-white pt-20 overflow-hidden relative">
      
      <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-100/50 skew-x-12 translate-x-20 z-0"></div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-center lg:text-left"
        >
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold tracking-wide mb-2">
            Hungry? We got you.
          </span>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
            Enjoy <span className="text-amber-600">Delicious</span> Food in Your Hand
          </h1>
          <p className="text-gray-600 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Experience the authentic taste of our special dishes delivered hot and fresh to your doorstep in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/menu">
              <Button variant="primary" icon={MdOutlineRestaurantMenu}>Order Now</Button>
            </Link>
            <Link to="/delivery">
              <Button variant="secondary" icon={MdDeliveryDining}>View Delivery Areas</Button>
            </Link>
          </div>
          
          <div className="pt-8 flex items-center gap-8 justify-center lg:justify-start text-gray-500">
            <div>
              <span className="block text-3xl font-bold text-gray-900">10k+</span>
              <span className="text-xs">Happy Customers</span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-gray-900">50+</span>
              <span className="text-xs">Menu Items</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
            <div className="relative z-10 w-full max-w-md mx-auto aspect-square rounded-full bg-amber-500 p-2 shadow-2xl animate-float">
            <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Delicious Dish" 
                className="w-full h-full object-cover rounded-full border-4 border-white"
            />
            </div>
            <div className="absolute top-10 right-0 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow z-20">
            <div>
            </div>
            </div>
        </motion.div>
        </div>
    </section>
    );
};

export default Hero;