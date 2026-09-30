import React from 'react';

const Spinner = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-4",
  };

  const colors = {
    primary: "border-primary-light border-t-primary",
    white: "border-white/30 border-t-white",
    gray: "border-border-strong border-t-text-secondary",
  };

  return (
    <div 
      className={`rounded-full animate-spin ${sizes[size]} ${colors[color]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
