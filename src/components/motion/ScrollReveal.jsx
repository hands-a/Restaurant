import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const variants = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  'scale': {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  'clip-reveal': {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
};

export const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.7,
  mode = 'fade-up',
  className = '',
  once = true,
}) => {
  const chosen = variants[mode] || variants['fade-up'];
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      variants={chosen}
      transition={{
        duration,
        delay,
        ease: mode === 'clip-reveal'
          ? [0.25, 0.46, 0.45, 0.94]
          : [0.25, 0.1, 0.25, 1],
      }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};

export const FloatingElement = ({ children, className, delay = 0, yOffset = 15, duration = 4 }) => {
  return (
    <motion.div
      animate={{ y: [0, -yOffset, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
