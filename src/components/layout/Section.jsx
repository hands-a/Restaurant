import React from 'react';

const Section = ({ 
  children, 
  className = "",
  padding = "py-16 md:py-24", // standard vertical spacing
  background = "bg-transparent"
}) => {
  return (
    <section className={`${padding} ${background} ${className}`}>
      {children}
    </section>
  );
};

export default Section;
