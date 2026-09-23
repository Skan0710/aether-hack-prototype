import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'warning' | 'ghost' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2 text-sm rounded-xl gap-2',
    lg: 'px-5 py-2.5 text-base rounded-xl gap-2.5 font-medium',
  };

  const variantClasses = {
    primary:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-soft-sm border border-emerald-500/20 active:scale-[0.98]',
    emerald:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-soft-sm border border-emerald-500/20 active:scale-[0.98]',
    secondary:
      'bg-navy-800 hover:bg-navy-750 text-slate-200 border border-navy-700 hover:border-navy-600 active:scale-[0.98]',
    outline:
      'bg-transparent hover:bg-navy-800/60 text-slate-300 border border-navy-700 hover:border-slate-500 active:scale-[0.98]',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white shadow-soft-sm border border-rose-500/20 active:scale-[0.98]',
    warning:
      'bg-amber-600 hover:bg-amber-500 text-white shadow-soft-sm border border-amber-500/20 active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-navy-850 text-slate-400 hover:text-slate-200',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
