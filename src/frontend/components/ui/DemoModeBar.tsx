'use client';

import React from 'react';
import { useControlTower } from '../../context/ControlTowerContext';
import { RotateCcw, AlertTriangle, ShieldCheck, Thermometer, Clock, Sparkles } from 'lucide-react';

export const DemoModeBar: React.FC = () => {
  const {
    demoScenario,
    strikeDurationHours,
    setStrikeDurationHours,
    triggerMumbaiStrike,
    triggerColdChainExcursion,
    approveAllImmediateActions,
    resetToBaseline,
    metrics,
  } = useControlTower();

  const handleToggleDuration = () => {
    const nextHours = strikeDurationHours === 24 ? 48 : strikeDurationHours === 48 ? 72 : 24;
    setStrikeDurationHours(nextHours);
  };

  return (
    <div className="bg-slate-100 dark:bg-[#060911] border-b border-slate-200 dark:border-slate-800/90 px-3 sm:px-4 py-1.5 text-xs text-slate-600 dark:text-slate-300 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 tracking-wider">
            DEMO ENGINE
          </span>
          <span className="hidden sm:inline text-slate-500 dark:text-slate-400 text-[11px]">
            Scenario:
          </span>
          <span className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-1.5">
            {demoScenario === 'mumbai-strike'
              ? `Mumbai Port Strike (${strikeDurationHours}h Window)`
              : demoScenario === 'cold-chain-excursion'
              ? 'Cold-Chain Excursion (VAX-2045)'
              : demoScenario === 'cascade-resolved'
              ? 'AI Response Plan Approved'
              : 'Nominal Baseline'}
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden md:inline">•</span>
          <span className="text-slate-500 dark:text-slate-400 hidden md:inline text-[11px]">
            At-Risk Shipments: <strong className="text-rose-600 dark:text-rose-400 font-mono">{metrics.atRiskShipments}</strong>
          </span>
          <span className="text-slate-500 dark:text-slate-400 hidden lg:inline text-[11px]">
            Idle Assets: <strong className="text-amber-600 dark:text-amber-400 font-mono">{metrics.idleFleetAssets}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Step 12: Duration Toggle (24h -> 48h -> 72h) */}
          <button
            onClick={handleToggleDuration}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-semibold transition-all shadow-xs"
            title="Toggle Strike Duration: 24h -> 48h -> 72h"
          >
            <Clock className="w-3 h-3 text-indigo-500" />
            <span>Duration: {strikeDurationHours}h</span>
          </button>

          {/* Trigger Mumbai Strike Scenario */}
          <button
            onClick={triggerMumbaiStrike}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 text-[11px] font-medium transition-all"
            title="Step 1-11: Trigger Mumbai Port Strike scenario"
          >
            <AlertTriangle className="w-3 h-3 text-rose-500 shrink-0" />
            <span>Simulate Strike</span>
          </button>

          {/* Trigger Cold-Chain Excursion */}
          <button
            onClick={triggerColdChainExcursion}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-orange-50 dark:bg-orange-950/50 hover:bg-orange-100 dark:hover:bg-orange-900/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60 text-[11px] font-medium transition-all"
            title="Trigger VAX-2045 Excursion"
          >
            <Thermometer className="w-3 h-3 text-orange-500 shrink-0" />
            <span>Cold Excursion</span>
          </button>

          {/* Approve AI Response Plan */}
          <button
            onClick={approveAllImmediateActions}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-[11px] font-medium transition-all"
            title="Authorize autonomous rerouting & redeployment"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
            <span>Approve Plan</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={resetToBaseline}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-[11px] font-semibold transition-all shadow-xs"
            title="Restore original baseline state"
          >
            <RotateCcw className="w-3 h-3 text-indigo-500" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
