import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaArrowRight, FaLongArrowAltLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';
import { useCart } from '../context/CartContext'; 

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();
  const subtotal = getCartTotal();
  const deliveryFee = 25; 
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty </h2>
        <p className="text-gray-500 mb-8">Looks like you haven't made your choice yet.</p>
        <Link to="/menu">
          <Button variant="primary">Browse Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <Link to="/menu" className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-600 mb-8 font-medium">
           <FaLongArrowAltLeft /> Continue Shopping
        </Link>
        <h2 className="text-3xl font-black text-gray-900 mb-8">Your Order</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                key={item.uniqueId}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-4"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  {item.extras && item.extras.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      + {item.extras.map(e => e.name).join(', ')}
                    </p>
                  )}
                  <p className="text-amber-600 font-bold mt-2">
                    {(item.price + (item.extras?.reduce((s,e)=>s+e.price,0) || 0)) * item.quantity} EGP
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-2">
                  <button onClick={() => updateQuantity(item.uniqueId, -1)} className="w-8 h-8 bg-white rounded shadow-sm hover:text-amber-600 font-bold">-</button>
                  <span className="font-bold w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.uniqueId, 1)} className="w-8 h-8 bg-white rounded shadow-sm hover:text-amber-600 font-bold">+</button>
                </div>

                <button onClick={() => removeFromCart(item.uniqueId)} className="text-gray-400 hover:text-red-500 p-2 transition-colors">
                  <FaTrash />
                </button>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-28">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">{subtotal} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-gray-900">{deliveryFee} EGP</span>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between text-lg font-black text-gray-900">
                  <span>Total</span>
                  <span className="text-amber-600">{total} EGP</span>
                </div>
              </div>

              <Button 
                onClick={() => navigate('/checkout')}
                className="w-full flex justify-between items-center group"
              >
                <span>Proceed to Checkout</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;