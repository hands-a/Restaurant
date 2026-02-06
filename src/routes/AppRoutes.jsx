import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Menu from '../pages/Menu';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Delivery from '../pages/Delivery';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Checkout from '../pages/Checkout'; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu/:id" element={<ProductDetails />} />
      
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} /> 
      
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      
      <Route path="*" element={
        <div className="h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
          <h1 className="text-9xl font-black text-amber-200">404</h1>
          <p className="text-2xl font-bold text-gray-800 mt-4">Oops! Page not found.</p>
          <p className="text-gray-500 mt-2 mb-8">The page you are looking for might have been removed or unavailable.</p>
          <a href="/" className="px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition shadow-lg">
            Back to Home
          </a>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;