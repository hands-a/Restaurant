import React from "react";
import { motion } from "framer-motion";
import PageContainer from "../layout/PageContainer";

const PhilosophyStatement = () => {
  return (
    <section className="relative py-24 md:py-36 bg-bg-deep overflow-hidden noise-overlay">
      {/* Decorative vertical lines */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <PageContainer className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-overline mb-8"
        >
          Our Philosophy
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-bold italic text-text-on-dark leading-[1.1] tracking-tight"
        >
          "Every dish is a conversation between{" "}
          <em className="not-italic text-primary">memory</em> and{" "}
          <em className="not-italic text-primary">imagination</em>."
        </motion.blockquote>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-24 h-px bg-primary mx-auto mt-10"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-text-on-dark-muted text-body-lg mt-8 max-w-xl mx-auto"
        >
          We believe food is more than nutrition. It is ritual, art, and belonging.
        </motion.p>
      </PageContainer>
    </section>
  );
};

export default PhilosophyStatement;
