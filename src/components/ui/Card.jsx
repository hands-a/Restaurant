import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = "",
  variant = "default", // default, elevated, interactive
  padding = "md", // none, sm, md, lg
  onClick,
  ...props
}) => {
  
  const variants = {
    default: "bg-surface border border-border shadow-sm",
    elevated: "bg-surface border border-border shadow-md",
    interactive: "bg-surface border border-border shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer",
  };

  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const Component = variant === 'interactive' || onClick ? motion.div : 'div';
  const motionProps = (variant === 'interactive' || onClick) ? {
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <Component 
      className={`rounded-2xl overflow-hidden ${variants[variant]} ${paddings[padding]} ${className}`}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
