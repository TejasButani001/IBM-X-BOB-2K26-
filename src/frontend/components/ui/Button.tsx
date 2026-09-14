import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'ai';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'sm',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

  const sizeClasses: Record<ButtonSize, string> = {
    xs: 'text-[11px] px-2 py-1 gap-1',
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-3.5 py-2 gap-2',
    lg: 'text-sm px-4 py-2.5 gap-2',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs dark:shadow-none border border-indigo-500/40',
    secondary:
      'bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-xs dark:shadow-none',
    ghost:
      'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white shadow-xs border border-rose-500/40',
    ai:
      'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-xs border border-indigo-400/40',
  };

  const DisplayIcon = variant === 'ai' && !Icon ? Sparkles : Icon;

  return (
    <button
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        DisplayIcon && iconPosition === 'left' && <DisplayIcon className="w-3.5 h-3.5 shrink-0" />
      )}
      {children && <span>{children}</span>}
      {!loading && DisplayIcon && iconPosition === 'right' && (
        <DisplayIcon className="w-3.5 h-3.5 shrink-0" />
      )}
    </button>
  );
};
