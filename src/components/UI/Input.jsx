import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-700 text-sm sm:text-base font-bold mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`shadow appearance-none border rounded-xl w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;