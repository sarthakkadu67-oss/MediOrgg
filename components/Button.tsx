import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-3 rounded-xl font-semibold tracking-wide transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]",
    secondary: "bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_20px_rgba(5,150,105,0.3)] border border-emerald-500/50 hover:shadow-[0_0_30px_rgba(5,150,105,0.5)]",
    outline: "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500 bg-transparent backdrop-blur-sm",
    ghost: "text-slate-400 hover:bg-slate-800/50 hover:text-white",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};