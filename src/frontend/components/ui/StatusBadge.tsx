import React from 'react';
import { ShipmentStatus, DisruptionStatus, AssetStatus } from '../../types';

interface StatusBadgeProps {
  status: ShipmentStatus | DisruptionStatus | AssetStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  let colorClasses =
    'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  let dotColor = 'bg-slate-500 dark:bg-slate-400';

  switch (status) {
    case 'On Time':
    case 'Delivered':
    case 'Resolved':
    case 'Healthy':
      colorClasses =
        'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40';
      dotColor = 'bg-emerald-500 dark:bg-emerald-400';
      break;
    case 'In Transit':
    case 'Monitoring':
    case 'Active':
      colorClasses =
        'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/40';
      dotColor = 'bg-blue-500 dark:bg-blue-400';
      break;
    case 'Delayed':
    case 'Available':
      colorClasses =
        'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40';
      dotColor = 'bg-amber-500 dark:bg-amber-400';
      break;
    case 'At Risk':
    case 'Idle':
      colorClasses =
        'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800/40';
      dotColor = 'bg-orange-500 dark:bg-orange-400';
      break;
    case 'Disrupted':
    case 'Held':
    case 'Maintenance':
      colorClasses =
        'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/40 font-semibold';
      dotColor = 'bg-rose-500 dark:bg-rose-400';
      break;
    default:
      break;
  }

  const padding = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-md border ${padding} ${colorClasses} tracking-tight whitespace-nowrap`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
};

