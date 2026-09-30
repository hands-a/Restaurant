import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaAward, FaUsers, FaLeaf } from "react-icons/fa";
import PageContainer from "../components/layout/PageContainer";
import PageTransition from "../components/motion/PageTransition";
import { ScrollReveal } from "../components/motion/ScrollReveal";
import FloatingElement from "../components/interactive/FloatingElement";
import { teamMembers } from "../data/aboutData";

const CountUp = ({ target, duration = 1800, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const timelineItems = [
  { year: "2015", title: "The Beginning", text: "Born as an intimate family kitchen in Cairo." },
  { year: "2019", title: "First Award", text: "Received Cairo's Best New Restaurant Award." },
  { year: "2022", title: "Digital Expansion", text: "Launched delivery across 20+ zones." },
  { year: "2024", title: "Today", text: "Serving 10,000+ happy customers every month." },
];

const About = () => {
  return (
    <PageTransition className="bg-surface min-h-[100dvh]">

      {/* Hero: Cinematic header */}
      <div className="relative min-h-[55vh] flex items-end pb-16 overflow-hidden bg-bg-deep noise-overlay">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80)" }}
          role="img"
          aria-label="Our kitchen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/70 to-transparent" />
        <FloatingElement speed="slow" className="absolute top-20 right-1/4 w-64 h-64 rounded-full bg-primary/8 blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10 pt-40">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-overline mb-4"
          >
            Our Heritage
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-heading-1 text-text-on-dark max-w-3xl"
          >
            We don&apos;t just serve{" "}
            <em className="italic text-primary">food.</em>
            <br />We create <em className="italic">memories.</em>
          </motion.h1>
        </PageContainer>
      </div>

      {/* Story + Images */}
      <section className="py-24 bg-surface">
        <PageContainer>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal mode="fade-left">
              <div className="space-y-8">
                <p className="text-body-lg text-text-secondary leading-relaxed">
                  Founded in 2015 as an intimate family endeavor in the heart of Cairo, Restaurantly was born from a singular passion: elevating authentic, high-quality ingredients into unforgettable culinary experiences.
                </p>
                <p className="text-body text-text-secondary leading-relaxed">
                  Every dish we create is a reflection of our commitment to craft, freshness, and hospitality. We source locally, cook with care, and serve with pride.
                </p>

                <blockquote className="pl-6 border-l-4 border-primary">
                  <p className="font-display italic text-xl text-text-primary leading-snug">
                    "The secret ingredient is always the love for what you do."
                  </p>
                </blockquote>
              </div>
            </ScrollReveal>

            <ScrollReveal mode="scale">
              <div className="relative h-[560px]">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
                  alt="Our Kitchen"
                  className="rounded-3xl shadow-card-hover relative z-10 w-4/5 object-cover h-[70%] absolute top-0 left-0 border-4 border-surface"
                />
                <img
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=600&q=80"
                  alt="Chef cooking"
                  className="rounded-3xl shadow-card-hover absolute bottom-0 right-0 z-20 w-3/5 object-cover h-[55%] border-4 border-surface"
                />
              </div>
            </ScrollReveal>
          </div>
        </PageContainer>
      </section>

      {/* Stats */}
      <section className="py-20 bg-bg-dark noise-overlay">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-16" />
        <PageContainer>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 text-center">
            {[
              { icon: FaLeaf, stat: 50, suffix: "+", label: "Signature Dishes" },
              { icon: FaUsers, stat: 10, suffix: "k+", label: "Happy Guests" },
              { icon: FaAward, stat: 15, suffix: "", label: "Industry Awards" },
            ].map(({ icon: Icon, stat, suffix, label }) => (
              <ScrollReveal key={label} mode="fade-up">
                <div className="space-y-3">
                  <Icon className="text-3xl text-primary mx-auto" aria-hidden="true" />
                  <div className="text-4xl md:text-5xl font-display font-black text-text-on-dark">
                    <CountUp target={stat} suffix={suffix} />
                  </div>
                  <p className="text-overline">{label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </PageContainer>
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-16" />
      </section>

      {/* Timeline */}
      <section className="py-24 bg-surface">
        <PageContainer>
          <ScrollReveal mode="fade-up">
            <div className="text-center mb-16">
              <p className="text-overline mb-3">Our Journey</p>
              <h2 className="text-heading-2 text-text-primary">A story told in dishes</h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden md:block" aria-hidden="true" />
            <div className="space-y-10">
              {timelineItems.map((item, index) => (
                <ScrollReveal key={index} mode={index % 2 === 0 ? "fade-right" : "fade-left"} delay={index * 0.1}>
                  <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-0 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                      <div className="inline-block bg-surface-sunken border border-border rounded-2xl p-6">
                        <p className="text-overline mb-2">{item.year}</p>
                        <h3 className="text-heading-3 text-text-primary mb-2">{item.title}</h3>
                        <p className="text-body text-text-secondary">{item.text}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-6 h-6 rounded-full bg-primary border-4 border-surface shadow-button flex-shrink-0 z-10" aria-hidden="true" />
                    <div className="flex-1" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Team */}
      <section className="py-24 bg-surface-sunken border-t border-border">
        <PageContainer>
          <ScrollReveal mode="fade-up">
            <div className="text-center mb-16">
              <p className="text-overline mb-3">Behind the Craft</p>
              <h2 className="text-heading-2 text-text-primary">The Masterminds</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} mode="fade-up" delay={index * 0.12}>
                <div className="group overflow-hidden rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-shadow duration-500 bg-surface">
                  <div className="h-80 overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-heading-3 text-text-primary mb-1">{member.name}</h3>
                    <p className="text-overline">{member.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </PageContainer>
      </section>

    </PageTransition>
  );
};

export default About;
