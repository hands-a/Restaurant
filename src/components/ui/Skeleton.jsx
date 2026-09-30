import React from 'react';

const Skeleton = ({ className = "", type = "text" }) => {
  const types = {
    text: "h-4 w-3/4 rounded-md",
    title: "h-8 w-1/2 rounded-lg",
    avatar: "h-12 w-12 rounded-full",
    image: "h-48 w-full rounded-2xl",
    button: "h-12 w-32 rounded-xl"
  };

  return (
    <div 
      className={`animate-pulse bg-border-strong ${types[type]} ${className}`}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
