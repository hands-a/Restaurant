import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaHamburger } from 'react-icons/fa';

const About = () => {
  const teamMembers = [
    { name: 'Chef Ahmed Hassan', role: 'Executive Chef', image: 'https://plus.unsplash.com/premium_photo-1687697861242-03e99059e833?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Chef Maria Samir', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=500&q=80' },
    { name: 'Omar Khalid', role: 'Restaurant Manager', image: 'https://images.unsplash.com/photo-1697898109582-40f15c65f174?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            <span className="text-amber-600 font-bold tracking-wider uppercase">Our Story</span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">We Cook with <br/> Passion & Love</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Founded in 2015, Restaurantly started as a small family business in the heart of Cairo. 
              Our mission was simple: to serve authentic, high-quality food that brings people together. 
              Today, we are proud to be one of the most loved restaurant chains in Egypt.
            </p>
            
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <FaHamburger className="text-3xl text-amber-500 mx-auto mb-2" />
                <div className="font-bold text-2xl text-gray-900">50+</div>
                <div className="text-xs text-gray-500">Dishes</div>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <FaUsers className="text-3xl text-amber-500 mx-auto mb-2" />
                <div className="font-bold text-2xl text-gray-900">10k+</div>
                <div className="text-xs text-gray-500">Happy Clients</div>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                <FaAward className="text-3xl text-amber-500 mx-auto mb-2" />
                <div className="font-bold text-2xl text-gray-900">15</div>
                <div className="text-xs text-gray-500">Awards</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" 
              alt="Our Kitchen" 
              className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500"
            />
          </motion.div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Meet Our Chefs</h2>
          <p className="text-gray-500">The masterminds behind your delicious meals.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg group"
            >
              <div className="h-80 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-amber-600 font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;