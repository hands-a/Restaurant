import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';

const Testimonials = () => {
  const reviews = [
    { 
      id: 1, 
      name: "Rana ", 
      role: "Teacher", 
      text: "Honestly, this is the juiciest burger I've tasted in Cairo. The truffle sauce is out of this world! The service was incredibly fast too.", 
      rating: 5,
    },
    { 
      id: 2, 
      name: "Abdullah Sayed", 
      role: "Verified Buyer", 
      text: "The pizza arrived hot and the crust was perfectly crispy. Definitely ordering this again for movie night with the family.", 
      rating: 5,
    },
    { 
      id: 3, 
      name: "Hamza Nour", 
      role: "Chef", 
      text: "As a chef, I appreciate the quality of ingredients. The dessert is balanced, not too sweet, just perfect. Highly recommended.", 
      rating: 4.5,
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-20 left-10 text-9xl text-amber-500">"</div>
         <div className="absolute bottom-20 right-10 text-9xl text-amber-500 rotate-180">"</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900">Loved by Thousands</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            See what our customers are saying about our food and service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="h-full"
            >
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col relative group hover:-translate-y-2">
                
                <FaQuoteLeft className="text-4xl text-amber-100 mb-6 group-hover:text-amber-200 transition-colors" />
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(review.rating) ? "text-amber-400" : "text-gray-200"} />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 mb-8 italic text-lg leading-relaxed flex-1">
                  "{review.text}"
                </p>

                
                <div className="flex items-center gap-4 border-t border-gray-50 pt-6 mt-auto">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center font-bold text-amber-600 text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                      {review.name} 
                      {review.role === "Verified Buyer" && <FaCheckCircle className="text-green-500 text-sm" title="Verified" />}
                    </h4>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">{review.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Testimonials;