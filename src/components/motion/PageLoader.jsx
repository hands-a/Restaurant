import React from 'react';
import { motion } from 'framer-motion';
import FloatingElement from '../interactive/FloatingElement';

const PageLoader = () => {
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-bg-deep relative overflow-hidden noise-overlay">
      {/* Ambient backgrounds */}
      <FloatingElement speed="slow" className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <FloatingElement speed="medium" delay={2} className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="relative z-10 w-24 h-24 mb-8"
        aria-hidden="true"
      >
        <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Animated plate */}
          <circle cx="48" cy="56" r="32" stroke="#d97706" strokeWidth="2" strokeOpacity="0.6" />
          <circle cx="48" cy="56" r="22" stroke="#d97706" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="48" cy="56" r="10" fill="#d97706" fillOpacity="0.12" stroke="#d97706" strokeWidth="1" strokeOpacity="0.5" />
          
          {/* Steam animations */}
          <motion.path 
            d="M36 30C36 20 40 18 40 12" 
            stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7"
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
          <motion.path 
            d="M48 30C48 20 52 18 52 12" 
            stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7"
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "linear" }}
          />
          <motion.path 
            d="M60 30C60 20 56 18 56 12" 
            stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7"
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1, ease: "linear" }}
          />
        </svg>
      </motion.div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-primary font-display text-xl tracking-wider font-medium z-10"
      >
        Preparing your experience...
      </motion.p>
    </div>
  );
};

export default PageLoader;
