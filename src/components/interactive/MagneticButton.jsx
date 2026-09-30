import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING_CONFIG = { stiffness: 180, damping: 20, mass: 0.8 };
const MAX_DISTANCE = 80;
const MAX_SHIFT = 10;

const MagneticButton = ({ children, className = '', strength = 1 }) => {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX ** 2 + distY ** 2);

    if (distance < MAX_DISTANCE) {
      const pull = (MAX_DISTANCE - distance) / MAX_DISTANCE;
      rawX.set(distX * pull * (MAX_SHIFT / MAX_DISTANCE) * strength * 2);
      rawY.set(distY * pull * (MAX_SHIFT / MAX_DISTANCE) * strength * 2);
    } else {
      rawX.set(0);
      rawY.set(0);
    }
  }, [rawX, rawY, prefersReducedMotion, isTouch, strength]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  if (prefersReducedMotion || isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
