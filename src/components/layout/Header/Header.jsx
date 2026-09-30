import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import CartButton from "./CartButton";
import FavoritesButton from "./FavoritesButton";
import UserMenu from "./UserMenu";
import Logo from "../../ui/Logo";

const NAV_ITEMS = [
  { path: "/",        label: "Home" },
  { path: "/menu",    label: "Menu" },
  { path: "/about",   label: "Story" },
  { path: "/delivery",label: "Delivery" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on navigation
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  // Throttled scroll listener via rAF
  useEffect(() => {
    let rafId;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setIsScrolled(window.scrollY > 40));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  const toggleMenu = useCallback(() => setIsMenuOpen(v => !v), []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "bg-surface/95 backdrop-blur-md shadow-md border-b border-border py-3"
            : "bg-black/30 backdrop-blur-sm py-4 md:py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            className="focus:outline-none focus:ring-2 focus:ring-primary rounded-xl flex-shrink-0"
          >
            <Logo variant={isScrolled || isMenuOpen ? "dark" : "light"} />
          </Link>

          {/* Desktop nav — centred */}
          <div className="hidden lg:flex flex-1 justify-center">
            <DesktopNav navItems={NAV_ITEMS} isScrolled={isScrolled} />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <UserMenu isScrolled={isScrolled || isMenuOpen} />
            <FavoritesButton isScrolled={isScrolled || isMenuOpen} />
            <CartButton isScrolled={isScrolled || isMenuOpen} />

            {/* Hamburger — mobile only */}
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                isScrolled || isMenuOpen
                  ? "text-text-primary hover:bg-surface-elevated"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FaTimes className="text-lg" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FaBars className="text-lg" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navItems={NAV_ITEMS} />
    </>
  );
};

export default Header;
