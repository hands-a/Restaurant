import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaCreditCard, FaLock } from 'react-icons/fa';
import Button from '../components/Common/Button';

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const subtotal = getCartTotal();
  const deliveryFee = 25;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully! 🎉\nWe will call you shortly.");
    navigate('/');
  };

  if (cartItems.length === 0) {
    return <div className="pt-32 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-black text-gray-900 mb-8">Checkout</h2>

        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Delivery Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Full Name" className="input-field border border-gray-200 p-3 rounded-xl w-full outline-none focus:border-amber-500" />
                <input required type="tel" placeholder="Phone Number" className="input-field border border-gray-200 p-3 rounded-xl w-full outline-none focus:border-amber-500" />
                <input required type="text" placeholder="City / Area" className="input-field border border-gray-200 p-3 rounded-xl w-full outline-none focus:border-amber-500" />
                <input required type="text" placeholder="Street Name & Building" className="input-field border border-gray-200 p-3 rounded-xl w-full outline-none focus:border-amber-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Payment Method</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div 
                  onClick={() => setPaymentMethod('cash')}
                  className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                    paymentMethod === 'cash' ? 'border-amber-600 bg-amber-50' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <FaMoneyBillWave className="text-green-600 text-xl" />
                  <span className="font-bold text-gray-700">Cash on Delivery</span>
                </div>

                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                    paymentMethod === 'card' ? 'border-amber-600 bg-amber-50' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <FaCreditCard className="text-blue-600 text-xl" />
                  <span className="font-bold text-gray-700">Credit Card (Visa/Mastercard)</span>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 border-t border-gray-100 pt-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <FaLock /> Secure SSL Payment
                  </div>
                  <input required type="text" placeholder="Card Number" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-amber-500" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="MM / YY" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-amber-500" />
                    <input required type="text" placeholder="CVC" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-amber-500" />
                  </div>
                  <input required type="text" placeholder="Card Holder Name" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-amber-500" />
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-28">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4 max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.uniqueId} className="flex justify-between text-sm text-gray-600">
                    <span>{item.quantity}x {item.name}</span>
                    <span>{(item.price + (item.extras?.reduce((s,e)=>s+e.price,0)||0)) * item.quantity} EGP</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2 text-gray-700">
                <div className="flex justify-between"><span>Subtotal</span><span>{subtotal} EGP</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>{deliveryFee} EGP</span></div>
                <div className="flex justify-between font-black text-xl text-gray-900 mt-2 pt-2 border-t border-gray-100">
                  <span>Total</span><span>{total} EGP</span>
                </div>
              </div>
              <Button type="submit" className="w-full mt-6 py-4 text-lg">
                Place Order
              </Button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;