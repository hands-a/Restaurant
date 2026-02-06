import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import PopularDishes from '../components/Home/PopularDishes';
import PromoBanner from '../components/Home/PromoBanner';
import Testimonials from '../components/Home/Testimonials';
import Footer from '../components/Common/Footer';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white"
    >
      
      <Hero />

      
      <Features />

      <PopularDishes />
      <PromoBanner />
      <Testimonials />
    </motion.div>
  );
};

export default Home;