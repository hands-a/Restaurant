import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';

const PromoBanner = () => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <span className="text-amber-500 font-bold tracking-widest uppercase mb-4 block">Special Offer</span>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
          Get <span className="text-amber-500">50% OFF</span> On Your First Order
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Use code <span className="bg-white/10 px-2 py-1 rounded text-white font-mono">TASTY50</span> at checkout. 
          Limited time offer for new customers only!
        </p>
        <Link to="/menu">
          <Button variant="primary" className="px-10 py-4 text-lg shadow-amber-500/20">
            Order Now
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PromoBanner;