import React from "react";
import PageTransition from "../components/motion/PageTransition";
import { ScrollReveal } from "../components/motion/ScrollReveal";
import Hero from "../components/Home/Hero";
import PhilosophyStatement from "../components/Home/PhilosophyStatement";
import Features from "../components/Home/Features";
import PopularDishes from "../components/Home/PopularDishes";
import Testimonials from "../components/Home/Testimonials";
import FinalCTA from "../components/Home/FinalCTA";

const Home = () => {
  return (
    <PageTransition className="bg-surface">
      {/* 01 — Hero */}
      <Hero />

      {/* 02 — Philosophy */}
      <ScrollReveal mode="fade-up">
        <PhilosophyStatement />
      </ScrollReveal>

      {/* 03 — Why Us */}
      <ScrollReveal mode="fade-up" delay={0.05}>
        <Features />
      </ScrollReveal>

      {/* 04 — Popular Dishes + Offers */}
      <ScrollReveal mode="fade-up" delay={0.05}>
        <PopularDishes />
      </ScrollReveal>

      {/* 05 — Testimonials */}
      <ScrollReveal mode="fade-up" delay={0.05}>
        <Testimonials />
      </ScrollReveal>

      {/* 06 — Final CTA */}
      <FinalCTA />
    </PageTransition>
  );
};

export default Home;
