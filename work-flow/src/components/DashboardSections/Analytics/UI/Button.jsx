import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black';
  
  const variants = {
    primary: 'bg-[#255F38] text-white hover:bg-[#1F7D53] focus:ring-[#255F38]',
    secondary: 'bg-[#1F7D53] text-white hover:bg-[#255F38] focus:ring-[#1F7D53]',
    ghost: 'text-[#255F38] hover:text-white hover:bg-[#255F38] focus:ring-[#255F38]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;