import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * PremiumPlateVisual — A fully CSS/SVG animated "plate" visual.
 * Replaces the Three.js Canvas that was crashing WebGL contexts
 * and causing THREE.Clock deprecation warnings.
 * Zero dependencies beyond Framer Motion (already bundled).
 */
const PremiumPlateVisual = ({ mouseX, mouseY }) => {
  // Smooth spring transforms for mouse parallax
  const rotX = useSpring(useTransform(mouseY, [-1, 1], [8, -8]), { stiffness: 60, damping: 18 });
  const rotY = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), { stiffness: 60, damping: 18 });

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px]"
      >
        {/* ── Outer glow ring ── */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
        />

        {/* ── Plate base ── */}
        <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-[#fdfbf7] via-[#f4efe9] to-[#e8e1d7] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.8)]" />

        {/* ── Inner plate rim ── */}
        <div className="absolute inset-[18%] rounded-full border-2 border-[#e0d8cc]/60" />
        <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-[#fdfbf7] to-[#ede8e0] shadow-inner" />

        {/* ── Amber glowing orb (food metaphor) ── */}
        <motion.div
          animate={{ y: [0, -10, 0], scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          className="absolute inset-[36%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #fbbf24, #d97706, #92400e)',
            boxShadow: '0 0 40px 8px rgba(217,119,6,0.5), 0 8px 24px rgba(0,0,0,0.3)',
          }}
        />

        {/* ── Orbiting particles ── */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6 + i * 1.2, ease: 'linear' }}
            className="absolute inset-0"
            style={{ transformOrigin: '50% 50%', rotate: deg }}
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.4, ease: 'easeInOut', delay: i * 0.3 }}
              className="absolute rounded-full bg-primary"
              style={{
                width: i % 2 === 0 ? 5 : 4,
                height: i % 2 === 0 ? 5 : 4,
                top: '4%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          </motion.div>
        ))}

        {/* ── Floating stats badge (top-left) ── */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="absolute -top-4 -left-4 md:-left-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 py-2 shadow-xl"
          style={{ transform: 'translateZ(30px)' }}
        >
          <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Rating</p>
          <p className="text-xl font-black text-white flex items-center gap-1">
            <span className="text-yellow-400">★</span> 4.9
          </p>
        </motion.div>

        {/* ── Floating prep badge (bottom-right) ── */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.8 }}
          className="absolute -bottom-4 -right-4 md:-right-8 bg-primary/90 backdrop-blur-md rounded-2xl px-3 py-2 shadow-xl"
          style={{ transform: 'translateZ(40px)' }}
        >
          <p className="text-xs font-bold text-white/70 uppercase tracking-wider">Ready in</p>
          <p className="text-lg font-black text-white">30 min</p>
        </motion.div>

        {/* ── Second ring decoration ── */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="absolute inset-[5%] rounded-full border border-primary/20 border-dashed"
        />
      </motion.div>
    </motion.div>
  );
};

export default PremiumPlateVisual;
