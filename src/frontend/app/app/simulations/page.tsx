'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import {
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Truck,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function SimulationCenterPage() {
  const { disruptions, shipments, fleet } = useControlTower();
  const [selectedDisruption, setSelectedDisruption] = useState('D001');
  const [duration, setDuration] = useState<number>(48);
  const [hasRun, setHasRun] = useState(true);

  // Dynamic simulation multipliers based on duration
  const multiplier = duration / 24;
  const simAffectedShipments = Math.min(50, Math.round(18 * (multiplier === 1 ? 0.6 : multiplier === 2 ? 1.0 : 1.4)));
  const simAvgDelay = Math.round(38 * multiplier);
  const simRiskScore = Math.min(99, Math.round(65 + 10 * multiplier));
  const simIdleAssetsRequired = Math.round(2 * multiplier);
  const simColdChainAtRisk = multiplier >= 2 ? 3 : 1;

  const handleRunSimulation = () => {
    setHasRun(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="What-If Disruption Simulation Sandbox"
        subtitle="Stress-test global trade corridors against escalating labor walkouts, weather events, and draft restrictions."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Simulations' },
        ]}
      />

      {/* Configuration Controls Card */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5 text-xs">
        <h3 className="font-bold text-white text-sm">Simulation Parameters</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Target Disruption</label>
            <select
              value={selectedDisruption}
              onChange={(e) => setSelectedDisruption(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="D001">D001: Mumbai Port Strike (JNPT)</option>
              <option value="D002">D002: Red Sea Maritime Security Advisory</option>
              <option value="D003">D003: Typhoon Lan Shanghai Anchorage</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-slate-300 font-medium">Disruption Duration</label>
              <span className="font-mono text-indigo-400 font-bold">{duration} Hours</span>
            </div>
            <input
              type="range"
              min={24}
              max={72}
              step={24}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-950 h-2 rounded-lg cursor-pointer mt-2"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>24h</span>
              <span>48h (Current)</span>
              <span>72h (Worst-Case)</span>
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleRunSimulation}
              className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Run Simulation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Simulation Results (Before vs After Cascade) */}
      {hasRun && (
        <div className="space-y-6">
          {/* Comparison Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-medium">Affected Shipments</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-rose-400">
                  {simAffectedShipments}
                </span>
                <span className="text-slate-500 font-mono text-[11px]">(+{simAffectedShipments - 11})</span>
              </div>
              <div className="text-[11px] text-slate-400">Escalates from 11 to {simAffectedShipments}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-medium">Average ETA Delay Surge</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-amber-400">
                  +{simAvgDelay}h
                </span>
                <span className="text-slate-500 font-mono text-[11px]">(cumulative dwell)</span>
              </div>
              <div className="text-[11px] text-slate-400">Anchor hold times extended</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-medium">Cold-Chain Units at Risk</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-orange-400">
                  {simColdChainAtRisk} Units
                </span>
                <span className="text-rose-400 font-mono text-[11px]">VAX-2045</span>
              </div>
              <div className="text-[11px] text-slate-400">Genset diesel runout risk</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-medium">Emergency Fleet Needed</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-indigo-400">
                  {simIdleAssetsRequired} Trucks
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">T04 & T08 matched</span>
              </div>
              <div className="text-[11px] text-slate-400">Available in Ahmedabad/Vadodara</div>
            </div>
          </div>

          {/* AI Autonomous Mitigation Recommendation */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-navy-900 via-slate-900 to-indigo-950/40 border border-indigo-900/60 shadow-xl space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-white text-sm">
                  Recommended Proactive Response for {duration}-Hour Horizon
                </h3>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Confidence: 94%
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {duration >= 48
                ? 'Under a 48h to 72h strike horizon, waiting at JNPT outer anchorage creates irreversible thermal damage for S101 and triggers automotive assembly shutdown in Pune. Rerouting all Tier-1 shipments to Mundra Port immediately recovers 71 hours and preserves $3.4M in oncology therapeutics.'
                : 'Under a 24h short strike horizon, feeder vessels may absorb delay within sea margins. However, high-priority cold-chain container VAX-2045 must still be monitored closely.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/app/action-center"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authorize Response Plan</span>
              </Link>
              <Link
                href="/app/routing"
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                Inspect Mundra Bypass Route
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
