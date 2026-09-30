import React, { forwardRef, useId } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const Textarea = forwardRef(({ 
  label, 
  error, 
  helperText,
  className = "", 
  disabled = false,
  required = false,
  rows = 4,
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
        <textarea 
          id={id}
          ref={ref}
          disabled={disabled}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`.trim() || undefined}
          className={`
            w-full bg-surface-elevated border-2 rounded-xl px-4 py-3 outline-none transition-all resize-y min-h-[100px] text-body
            ${disabled ? 'opacity-60 cursor-not-allowed bg-surface-sunken border-border' : 'hover:border-border-strong'}
            ${error 
              ? 'border-error text-error focus:border-error focus:ring-4 focus:ring-error/20' 
              : 'border-border focus:border-primary focus:ring-4 focus:ring-primary/20 text-text-primary'}
          `}
          {...props}
        />
        {error && (
          <div className="absolute top-4 right-4 flex items-center pointer-events-none text-error">
            <FaExclamationCircle />
          </div>
        )}
      </div>
      {error && <p id={errorId} className="text-sm text-error font-medium">{error}</p>}
      {helperText && !error && <p id={helperId} className="text-sm text-text-muted">{helperText}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
