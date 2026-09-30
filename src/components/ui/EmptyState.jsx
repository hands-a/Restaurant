import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className = "" 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-surface border border-border border-dashed ${className}`}
    >
      {Icon && (
        <div className="w-20 h-20 bg-surface-sunken text-text-muted rounded-full flex items-center justify-center text-4xl mb-6">
          <Icon />
        </div>
      )}
      <h3 className="text-2xl font-bold text-text-primary mb-2">{title}</h3>
      {description && <p className="text-text-secondary max-w-md mx-auto mb-8">{description}</p>}
      {action && <div>{action}</div>}
    </motion.div>
  );
};

export default EmptyState;
