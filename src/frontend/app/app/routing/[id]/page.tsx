'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useControlTower } from '../../../../context/ControlTowerContext';
import { PageHeader } from '../../../../components/ui/PageHeader';
import { RiskBadge } from '../../../../components/ui/RiskBadge';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  DollarSign,
  MapPin,
  Sliders,
  Sparkles,
} from 'lucide-react';

export default function RouteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'R-ALT-01';
  const { alternativeRoutes, rerouteShipment } = useControlTower();

  const [simulationHours, setSimulationHours] = useState<number>(48);
  const [isApproved, setIsApproved] = useState(false);

  const route = alternativeRoutes.find((r) => r.id === id) || alternativeRoutes[0];

  const handleApprove = () => {
    rerouteShipment('S101', route.id);
    setIsApproved(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Route ${route.id}: ${route.name}`}
        subtitle={`Via: ${route.via} • Carrier: ${route.carrier}`}
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'AI Routing', href: '/app/routing' },
          { label: route.id },
        ]}
        badge={
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            {route.type}
          </span>
        }
        actions={
          <button
            onClick={handleApprove}
            disabled={isApproved}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold shadow-md transition-all ${
              isApproved
                ? 'bg-emerald-800 text-emerald-100 cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isApproved ? 'Route Approved & EDI Sent' : 'Approve This Route'}</span>
          </button>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">AI Optimization Score</div>
          <div className="mt-1 text-2xl font-bold font-mono text-emerald-400">{route.aiScore}/100</div>
          <div className="text-slate-400 mt-1">Recommended Choice</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Extra Delay Delta</div>
          <div className="mt-1 text-2xl font-bold font-mono text-emerald-400">+{route.extraDelayHours}h</div>
          <div className="text-slate-400 mt-1">Saves 71h vs JNPT</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Estimated Freight Cost</div>
          <div className="mt-1 text-2xl font-bold font-mono text-white">${route.estimatedCostUsd}</div>
          <div className="text-slate-400 mt-1">+{route.costDeltaPercent}% premium</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Berth Capacity</div>
          <div className="mt-1 font-bold text-emerald-400 text-sm truncate">{route.capacityAvailable}</div>
          <div className="text-slate-400 mt-1">Direct Truck T04 Transfer</div>
        </div>
      </div>

      {/* Interactive Disruption Simulation Slider */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Disruption Duration What-If Slider</h3>
          </div>
          <span className="font-mono text-xs text-indigo-300 font-bold bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
            {simulationHours} Hours Strike Duration
          </span>
        </div>

        <input
          type="range"
          min={24}
          max={72}
          step={24}
          value={simulationHours}
          onChange={(e) => setSimulationHours(Number(e.target.value))}
          className="w-full accent-indigo-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between text-[11px] font-mono text-slate-400">
          <span>24 Hours (Moderate Backlog)</span>
          <span>48 Hours (Severe Choke)</span>
          <span>72 Hours (Total Terminal Freeze)</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 space-y-1 text-xs">
          <span className="font-semibold text-white">Simulation Impact at {simulationHours} Hours:</span>
          <p className="text-slate-400">
            {simulationHours === 24
              ? 'At 24h duration, JNPT dwell time increases to 38h. Diverting to Mundra saves 32 hours.'
              : simulationHours === 48
              ? 'At 48h duration, JNPT offshore anchorage contains 18 vessels. Diverting to Mundra saves 54 hours and preserves cold-chain buffer.'
              : 'At 72h duration, JNPT enters gridlock (+77h delay). Mundra Port route R-ALT-01 is essential to prevent complete $3.4M cargo loss.'}
          </p>
        </div>
      </div>

      {/* Checkpoint Sequence */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Sequential Corridor Checkpoints</h3>
          </div>
          <span className="text-slate-400 font-mono">{route.routeCheckpoints.length} Stages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {route.routeCheckpoints.map((cp, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2.5"
            >
              <div className="w-6 h-6 rounded bg-indigo-950 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-800/60">
                0{idx + 1}
              </div>
              <div className="space-y-0.5">
                <div className="font-semibold text-white text-xs">{cp}</div>
                <div className="text-[10px] text-emerald-400 font-mono">Scheduled & Available</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
