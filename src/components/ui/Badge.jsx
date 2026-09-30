import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  className = '',
  icon: Icon
}) => {
  const variants = {
    default: "bg-surface-sunken text-text-secondary border-border-strong",
    primary: "bg-primary-light text-primary border-primary/20",
    success: "bg-success-light text-success border-success/20",
    warning: "bg-warning-light text-warning border-warning/20",
    error: "bg-error-light text-error border-error/20",
    info: "bg-info-light text-info border-info/20",
    popular: "bg-primary text-white border-transparent shadow-sm",
    new: "bg-success text-white border-transparent shadow-sm",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption font-bold border transition-colors ${variants[variant]} ${className}`}>
      {Icon && <Icon className="text-[10px]" />}
      {children}
    </span>
  );
};

export default Badge;
