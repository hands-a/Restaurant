import React from 'react';
import { motion } from 'framer-motion';
import { FaShippingFast, FaLeaf, FaHeadset } from 'react-icons/fa';

const Features = () => {
  const features = [
    { 
      icon: <FaShippingFast />, 
      title: "Fast Delivery", 
      text: "Within 30 minutes or it's free. We respect your hunger." 
    },
    { 
      icon: <FaLeaf />, 
      title: "Fresh Ingredients", 
      text: "Farm-to-table quality. No preservatives, just real food." 
    },
    { 
      icon: <FaHeadset />, 
      title: "24/7 Support", 
      text: "Our team is here to help you anytime, day or night." 
    },
  ];

  return (
    <section className="py-20 bg-white  ">
      <div className="container mx-auto px-4 ">
        <div className="grid md:grid-cols-3 gap-8 ">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center p-8   rounded-3xl hover:bg-gray-50 transition-colors border-1 border-transparent hover:border-gray-100"
            >
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;