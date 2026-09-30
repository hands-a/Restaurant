import React, { forwardRef, useId } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Select = forwardRef(({ 
  label, 
  error, 
  helperText,
  icon: Icon,
  options = [],
  className = "", 
  disabled = false,
  required = false,
  ...props 
}, ref) => {
  const id = useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-bold text-text-primary">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
            <Icon />
          </div>
        )}
        <select 
          id={id}
          ref={ref}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`.trim() || undefined}
          className={`
            w-full bg-surface-elevated border-2 rounded-xl px-4 py-3 outline-none transition-all appearance-none cursor-pointer
            ${Icon ? 'pl-11' : ''}
            ${disabled ? 'opacity-60 cursor-not-allowed bg-surface-sunken border-border' : 'hover:border-border-strong'}
            ${error 
              ? 'border-error text-error focus:border-error focus:ring-4 focus:ring-error-light' 
              : 'border-border focus:border-primary focus:ring-4 focus:ring-primary-light text-text-primary'}
          `}
          {...props}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-text-muted">
          <FaChevronDown className="text-sm" />
        </div>
      </div>
      {error && <p id={errorId} className="text-sm text-error font-medium">{error}</p>}
      {helperText && !error && <p id={helperId} className="text-sm text-text-muted">{helperText}</p>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
