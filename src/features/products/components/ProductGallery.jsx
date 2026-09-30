import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const ProductGallery = ({ images = [], name, rating }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const changeImage = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 20 : -20, scale: 1.02 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -20 : 20, scale: 0.98 }),
  };

  return (
    <div className="flex flex-col gap-5">
      {/* ── Main Image ── */}
      <div className="relative h-[400px] lg:h-[540px] rounded-[2rem] overflow-hidden bg-bg-dark border border-border shadow-card group">
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            src={images[activeIndex]}
            alt={`${name} — view ${activeIndex + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </AnimatePresence>

        {/* Warm overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* Rating badge */}
        <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 text-body-sm font-bold shadow-sm">
          <FaStar className="text-yellow-400" aria-hidden="true" />
          <span className="text-white">{rating}</span>
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-5 right-5 bg-black/40 backdrop-blur-md text-white text-caption font-bold px-3 py-1.5 rounded-full tracking-wider">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* ── Thumbnail Strip ── */}
      {images.length > 1 && (
        <div
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
          role="tablist"
          aria-label="Product image thumbnails"
        >
          {images.map((src, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                aria-label={`View image ${i + 1}`}
                onClick={() => changeImage(i)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') changeImage(Math.min(i + 1, images.length - 1));
                  if (e.key === 'ArrowLeft') changeImage(Math.max(i - 1, 0));
                }}
                className={[
                  'relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  isActive ? 'ring-2 ring-primary ring-offset-2 scale-105 shadow-md' : 'opacity-60 hover:opacity-100 hover:scale-95'
                ].join(' ')}
              >
                <img
                  src={src}
                  alt={`${name} thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Active dark overlay */}
                <div className={`absolute inset-0 bg-black/20 transition-opacity ${isActive ? 'opacity-0' : 'opacity-100'}`} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
