import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxImage = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  intensity = 60,
  children,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-intensity, intensity]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div ref={ref} className={`relative overflow-hidden ${containerClassName}`}>
      <motion.div
        style={prefersReducedMotion ? {} : { y }}
        className="absolute inset-0 scale-110"
      >
        {src ? (
          <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} />
        ) : (
          children
        )}
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
