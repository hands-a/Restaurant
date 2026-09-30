import React from 'react';

const Divider = ({ className = "", orientation = "horizontal" }) => {
  if (orientation === 'vertical') {
    return <div className={`w-px bg-border-strong h-full ${className}`} role="separator" aria-orientation="vertical" />;
  }
  return <div className={`h-px bg-border-strong w-full ${className}`} role="separator" aria-orientation="horizontal" />;
};

export default Divider;
