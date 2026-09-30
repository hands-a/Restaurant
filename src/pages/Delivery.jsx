import React from "react";
import { Link } from "react-router-dom";
import { MdDeliveryDining, MdTimer, MdPayment } from "react-icons/md";
import { FaMotorcycle, FaArrowRight, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import PageContainer from "../components/layout/PageContainer";
import PageTransition from "../components/motion/PageTransition";
import { ScrollReveal } from "../components/motion/ScrollReveal";
import FloatingElement from "../components/interactive/FloatingElement";
import { deliveryZones } from "../data/deliveryData";

const steps = [
  { label: "Order Placed", icon: "??", active: true },
  { label: "Being Prepared", icon: "??", active: true },
  { label: "On the Way", icon: "??", active: false },
  { label: "Delivered", icon: "?", active: false },
];

const Delivery = () => {
  return (
    <PageTransition className="bg-surface min-h-[100dvh]">
      {/* Cinematic header */}
      <div className="relative pt-40 pb-20 bg-bg-deep noise-overlay overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-deep to-bg-dark" />
        <FloatingElement speed="slow" className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-primary/6 blur-3xl pointer-events-none" />
        <FaMotorcycle className="absolute -bottom-4 -right-4 text-[300px] text-primary/[0.04] rotate-12 pointer-events-none" aria-hidden="true" />

        <PageContainer className="relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-overline mb-4">
            Lightning Fast
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-heading-1 text-text-on-dark max-w-2xl mb-6"
          >
            To your door in{" "}
            <em className="italic text-primary not-italic">30 minutes.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-body-lg text-text-on-dark-muted max-w-xl"
          >
            Order directly from our kitchen. Fresh ingredients, premium packaging, complimentary delivery on orders over 300 EGP.
          </motion.p>
        </PageContainer>
      </div>

      {/* Animated delivery timeline */}
      <section className="py-16 bg-surface-sunken border-y border-border">
        <PageContainer>
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center gap-2 relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 ${
                    step.active
                      ? "bg-primary border-primary text-white shadow-button"
                      : "bg-surface border-border text-text-muted"
                  }`}
                  aria-label={step.label}
                >
                  {step.active ? <FaCheckCircle className="text-white" aria-hidden="true" /> : <span aria-hidden="true">{step.icon}</span>}
                </motion.div>
                <span className={`text-xs font-bold uppercase tracking-wider ${step.active ? "text-primary" : "text-text-muted"}`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`absolute top-6 left-12 w-full h-0.5 ${step.active ? "bg-primary" : "bg-border"}`} style={{ width: "calc(100% + 2rem)" }} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-body-sm text-text-muted mt-6">* Simulated delivery tracker. Actual times may vary.</p>
        </PageContainer>
      </section>

      {/* Features */}
      <section className="py-20 bg-surface">
        <PageContainer>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: MdTimer, title: "30–60 Mins", desc: "Average prep and delivery time based on your location." },
              { icon: MdDeliveryDining, title: "Free Delivery", desc: "Complimentary delivery on premium orders above 300 EGP." },
              { icon: MdPayment, title: "Cash & Card", desc: "Flexible payment: secure online or cash on delivery." },
            ].map((item, index) => (
              <ScrollReveal key={index} mode="fade-up" delay={index * 0.1}>
                <div className="group flex flex-col items-start gap-5 p-7 rounded-2xl bg-surface border border-border hover:border-primary/30 hover:shadow-card transition-all duration-400">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-text-primary text-lg mb-2">{item.title}</h3>
                    <p className="text-body text-text-secondary">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Zones table */}
          <ScrollReveal mode="scale">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-overline mb-3">Coverage</p>
                <h2 className="text-heading-2 text-text-primary mb-3">Delivery Zones & Fees</h2>
                <p className="text-body text-text-secondary">We currently serve the following areas.</p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-surface-sunken border-b border-border">
                        <th className="p-5 text-overline text-text-muted"><FaMapMarkerAlt className="inline mr-2 text-primary" aria-hidden="true" />Area</th>
                        <th className="p-5 text-overline text-text-muted">Est. Time</th>
                        <th className="p-5 text-overline text-text-muted text-right">Delivery Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveryZones.map((zone, i) => (
                        <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-primary/[0.025] transition-colors duration-200">
                          <td className="p-5 font-display font-bold text-text-primary">{zone.area}</td>
                          <td className="p-5 text-text-secondary">{zone.time}</td>
                          <td className="p-5 font-bold text-primary text-right">{zone.fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="text-center mt-16">
            <Link to="/menu">
              <Button variant="primary" size="lg" icon={FaArrowRight} className="shadow-hero">
                Order Now
              </Button>
            </Link>
          </div>
        </PageContainer>
      </section>
    </PageTransition>
  );
};

export default Delivery;
