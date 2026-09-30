import React from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';

const ProductOptions = ({ sizes, addons, selectedSize, setSelectedSize, extras, toggleExtra }) => {
  return (
    <>
      {/* ── Size Selector ── */}
      {sizes && sizes.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-heading-3">Select Size</h3>
            <span className="text-overline text-error">Required</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sizes.map(size => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={[
                    'relative px-4 py-3.5 rounded-2xl border-2 text-button transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
                    isSelected
                      ? 'border-primary text-primary bg-primary/10 shadow-sm'
                      : 'border-border-strong text-text-secondary hover:border-primary/50 hover:bg-surface hover:text-text-primary'
                  ].join(' ')}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center shadow-sm">
                      <FaCheck size={10} aria-hidden="true" />
                    </div>
                  )}
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Extras & Add-ons ── */}
      {addons && addons.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-heading-3">Extras & Add-ons</h3>
            <span className="text-overline text-text-muted">Optional</span>
          </div>
          <div className="flex flex-col gap-3">
            {addons.map(addon => {
              const isSelected = extras.find(e => e.name === addon.name);
              return (
                <div
                  key={addon.name}
                  onClick={() => toggleExtra(addon)}
                  role="checkbox"
                  aria-checked={isSelected ? 'true' : 'false'}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? toggleExtra(addon) : null}
                  className={[
                    'flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 group',
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border-strong hover:border-primary/40 hover:bg-surface-elevated'
                  ].join(' ')}
                >
                  <div className="flex items-center gap-4">
                    {/* Premium Checkbox */}
                    <div className={[
                      'w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 shadow-sm',
                      isSelected ? 'bg-primary border-primary text-white scale-110' : 'border-border-strong bg-surface text-transparent group-hover:border-primary/40'
                    ].join(' ')}>
                      <FaCheck size={12} aria-hidden="true" />
                    </div>
                    <span className={`text-body font-bold transition-colors ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                      {addon.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-surface-sunken px-2.5 py-1 rounded-md">
                    <FaPlus className="text-text-muted text-[10px]" aria-hidden="true" />
                    <span className="text-text-secondary text-body-sm font-bold">{addon.price} EGP</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductOptions;
