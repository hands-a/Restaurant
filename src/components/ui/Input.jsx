import React, { forwardRef, useId } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  icon: Icon,
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
        <label htmlFor={id} className="block text-body-sm font-bold text-text-primary">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
            <Icon />
          </div>
        )}
        <input 
          id={id}
          ref={ref}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`.trim() || undefined}
          className={`
            w-full bg-surface-elevated border-2 rounded-xl px-4 py-3 outline-none transition-all text-body
            ${Icon ? 'pl-11' : ''}
            ${disabled ? 'opacity-60 cursor-not-allowed bg-surface-sunken border-border' : 'hover:border-border-strong'}
            ${error 
              ? 'border-error text-error focus:border-error focus:ring-4 focus:ring-error/20' 
              : 'border-border focus:border-primary focus:ring-4 focus:ring-primary/20 text-text-primary'}
          `}
          {...props}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-error">
            <FaExclamationCircle />
          </div>
        )}
      </div>
      {error && <p id={errorId} className="text-sm text-error font-medium">{error}</p>}
      {helperText && !error && <p id={helperId} className="text-sm text-text-muted">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
