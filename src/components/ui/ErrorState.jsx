import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Button from './Button';
import { motion } from 'framer-motion';

const ErrorState = ({ 
  title = "Something went wrong", 
  message = "We couldn't load the requested data. Please try again.", 
  onRetry,
  className = "" 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-error-light/30 border border-error-light ${className}`}
    >
      <div className="w-16 h-16 bg-error-light text-error rounded-full flex items-center justify-center text-3xl mb-4">
        <FaExclamationTriangle />
      </div>
      <h3 className="text-xl font-bold text-error mb-2">{title}</h3>
      <p className="text-text-secondary max-w-md mx-auto mb-6">{message}</p>
      {onRetry && (
        <Button variant="danger" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;
