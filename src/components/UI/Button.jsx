import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
  const baseStyle = 'px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out shadow-lg';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
    outline: 'bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;