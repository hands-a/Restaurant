import React from 'react';

const FloatingElement = ({
  children,
  speed = 'slow',
  delay = 0,
  className = '',
}) => {
  const animClass = {
    slow: 'float-slow',
    medium: 'float-medium',
    fast: 'float-fast',
  }[speed] || 'float-slow';

  return (
    <div
      className={`${animClass} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default FloatingElement;

