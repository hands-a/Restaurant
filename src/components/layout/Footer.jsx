import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import PageContainer from "./PageContainer";
import Logo from "../ui/Logo";

const Footer = () => {
  return (
    <footer className="relative bg-bg-deep text-white overflow-hidden">
      {/* Oversized wordmark watermark */}
      <div
        className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="text-[22vw] font-display font-black text-white/[0.018] leading-none tracking-tighter whitespace-nowrap translate-y-1/3">
          RESTAURANTLY
        </span>
      </div>

      {/* Top amber rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <PageContainer className="pt-20 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 border-b border-white/10 pb-16"
        >
          {/* Brand column */}
          <div className="space-y-6 md:col-span-2">
            <Link to="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl">
              <Logo variant="dark-on-dark" className="text-white" />
            </Link>

            <p className="text-white/55 text-base font-display italic leading-relaxed max-w-xs">
              "Elevating culinary traditions with passion and precision since 2015."
            </p>

            <div className="flex gap-3 pt-2">
              {[
                { icon: FaFacebookF, label: "Facebook", href: "#" },
                { icon: FaInstagram, label: "Instagram", href: "#" },
                { icon: FaTwitter, label: "Twitter", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <Icon aria-hidden="true" className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-white font-display font-bold text-lg mb-6">Explore</h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/menu", label: "Our Menu" },
                { to: "/favorites", label: "My Table" },
                { to: "/delivery", label: "Delivery" },
                { to: "/about", label: "Our Story" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-white/55 hover:text-primary transition-colors text-sm focus:outline-none focus:text-primary inline-flex items-center gap-2 hover:translate-x-1 duration-300"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-6">Visit Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/55 text-sm">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                <span className="leading-relaxed">123 Culinary Avenue,<br />Cairo, Egypt</span>
              </li>
              <li className="flex items-center gap-3 text-white/55 text-sm">
                <FaPhoneAlt className="text-primary flex-shrink-0" aria-hidden="true" />
                <a href="tel:+20123456789" className="hover:text-primary transition-colors focus:outline-none focus:text-primary">
                  +20 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/55 text-sm">
                <FaClock className="text-primary flex-shrink-0" aria-hidden="true" />
                <span>Daily · 10 AM – 11 PM</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-white/30 text-xs">
          <p>© {new Date().getFullYear()} Restaurantly. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Crafted with precision & passion.</p>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
