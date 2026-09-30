import React from 'react';
import { motion } from 'framer-motion';
import FloatingElement from '../interactive/FloatingElement';

// CSS parallax fallback for mobile and reduced-motion
const SceneFallback = ({ imageUrl }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl">
      {/* Main food image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
      >
        <img
          src={imageUrl || '/Double Smash Burger 1.jpg'}
          alt="Premium culinary experience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/60 via-transparent to-transparent" />
      </motion.div>

      {/* Floating ambient orbs */}
      <FloatingElement speed="slow" delay={0} className="absolute top-8 right-8 w-16 h-16 rounded-full bg-primary/20 blur-xl pointer-events-none" />
      <FloatingElement speed="medium" delay={1.5} className="absolute bottom-12 left-8 w-10 h-10 rounded-full bg-primary/15 blur-lg pointer-events-none" />
      <FloatingElement speed="slow" delay={0.8} className="absolute top-1/2 right-4 w-8 h-8 rounded-full bg-yellow-400/10 blur-md pointer-events-none" />

      {/* Floating rating badge */}
      <FloatingElement speed="medium" delay={0.5} className="absolute top-6 left-6 z-10">
        <div className="bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
          <span className="text-yellow-400">★</span> 4.9
        </div>
      </FloatingElement>
    </div>
  );
};

export default SceneFallback;
