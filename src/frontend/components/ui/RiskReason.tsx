import React from 'react';
import { AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';

interface RiskReasonProps {
  score: number;
  primaryCause: string;
  evidence: string[];
  recommendation: string;
}

export const RiskReason: React.FC<RiskReasonProps> = ({
  score,
  primaryCause,
  evidence,
  recommendation,
}) => {
  return (
    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
      <div className="flex items-center gap-2 text-amber-400 font-semibold">
        <Cpu className="w-4 h-4 text-indigo-400" />
        <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
          AI Risk Intelligence Diagnosis
        </span>
      </div>

      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
        <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">Primary Trigger</div>
        <div className="text-white font-semibold text-xs sm:text-sm">{primaryCause}</div>
      </div>

      <div className="space-y-1.5">
        <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">Operational Evidence</div>
        <ul className="space-y-1">
          {evidence.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-slate-300 text-[11px]">
              <span className="text-rose-400 mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">Mitigation Target:</span>
        <span className="text-emerald-400 font-mono font-bold">{recommendation}</span>
      </div>
    </div>
  );
};
