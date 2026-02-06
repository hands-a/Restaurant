import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeliveryDining, MdTimer, MdPayment } from 'react-icons/md';
import { FaMotorcycle, FaArrowRight } from 'react-icons/fa';
import Button from '../components/Common/Button';

const Delivery = () => {
  const deliveryZones = [
    { area: "Nasr City", time: "30-45 mins", fee: "20 EGP" },
    { area: "New Cairo (Tagamoa)", time: "45-60 mins", fee: "35 EGP" },
    { area: "Heliopolis", time: "30-40 mins", fee: "25 EGP" },
    { area: "Maadi", time: "50-60 mins", fee: "40 EGP" },
    { area: "Zamalek & Downtown", time: "45-55 mins", fee: "30 EGP" },
    { area: "Sheikh Zayed", time: "60+ mins", fee: "50 EGP" },
  ];

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        
        
        <div className="bg-gradient-to-r from-amber-600 to-orange-500 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl mb-16 relative overflow-hidden">
          <div className="z-10 max-w-xl space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black leading-tight">Delivery to Your Doorstep</h2>
            <p className="text-amber-100 text-lg">Order directly from us and get exclusive offers, or find us on your favorite delivery apps.</p>
            
            
            <Link to="/menu" className="inline-block">
              <Button variant="secondary">
                Order Now <FaArrowRight />
              </Button>
            </Link>
          </div>
    
          <FaMotorcycle className="text-[150px] text-white/10 absolute -bottom-4 -right-4 rotate-12" />
        </div>

        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: <MdTimer />, title: "30-60 Mins", desc: "Average delivery time based on your location." },
            { icon: <MdDeliveryDining />, title: "Free Delivery", desc: "On all orders above 300 EGP." },
            { icon: <MdPayment />, title: "Cash & Card", desc: "Pay online or cash on delivery (COD)." },
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl text-3xl">{item.icon}</div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Zones Table */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden max-w-4xl mx-auto">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h3 className="text-xl font-bold text-gray-900">Delivery Zones & Fees</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-5 font-medium">Area</th>
                  <th className="p-5 font-medium">Est. Time</th>
                  <th className="p-5 font-medium">Delivery Fee</th>
                </tr>
              </thead>
              <tbody>
                {deliveryZones.map((zone, i) => (
                  <tr key={i} className="hover:bg-amber-50/50 transition-colors border-b border-gray-50 last:border-0">
                    <td className="p-5 font-bold text-gray-800">{zone.area}</td>
                    <td className="p-5 text-gray-600">{zone.time}</td>
                    <td className="p-5 text-amber-600 font-bold">{zone.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Delivery;