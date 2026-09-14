import React from 'react';
import { SeverityLevel } from '../../types';

interface RiskBadgeProps {
  severity: SeverityLevel;
  score?: number;
  size?: 'sm' | 'md';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ severity, score, size = 'sm' }) => {
  let badgeClasses =
    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';

  switch (severity) {
    case 'healthy':
      badgeClasses =
        'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50';
      break;
    case 'info':
      badgeClasses =
        'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50';
      break;
    case 'warning':
      badgeClasses =
        'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50 font-semibold';
      break;
    case 'major':
      badgeClasses =
        'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800/50 font-semibold';
      break;
    case 'critical':
      badgeClasses =
        'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/50 font-bold';
      break;
  }

  const padding = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded border uppercase tracking-wider font-mono ${padding} ${badgeClasses} whitespace-nowrap`}
    >
      <span className="capitalize">{severity}</span>
      {typeof score === 'number' && (
        <span className="font-bold tabular-nums">[{score}]</span>
      )}
    </span>
  );
};

