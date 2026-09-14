import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  change?: string;
  isNegativeChange?: boolean;
  icon: LucideIcon;
  variant?: 'default' | 'critical' | 'warning' | 'healthy' | 'info';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  change,
  isNegativeChange,
  icon: Icon,
  variant = 'default',
  onClick,
}) => {
  // Enterprise semantic color mapping
  let borderClasses =
    'border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] hover:border-slate-300 dark:hover:border-slate-700';
  let iconBgClasses =
    'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60';
  let valueClasses = 'text-slate-900 dark:text-white';

  if (variant === 'critical') {
    borderClasses =
      'border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/15 hover:border-rose-300 dark:hover:border-rose-800';
    iconBgClasses = 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/40';
    valueClasses = 'text-rose-600 dark:text-rose-400';
  } else if (variant === 'warning') {
    borderClasses =
      'border-amber-200 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/15 hover:border-amber-300 dark:hover:border-amber-800';
    iconBgClasses = 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/40';
    valueClasses = 'text-amber-600 dark:text-amber-400';
  } else if (variant === 'healthy') {
    borderClasses =
      'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/15 hover:border-emerald-300 dark:hover:border-emerald-800';
    iconBgClasses =
      'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/40';
    valueClasses = 'text-emerald-600 dark:text-emerald-400';
  } else if (variant === 'info') {
    borderClasses =
      'border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-950/15 hover:border-indigo-300 dark:hover:border-indigo-800';
    iconBgClasses =
      'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/40';
    valueClasses = 'text-indigo-600 dark:text-indigo-400';
  }

  return (
    <div
      onClick={onClick}
      className={`relative p-3.5 sm:p-4 rounded-lg border transition-all duration-150 shadow-enterprise ${borderClasses} ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate">
            {label}
          </p>
          <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
            <span
              className={`text-2xl font-bold tracking-tight font-mono tabular-nums ${valueClasses}`}
            >
              {value}
            </span>
            {subValue && (
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {subValue}
              </span>
            )}
          </div>
        </div>
        <div className={`p-2 rounded-md shrink-0 ${iconBgClasses}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {change && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px]">
          <span
            className={`font-semibold font-mono ${
              isNegativeChange
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {change}
          </span>
          <span className="text-slate-400 dark:text-slate-500">24h baseline</span>
        </div>
      )}
    </div>
  );
};
