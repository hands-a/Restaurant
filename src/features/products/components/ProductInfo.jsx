import React from 'react';
import { FaStar, FaClock, FaLeaf, FaSeedling, FaFire } from 'react-icons/fa';

const TAG_CONFIG = {
  Vegetarian: { icon: FaLeaf,     style: 'bg-success-light text-success' },
  Vegan:      { icon: FaSeedling, style: 'bg-success-light text-success' },
  Spicy:      { icon: FaFire,     style: 'bg-warning-light text-warning' },
};

const ProductInfo = ({ name, description, category, tags = [], rating, price, prepTime }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="space-y-6">
      {/* ── Category + Tags row ── */}
      <div className="flex flex-wrap items-center gap-2">
        {category && (
          <span className="inline-block text-overline text-primary bg-primary/10 px-3 py-1.5 rounded-full">
            {category}
          </span>
        )}
        {tags.map(tag => {
          const config = TAG_CONFIG[tag];
          const Icon = config?.icon;
          return (
            <span
              key={tag}
              className={`flex items-center gap-1.5 text-caption font-bold px-3 py-1.5 rounded-full ${config?.style || 'bg-surface-sunken text-text-muted'}`}
            >
              {Icon && <Icon aria-hidden="true" />}
              {tag}
            </span>
          );
        })}
      </div>

      {/* ── Title ── */}
      <h1 className="text-display-lg text-text-primary">
        {name}
      </h1>

      {/* ── Rating + Prep Time ── */}
      <div className="flex flex-wrap items-center gap-4 text-body-sm font-medium">
        {/* Stars */}
        <div className="flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5`}>
          <div className="flex text-yellow-400 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < fullStars
                    ? 'text-yellow-400'
                    : i === fullStars && hasHalf
                    ? 'text-yellow-400 opacity-50'
                    : 'text-border-strong'
                }
              />
            ))}
          </div>
          <span className="font-bold text-text-primary ml-1">{rating}</span>
        </div>

        {/* Divider dot */}
        <span className="text-border-strong text-lg">·</span>

        {/* Prep time */}
        {prepTime && (
          <div className="flex items-center gap-1.5 text-text-secondary">
            <FaClock className="text-primary/70" aria-hidden="true" />
            <span>{prepTime}</span>
          </div>
        )}
      </div>

      {/* ── Description ── */}
      <p className="text-text-secondary text-body-lg leading-relaxed">
        {description}
      </p>

      {/* ── Base price ── */}
      <div className="flex items-baseline gap-2 pt-2 border-t border-border/50">
        <span className="text-heading-1 text-primary">{price}</span>
        <span className="text-text-secondary font-bold text-lg">EGP</span>
        <span className="text-text-muted text-overline ml-2">Base Price</span>
      </div>
    </div>
  );
};

export default ProductInfo;
