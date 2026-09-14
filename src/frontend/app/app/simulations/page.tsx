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
  TrendingUp,
} from 'lucide-react';

export default function SimulationCenterPage() {
  const { disruptions } = useControlTower();
  const [selectedDisruption, setSelectedDisruption] = useState('D001');
  const [duration, setDuration] = useState<number>(48);
  const [region, setRegion] = useState('West Asia Corridor');
  const [severity, setSeverity] = useState('Major');
  const [hasApplied, setHasApplied] = useState(false);

  // Dynamic simulation calculations relative to 0h baseline
  const multiplier = duration / 24;
  const severityFactor = severity === 'Catastrophic' ? 1.4 : severity === 'Major' ? 1.0 : 0.7;

  // Baseline vs Simulated metrics
  const baselineAffected = 18;
  const simAffected = Math.round(baselineAffected + 23 * multiplier * severityFactor);

  const baselineDelay = 8;
  const simDelay = Math.round(baselineDelay + 21 * multiplier * severityFactor);

  const baselineCritical = 2;
  const simCritical = Math.round(baselineCritical + 5 * multiplier * severityFactor);

  const baselineFleetDemand = 2;
  const simFleetDemand = Math.round(baselineFleetDemand + 4 * multiplier * severityFactor);

  const baselineColdChainRisk = 2;
  const simColdChainRisk = Math.round(baselineColdChainRisk + 3 * multiplier * severityFactor);

  const handleApplyScenario = () => {
    setHasApplied(true);
  };

  const handleReset = () => {
    setDuration(24);
    setSeverity('Major');
    setHasApplied(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="What happens if the disruption continues?"
        subtitle="Decision-support simulation sandbox modeling cascading logistics bottlenecks across global trade corridors."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Simulations' },
        ]}
      />

      {/* Simulator Control Board */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5 text-xs shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white text-sm">Disruption Escalation Controls</h3>
          </div>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-white flex items-center gap-1 font-mono text-[11px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Disruption Event</label>
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
            <label className="block text-slate-300 font-medium mb-1">Corridor / Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="West Asia Corridor">West Asia Corridor</option>
              <option value="Trans-Pacific">Trans-Pacific</option>
              <option value="Indo-Pacific">Indo-Pacific</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Scenario Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="Moderate">Moderate Escalation</option>
              <option value="Major">Major Escalation</option>
              <option value="Catastrophic">Catastrophic Walkout</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={handleApplyScenario}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Apply Scenario</span>
            </button>
          </div>
        </div>

        {/* Interactive Duration Slider */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-slate-300 font-bold uppercase tracking-wider text-[11px]">
              Escalation Horizon Slider: {duration} Hours
            </span>
            <span className="font-mono text-indigo-400 font-bold text-xs bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              +{duration}h Cumulative Hold
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={72}
            step={12}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-indigo-500 bg-slate-950 h-2.5 rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
            <span className={duration === 0 ? 'text-indigo-400 font-bold' : ''}>0h (Now)</span>
            <span className={duration === 12 ? 'text-indigo-400 font-bold' : ''}>12h</span>
            <span className={duration === 24 ? 'text-indigo-400 font-bold' : ''}>24h</span>
            <span className={duration === 36 ? 'text-indigo-400 font-bold' : ''}>36h</span>
            <span className={duration === 48 ? 'text-indigo-400 font-bold' : ''}>48h</span>
            <span className={duration === 72 ? 'text-indigo-400 font-bold' : ''}>72h (Worst Case)</span>
          </div>
        </div>
      </div>

      {/* Dynamic State Comparison: CURRENT STATE vs SIMULATED STATE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-xs uppercase font-bold text-slate-400 tracking-wider">
            CURRENT STATE vs SIMULATED STATE DELTA (+{duration}h HORIZON)
          </h3>
          {hasApplied && (
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px] font-bold">
              Scenario Active
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-xs">
          {/* Affected Shipments */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 transition-all">
            <span className="text-slate-400 text-[10px] uppercase font-mono font-bold">Affected Shipments</span>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-slate-400 text-lg">{baselineAffected}</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-2xl font-bold text-rose-400 tabular-nums">{simAffected}</span>
            </div>
            <div className="text-[11px] text-rose-400 font-mono">+{simAffected - baselineAffected} additional loads</div>
          </div>

          {/* Average Delay */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 transition-all">
            <span className="text-slate-400 text-[10px] uppercase font-mono font-bold">Average ETA Delay</span>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-slate-400 text-lg">+{baselineDelay}h</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-2xl font-bold text-amber-400 tabular-nums">+{simDelay}h</span>
            </div>
            <div className="text-[11px] text-amber-400 font-mono">+{simDelay - baselineDelay}h dwell surge</div>
          </div>

          {/* Critical Shipments */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 transition-all">
            <span className="text-slate-400 text-[10px] uppercase font-mono font-bold">Critical Risk Shipments</span>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-slate-400 text-lg">{baselineCritical}</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-2xl font-bold text-rose-400 tabular-nums">{simCritical}</span>
            </div>
            <div className="text-[11px] text-rose-400 font-mono">+{simCritical - baselineCritical} high priority</div>
          </div>

          {/* Emergency Fleet Demand */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 transition-all">
            <span className="text-slate-400 text-[10px] uppercase font-mono font-bold">Fleet Demand</span>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-slate-400 text-lg">+{baselineFleetDemand}</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-2xl font-bold text-indigo-400 tabular-nums">+{simFleetDemand}</span>
            </div>
            <div className="text-[11px] text-indigo-400 font-mono font-bold">+{simFleetDemand - baselineFleetDemand} reefer trucks</div>
          </div>

          {/* Cold-Chain Risk */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 transition-all">
            <span className="text-slate-400 text-[10px] uppercase font-mono font-bold">Cold-Chain Excursions</span>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-slate-400 text-lg">{baselineColdChainRisk}</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-2xl font-bold text-orange-400 tabular-nums">{simColdChainRisk}</span>
            </div>
            <div className="text-[11px] text-orange-400 font-mono font-bold">+{simColdChainRisk - baselineColdChainRisk} units breached</div>
          </div>
        </div>
      </div>

      {/* AI Proactive Mitigation Insight */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-900/60 shadow-xl space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white text-sm">
              AI Decision Recommendation for {duration}-Hour Horizon
            </h3>
          </div>
          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            Confidence: 94.8%
          </span>
        </div>

        <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
          {duration >= 48
            ? `Under a ${duration}h strike horizon, waiting at JNPT outer anchorage creates irreversible thermal damage for S101 and triggers automotive assembly shutdown in Pune. Rerouting all Tier-1 shipments to Mundra Port immediately recovers ${simDelay - 12} hours and redeploys 4 idle reefer assets.`
            : `Under a ${duration}h short horizon, feeder vessels absorb delay within normal sea margins. Cold-chain container VAX-2045 requires continuous telemetry monitoring.`}
        </p>

        <div className="pt-2 flex items-center gap-3">
          <Link
            href="/app/routing"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-600/20"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Execute Mundra Reroute Plan</span>
          </Link>
          <Link
            href="/app/fleet"
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
          >
            Inspect Redeployable Assets
          </Link>
        </div>
      </div>
    </div>
  );
}
