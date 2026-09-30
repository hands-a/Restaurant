import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import Spinner from './Spinner';

const Button = React.forwardRef(({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  icon: Icon,
  loading = false,
  disabled = false,
  type = 'button',
  ...props 
}, ref) => {
  
  const baseStyles = "relative inline-flex items-center justify-center gap-2 rounded-xl text-button transition-all duration-300 select-none outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const sizeStyles = {
    sm: "h-10 px-4 text-sm", // 40px
    md: "h-12 px-6 text-base", // 48px
    lg: "h-14 px-8 text-lg", // 56px
    hero: "h-16 px-10 text-xl font-bold tracking-wider", // 64px
  };

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-button hover:shadow-card-hover",
    secondary: "bg-surface-sunken text-text-primary hover:bg-surface-elevated border border-border hover:border-border-strong shadow-sm hover:shadow-card",
    outline: "bg-transparent border border-border-strong text-text-primary hover:border-primary hover:text-primary",
    ghost: "bg-transparent text-text-secondary hover:bg-surface-sunken hover:text-text-primary",
    danger: "bg-error text-white hover:bg-red-700 shadow-sm",
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      type={type}
      whileHover={isDisabled ? {} : { scale: 1.02 }} 
      whileTap={isDisabled ? {} : { scale: 0.97 }}  
      onClick={onClick}
      disabled={isDisabled}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {loading ? (
        <Spinner size="sm" color={variant === 'outline' || variant === 'ghost' || variant === 'secondary' ? 'primary' : 'white'} />
      ) : (
        <>
          {Icon && <Icon className={cn("shrink-0", size === 'sm' ? 'text-base' : size === 'hero' ? 'text-2xl' : 'text-xl')} aria-hidden="true" />}
          <span className="relative z-10">{children}</span>
        </>
      )}
      
      {/* Subtle overlay for active states or generic glow */}
      {!isDisabled && variant === 'primary' && (
        <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-300" />
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;