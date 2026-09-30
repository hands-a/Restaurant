import React from 'react';

const PageHeader = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`text-center mb-12 md:mb-16 max-w-3xl mx-auto ${className}`}>
      {subtitle && (
        <span className="text-primary text-body-lg mb-4 block opacity-90 italic">
          {subtitle}
        </span>
      )}
      <h2 className="text-display-lg text-text-primary">
        {title}
      </h2>
      <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full opacity-50"></div>
    </div>
  );
};

export default PageHeader;
