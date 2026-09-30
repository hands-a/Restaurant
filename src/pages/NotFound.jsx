import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import Button from '../components/ui/Button';
import PageTransition from '../components/motion/PageTransition';

const NotFound = () => {
  return (
    <PageTransition className="min-h-[100dvh] flex items-center justify-center bg-surface px-4 py-24">
      <div className="max-w-2xl text-center space-y-8">
        <motion.h1 
          className="text-[120px] md:text-[180px] font-black leading-none text-primary/10 tracking-tighter"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          404
        </motion.h1>
        
        <div className="space-y-4">
          <h2 className="text-display-md text-text-primary">Page Not Found</h2>
          <p className="text-body-lg text-text-secondary max-w-md mx-auto">
            The page you're looking for seems to have gone off the menu. Let's get you back to our culinary offerings.
          </p>
        </div>
        
        <Link to="/" className="inline-block pt-4">
          <Button variant="primary" className="!px-8 !py-4 shadow-button">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Button>
        </Link>
      </div>
    </PageTransition>
  );
};

export default NotFound;
