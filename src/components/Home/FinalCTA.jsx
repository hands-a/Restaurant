import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageContainer from "../layout/PageContainer";
import Button from "../ui/Button";
import MagneticButton from "../interactive/MagneticButton";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const FinalCTA = () => {
  return (
    <section className="relative py-32 md:py-44 bg-bg-deep overflow-hidden noise-overlay">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="text-[18vw] font-display font-black text-white/[0.022] leading-none tracking-tighter whitespace-nowrap">
          RESTAURANTLY
        </span>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 blur-[80px] rounded-full pointer-events-none" />
      <PageContainer className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-overline mb-6"
        >
          Reserve Your Experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-display-lg text-text-on-dark mb-6"
        >
          Your table is{" "}
          <em className="italic text-primary">waiting.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-body-lg text-text-on-dark-muted mb-12 max-w-xl mx-auto"
        >
          Join thousands of food lovers who trust Restaurantly for an exceptional culinary experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton>
            <Link to="/menu">
              <Button variant="primary" size="lg" icon={MdOutlineRestaurantMenu} className="shadow-hero">
                Order Now
              </Button>
            </Link>
          </MagneticButton>
          <Link to="/contact">
            <Button variant="outline" size="lg" icon={FaPhoneAlt} className="border-white/30 text-white hover:border-primary hover:text-primary">
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </PageContainer>
    </section>
  );
};

export default FinalCTA;
