import React from 'react';

interface RiskScoreProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RiskScore: React.FC<RiskScoreProps> = ({
  score,
  maxScore = 100,
  size = 'md',
  showLabel = true,
}) => {
  let level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
  let colorClasses = {
    bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    ring: 'stroke-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
  };

  if (score >= 80) {
    level = 'CRITICAL';
    colorClasses = {
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      ring: 'stroke-rose-500',
      text: 'text-rose-600 dark:text-rose-400',
    };
  } else if (score >= 60) {
    level = 'HIGH';
    colorClasses = {
      bg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
      ring: 'stroke-orange-500',
      text: 'text-orange-600 dark:text-orange-400',
    };
  } else if (score >= 35) {
    level = 'MEDIUM';
    colorClasses = {
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      ring: 'stroke-amber-500',
      text: 'text-amber-600 dark:text-amber-400',
    };
  }

  const dimension = size === 'sm' ? 44 : size === 'lg' ? 84 : 64;
  const strokeWidth = size === 'sm' ? 4 : size === 'lg' ? 7 : 5;
  const radius = (dimension - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / maxScore) * circumference;

  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative inline-flex items-center justify-center shrink-0">
        <svg width={dimension} height={dimension} className="transform -rotate-90">
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            className={`${colorClasses.ring} transition-all duration-700 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <span
          className={`absolute font-mono font-bold tabular-nums ${colorClasses.text} ${
            size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-xl' : 'text-sm'
          }`}
        >
          {score}
        </span>
      </div>

      {showLabel && (
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">
            Risk Score
          </span>
          <span
            className={`inline-block font-mono font-bold text-xs px-2 py-0.5 rounded border mt-0.5 ${colorClasses.bg}`}
          >
            {level} ({score}/{maxScore})
          </span>
        </div>
      )}
    </div>
  );
};
