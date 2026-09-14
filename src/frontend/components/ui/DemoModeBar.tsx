'use client';

import React from 'react';
import { useControlTower } from '../../context/ControlTowerContext';
import { RotateCcw, AlertTriangle, ShieldCheck, Thermometer } from 'lucide-react';

export const DemoModeBar: React.FC = () => {
  const {
    demoScenario,
    triggerMumbaiStrike,
    triggerColdChainExcursion,
    approveAllImmediateActions,
    resetToBaseline,
    metrics,
  } = useControlTower();

  return (
    <div className="bg-slate-100 dark:bg-[#060911] border-b border-slate-200 dark:border-slate-800/90 px-3 sm:px-4 py-1.5 text-xs text-slate-600 dark:text-slate-300 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 tracking-wider">
            DEMO ENGINE
          </span>
          <span className="hidden sm:inline text-slate-500 dark:text-slate-400 text-[11px]">
            Scenario:
          </span>
          <span className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            {demoScenario === 'mumbai-strike'
              ? 'Mumbai Port Strike (JNPT)'
              : demoScenario === 'cold-chain-excursion'
              ? 'Cold-Chain Excursion (VAX-2045)'
              : demoScenario === 'cascade-resolved'
              ? 'AI Response Plan Approved'
              : 'Nominal Baseline'}
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden md:inline">•</span>
          <span className="text-slate-500 dark:text-slate-400 hidden md:inline text-[11px]">
            At-Risk: <strong className="text-rose-600 dark:text-rose-400 font-mono">{metrics.atRiskShipments}</strong>
          </span>
          <span className="text-slate-500 dark:text-slate-400 hidden lg:inline text-[11px]">
            Idle Fleet: <strong className="text-amber-600 dark:text-amber-400 font-mono">{metrics.idleFleetAssets}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={triggerMumbaiStrike}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 text-[11px] font-medium transition-all"
            title="Simulate 72-hour crane walkout at Nhava Sheva (JNPT)"
          >
            <AlertTriangle className="w-3 h-3 text-rose-500 shrink-0" />
            <span>Mumbai Strike</span>
          </button>

          <button
            onClick={triggerColdChainExcursion}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-orange-50 dark:bg-orange-950/50 hover:bg-orange-100 dark:hover:bg-orange-900/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60 text-[11px] font-medium transition-all"
            title="Spike VAX-2045 temperature beyond safe 8.0°C"
          >
            <Thermometer className="w-3 h-3 text-orange-500 shrink-0" />
            <span>Cold Excursion</span>
          </button>

          <button
            onClick={approveAllImmediateActions}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-[11px] font-medium transition-all"
            title="Authorize autonomous rerouting via Mundra & Truck T04 dispatch"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
            <span>Approve AI Plan</span>
          </button>

          <button
            onClick={resetToBaseline}
            className="p-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors"
            title="Reset to Initial Baseline"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

