import React from 'react';

export interface RiskFactor {
  name: string;
  points: number;
  description?: string;
  category?: 'disruption' | 'buffer' | 'cold-chain' | 'carrier' | 'weather';
}

interface RiskBreakdownProps {
  score?: number;
  factors?: RiskFactor[];
  title?: string;
  className?: string;
}

const DEFAULT_FACTORS: RiskFactor[] = [
  {
    name: 'Port disruption',
    points: 35,
    description: 'JNPT Outer Anchorage hold (>48h dwell escalation)',
    category: 'disruption',
  },
  {
    name: 'Delivery buffer',
    points: 25,
    description: 'Buffer depleted below SLA threshold (remaining: 4.2h)',
    category: 'buffer',
  },
  {
    name: 'Cold-chain sensitivity',
    points: 20,
    description: 'Thermostatic mRNA cargo (+2°C to +8°C window)',
    category: 'cold-chain',
  },
  {
    name: 'Carrier exposure',
    points: 10,
    description: 'Feeder feeder berth congestion index > 8.5',
    category: 'carrier',
  },
];

export const RiskBreakdown: React.FC<RiskBreakdownProps> = ({
  score = 90,
  factors = DEFAULT_FACTORS,
  title = 'Why is this shipment at risk?',
  className = '',
}) => {
  const totalPoints = factors.reduce((sum, f) => sum + f.points, 0);

  return (
    <div
      className={`p-4 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 border border-slate-800 text-xs shadow-xl space-y-3 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <h4 className="font-bold text-white text-xs sm:text-sm tracking-tight">{title}</h4>
        </div>
        <span className="font-mono text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
          Total Risk: {score || totalPoints} / 100
        </span>
      </div>

      <div className="space-y-2.5">
        {factors.map((factor, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium font-mono">{factor.name}</span>
              <span className="font-mono font-bold text-rose-400 tabular-nums">
                +{factor.points}
              </span>
            </div>
            {factor.description && (
              <p className="text-[11px] text-slate-400 font-sans leading-tight">
                {factor.description}
              </p>
            )}
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (factor.points / 40) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400 uppercase tracking-wider text-[10px]">Attributed Risk Total</span>
        <span className="font-bold text-white text-sm tabular-nums">
          {totalPoints} / 100
        </span>
      </div>
    </div>
  );
};
