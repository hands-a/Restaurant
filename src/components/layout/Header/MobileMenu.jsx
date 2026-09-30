import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaShoppingCart, FaHome, FaUtensils, FaBook, FaTruck, FaEnvelope } from 'react-icons/fa';
import { useCart } from '../../../context/CartContext';
import { useFavorites } from '../../../context/FavoritesContext';
import UserMenu from './UserMenu';

const ICON_MAP = {
  '/':        FaHome,
  '/menu':    FaUtensils,
  '/about':   FaBook,
  '/delivery':FaTruck,
  '/contact': FaEnvelope,
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 32 } },
  exit: { x: '100%', transition: { duration: 0.22 } },
};

const itemVariants = {
  hidden: { x: 24, opacity: 0 },
  visible: (i) => ({ x: 0, opacity: 1, transition: { delay: i * 0.05 + 0.1, duration: 0.3 } }),
};

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, navItems }) => {
  const location = useLocation();
  const { cartItems, cartCount } = useCart();
  const { favorites } = useFavorites();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const close = () => setIsMenuOpen(false);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Slide-in drawer */}
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 w-[min(320px,90vw)] bg-surface z-50 flex flex-col shadow-2xl overflow-y-auto lg:hidden"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <span className="font-display font-black text-lg text-text-primary">Menu</span>
              <button
                onClick={close}
                aria-label="Close menu"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navItems.map((item, i) => {
                const Icon = ICON_MAP[item.path] || FaHome;
                const isActive = location.pathname === item.path;
                return (
                  <motion.div key={item.path} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                    <Link
                      to={item.path}
                      onClick={close}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold text-base transition-all ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${
                        isActive ? 'bg-primary text-white' : 'bg-surface-elevated text-text-muted'
                      }`}>
                        <Icon />
                      </span>
                      {item.label}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom: quick actions + user */}
            <div className="px-4 pb-6 space-y-4 border-t border-border pt-4">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/favorites"
                  onClick={close}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border-strong hover:border-error/50 hover:bg-error/5 transition-all group"
                >
                  <FaHeart className={`text-base ${favorites.length > 0 ? 'text-error' : 'text-text-muted group-hover:text-error'} transition-colors`} />
                  <span className="text-sm font-semibold text-text-secondary group-hover:text-text-primary">
                    Saved {favorites.length > 0 && <span className="text-error">({favorites.length})</span>}
                  </span>
                </Link>
                <Link
                  to="/cart"
                  onClick={close}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border-strong hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <FaShoppingCart className={`text-base ${cartCount > 0 ? 'text-primary' : 'text-text-muted group-hover:text-primary'} transition-colors`} />
                  <span className="text-sm font-semibold text-text-secondary group-hover:text-text-primary">
                    Cart {cartCount > 0 && <span className="text-primary">({cartCount})</span>}
                  </span>
                </Link>
              </div>
              <UserMenu isMobile onClick={close} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
