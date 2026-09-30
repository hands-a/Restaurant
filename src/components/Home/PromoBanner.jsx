import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import PageContainer from '../layout/PageContainer';


const PromoBanner = () => {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Full-bleed background food image */}
      <img
        src="/Molten Cake 1.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Rich dark warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/75 via-bg-deep/65 to-bg-deep/80" />
      {/* Amber gradient accent — top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <PageContainer className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          {/* Badge */}
          <span className="inline-block text-primary text-overline border border-primary/40 px-4 py-2 rounded-full bg-primary/10">
            Limited Time Offer
          </span>

          {/* Headline */}
          <h2 className="text-display-xl text-white">
            Get{' '}
            <span className="text-primary">50% OFF</span>
            <br />
            <em className="italic">Your First Order</em>
          </h2>

          {/* Offer code */}
          <p className="text-white/70 text-body-lg">
            Use code{' '}
            <span className="font-mono font-black text-white bg-white/10 border border-white/20 px-3 py-1 rounded-lg tracking-widest">
              TASTY50
            </span>{' '}
            at checkout. New customers only.
          </p>

          {/* CTA */}
          <Link to="/menu" className="inline-block focus:outline-none">
            <Button
              variant="primary"
              className="px-12 py-4 text-lg shadow-hero hover:shadow-button"
            >
              Order Now
            </Button>
          </Link>
        </motion.div>
      </PageContainer>

      {/* Bottom amber accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
};

export default PromoBanner;