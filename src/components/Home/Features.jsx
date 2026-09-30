import React from "react";
import { motion } from "framer-motion";
import { FaShippingFast, FaLeaf, FaHeadset } from "react-icons/fa";
import PageContainer from "../layout/PageContainer";

const features = [
  {
    num: "01",
    icon: FaShippingFast,
    title: "Fast Delivery",
    text: "Within 30 minutes or it's free. We respect your hunger.",
    stat: "< 30 min",
  },
  {
    num: "02",
    icon: FaLeaf,
    title: "Fresh Ingredients",
    text: "Farm-to-table quality. No preservatives, just real food.",
    stat: "100% Fresh",
  },
  {
    num: "03",
    icon: FaHeadset,
    title: "Always On Support",
    text: "Our team is here for you anytime, day or night.",
    stat: "24 / 7",
  },
];

const Features = () => {
  return (
    <section className="bg-bg-dark py-20 md:py-28 relative noise-overlay overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <PageContainer>
        <div className="mb-16">
          <p className="text-overline mb-4">Why Choose Us</p>
          <h2 className="text-heading-2 text-text-on-dark max-w-lg">
            The experience beyond the plate
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className="group relative px-8 py-10 first:pl-0 last:pr-0 hover:bg-white/[0.03] transition-colors duration-500"
            >
              <div className="flex items-start gap-6">
                <span className="text-[5rem] font-display font-black text-white/[0.04] leading-none select-none absolute top-6 right-6 group-hover:text-white/[0.07] transition-colors duration-500">
                  {feature.num}
                </span>
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all duration-400">
                  <feature.icon aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="text-overline mb-2">{feature.stat}</p>
                  <h3 className="text-text-on-dark font-display font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-text-on-dark-muted text-sm leading-relaxed">{feature.text}</p>
                </div>
              </div>
              <motion.div
                className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </PageContainer>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default Features;
