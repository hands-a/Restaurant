import React from 'react';
import { motion } from 'framer-motion';
import { FaHamburger, FaPizzaSlice, FaIceCream, FaCoffee, FaUtensils } from 'react-icons/fa';

const CATEGORY_ICONS = {
  All:      <FaUtensils />,
  Burgers:  <FaHamburger />,
  Pizza:    <FaPizzaSlice />,
  Desserts: <FaIceCream />,
  Drinks:   <FaCoffee />,
};

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div
      className="flex flex-wrap justify-center gap-3 mb-12"
      role="tablist"
      aria-label="Filter by category"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveCategory(cat)}
            className={[
              'relative flex items-center gap-2 px-6 py-3 rounded-full text-button transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border-2',
              isActive
                ? 'bg-primary text-white border-primary shadow-button scale-105'
                : 'bg-surface text-text-secondary border-border-strong hover:border-primary hover:text-primary',
            ].join(' ')}
          >
            {/* layoutId sliding background for smooth active transition */}
            {isActive && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-primary z-0"
                transition={{ type: 'spring', bounce: 0.25, duration: 0.35 }}
              />
            )}
            <span className="relative z-10 text-base" aria-hidden="true">
              {CATEGORY_ICONS[cat] || <FaUtensils />}
            </span>
            <span className="relative z-10">{cat}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;