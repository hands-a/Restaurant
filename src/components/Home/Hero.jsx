import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaStar, FaArrowRight } from "react-icons/fa";
import Button from "../ui/Button";
import PageContainer from "../layout/PageContainer";
import MagneticButton from "../interactive/MagneticButton";
import FloatingElement from "../interactive/FloatingElement";
import PremiumPlateVisual from "../3d/PremiumPlateVisual";

const HERO_IMAGE = "/Double Smash Burger 1.jpg";

const statVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.7 + i * 0.12 } }),
};

const Hero = () => {
  const sectionRef = useRef(null);
  const mouseXRaw = useMotionValue(0);
  const mouseYRaw = useMotionValue(0);
  const bgX = useSpring(mouseXRaw, { stiffness: 30, damping: 25 });
  const bgY = useSpring(mouseYRaw, { stiffness: 30, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    mouseXRaw.set(nx);
    mouseYRaw.set(ny);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg-deep noise-overlay"
    >
      {/* Background image with subtle mouse parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: bgX, y: bgY, scale: 1.05 }}
      >
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-0 h-full w-full lg:w-[55%] object-cover object-center"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-bg-deep via-bg-deep/88 lg:via-bg-deep/72 to-bg-deep/20" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-bg-deep/80 via-transparent to-bg-deep/30" />

      {/* Ambient floating orbs */}
      <FloatingElement speed="slow" delay={0} className="absolute top-24 right-[22%] w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none z-[2] ambient-pulse" />
      <FloatingElement speed="medium" delay={2} className="absolute bottom-32 right-[38%] w-32 h-32 rounded-full bg-yellow-300/8 blur-2xl pointer-events-none z-[2]" />
      <FloatingElement speed="slow" delay={1} className="absolute top-1/3 left-[8%] w-28 h-28 rounded-full bg-primary/8 blur-2xl pointer-events-none z-[2]" />

      <PageContainer className="relative z-10 grid lg:grid-cols-2 gap-10 items-center py-28 pt-40">
        {/* Left: Editorial text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-8 text-center lg:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 text-overline"
          >
            <span className="w-8 h-px bg-primary" />
            Premium Food Experience
            <span className="w-8 h-px bg-primary" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-display-xl text-text-on-dark"
          >
            Food that makes<br />
            you{" "}
            <em className="not-italic text-primary">stop.</em>
            <br />
            And{" "}
            <em className="not-italic italic">stay.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-text-on-dark-muted text-body-lg max-w-md mx-auto lg:mx-0"
          >
            Hand-crafted dishes. Fresh ingredients. Delivered to your door in 30 minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <MagneticButton strength={1.2}>
              <Link to="/menu" className="focus:outline-none">
                <Button variant="primary" size="lg" icon={MdOutlineRestaurantMenu} className="w-full sm:w-auto shadow-hero">
                  Explore Menu
                </Button>
              </Link>
            </MagneticButton>
            <Link to="/about" className="focus:outline-none">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-button text-text-on-dark border-2 border-white/20 hover:border-primary hover:text-primary transition-all duration-300 w-full sm:w-auto hover:scale-105 active:scale-95">
                Our Story <FaArrowRight className="text-sm" />
              </button>
            </Link>
          </motion.div>

          <div className="flex items-center gap-8 justify-center lg:justify-start pt-2">
            {[
              { value: "10k+", label: "Happy Customers" },
              { value: "4.9", label: "Average Rating", icon: <FaStar className="text-yellow-400 text-xs" /> },
              { value: "30m", label: "Delivery Time" },
            ].map((stat, i) => (
              <motion.div key={stat.label} custom={i} initial="hidden" animate="show" variants={statVariants} className="text-center lg:text-left">
                <div className="flex items-center gap-1 justify-center lg:justify-start">
                  <span className="text-2xl font-black text-text-on-dark">{stat.value}</span>
                  {stat.icon}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-on-dark-muted">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Premium CSS/SVG animated plate (replaces broken Three.js) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden lg:flex h-[520px] items-center justify-center"
        >
          <PremiumPlateVisual mouseX={mouseXRaw} mouseY={mouseYRaw} />
        </motion.div>
      </PageContainer>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10 hidden md:flex"
      >
        <span className="text-text-on-dark-muted text-xs font-bold uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-primary to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
