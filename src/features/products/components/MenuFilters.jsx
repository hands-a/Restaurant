import React, { memo } from 'react';
import { FaSearch, FaTimes, FaLeaf, FaSeedling, FaFire } from 'react-icons/fa';

const DIETARY_OPTIONS = [
  { label: 'Vegetarian', icon: <FaLeaf /> },
  { label: 'Vegan',      icon: <FaSeedling /> },
  { label: 'Spicy',      icon: <FaFire /> },
];

const PRICE_OPTIONS = [
  { value: 'under-100', label: 'Under 100 EGP' },
  { value: '100-200',   label: '100 – 200 EGP' },
  { value: 'over-200',  label: 'Over 200 EGP'  },
];

const MenuFilters = memo(({ filters, setSearch, setPrice, toggleTag, clearFilters, activeFiltersCount }) => {
  const { search, price, activeTags } = filters;

  return (
    <div className="space-y-8">

      {/* ── Search ── */}
      <div>
        <h4 className="text-overline mb-3">Search</h4>
        <div className="relative">
          <input
            type="text"
            placeholder="Search dishes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search dishes"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-border-strong bg-surface text-text-primary placeholder:text-text-muted text-body focus:outline-none focus:border-primary transition-colors"
          />
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-body" aria-hidden="true" />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors focus:outline-none"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* ── Price range ── */}
      <div>
        <h4 className="text-overline mb-3">Price</h4>
        <div className="flex flex-col gap-2">
          {PRICE_OPTIONS.map(({ value, label }) => {
            const isActive = price === value;
            return (
              <button
                key={value}
                onClick={() => setPrice(isActive ? '' : value)}
                aria-pressed={isActive}
                className={[
                  'text-left px-4 py-2.5 rounded-xl border-2 text-button transition-all focus:outline-none focus:ring-2 focus:ring-primary',
                  isActive
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-border-strong text-text-secondary hover:border-primary/50 hover:text-text-primary',
                ].join(' ')}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Dietary tags ── */}
      <div>
        <h4 className="text-overline mb-3">Dietary</h4>
        <div className="flex flex-col gap-2">
          {DIETARY_OPTIONS.map(({ label, icon }) => {
            const isActive = activeTags.includes(label);
            return (
              <button
                key={label}
                onClick={() => toggleTag(label)}
                aria-pressed={isActive}
                className={[
                  'flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 text-button transition-all focus:outline-none focus:ring-2 focus:ring-primary',
                  isActive
                    ? 'bg-success/10 border-success text-success'
                    : 'border-border-strong text-text-secondary hover:border-success/50 hover:text-success',
                ].join(' ')}
              >
                <span className="text-lg" aria-hidden="true">{icon}</span>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Clear all — only show when filters are active ── */}
      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-button text-error hover:text-red-700 transition-colors pt-4 border-t border-border w-full focus:outline-none focus:text-red-700"
        >
          <FaTimes aria-hidden="true" />
          Clear All Filters
          <span className="ml-auto bg-error/10 text-error text-caption px-2 py-0.5 rounded-full font-black">
            {activeFiltersCount}
          </span>
        </button>
      )}
    </div>
  );
});

MenuFilters.displayName = 'MenuFilters';

export default MenuFilters;
