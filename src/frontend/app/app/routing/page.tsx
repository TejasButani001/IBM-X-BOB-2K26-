'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function RoutingCenterPage() {
  const { alternativeRoutes, rerouteShipment, shipments } = useControlTower();
  const [selectedRouteId, setSelectedRouteId] = useState<string>('R-ALT-01');
  const [isApproved, setIsApproved] = useState(false);

  const targetShipment = shipments.find((s) => s.id === 'S101') || shipments[0];

  const handleApprove = (routeId: string) => {
    rerouteShipment('S101', routeId);
    setIsApproved(true);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="AI Multimodal Routing Center"
        subtitle="Side-by-side alternative route evaluation with explicit delay, cost, and capacity trade-offs."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'AI Routing' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Target Cargo:</span>
            <span className="font-mono font-semibold text-slate-800 dark:text-white px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs shadow-2xs">
              S101 (VAX-2045 mRNA Therapeutics)
            </span>
          </div>
        }
      />

      {/* Current Disrupted Route Baseline Banner */}
      <div className="p-4 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 shadow-enterprise flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider font-mono text-[11px]">
              CURRENT ROUTE (DISRUPTED)
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">Shanghai Port → JNPT Nhava Sheva (Mumbai)</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Vessel idling at outer anchorage due to D001 dockworkers strike. Cumulative expected delay is <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold">+77 hours</strong>. Risk score: <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold">94/100</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2.5 py-1 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800 font-mono text-xs font-bold">
            +77 Hours Delay
          </span>
        </div>
      </div>

      {/* Alternative Routes Grid (Side-by-side comparison) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {alternativeRoutes.map((route) => {
          const isRecommended = route.type === 'AI Recommended';
          const isSelected = selectedRouteId === route.id;

          return (
            <div
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`p-4 sm:p-5 rounded-lg flex flex-col justify-between cursor-pointer transition-all border shadow-enterprise ${
                isRecommended
                  ? 'bg-gradient-to-b from-indigo-50/70 via-white to-blue-50/40 dark:from-[#0B1024] dark:via-[#090E1A] dark:to-[#0C132B] border-2 border-indigo-500 shadow-enterprise'
                  : 'bg-white dark:bg-[#0B101D] border-slate-200/90 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                        isRecommended
                          ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/40'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {route.type}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      Score: {route.aiScore}/100
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{route.name}</h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                    <span>Via:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{route.via}</span>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-md bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-medium">Extra Delay</div>
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5 tabular-nums">
                      +{route.extraDelayHours}h
                    </div>
                    <div className="text-[10px] text-slate-400">vs +77h JNPT</div>
                  </div>

                  <div className="p-2 rounded-md bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-medium">Cost Delta</div>
                    <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 text-sm mt-0.5 tabular-nums">
                      +${route.estimatedCostUsd}
                    </div>
                    <div className="text-[10px] text-slate-400">(+{route.costDeltaPercent}%)</div>
                  </div>

                  <div className="p-2 rounded-md bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-medium">Risk Score</div>
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5 tabular-nums">
                      {route.riskScore}/100
                    </div>
                    <div className="text-[10px] text-slate-400">Low Exposure</div>
                  </div>

                  <div className="p-2 rounded-md bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-medium">Transit Total</div>
                    <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 text-sm mt-0.5 tabular-nums">
                      {route.durationHours}h
                    </div>
                    <div className="text-[10px] text-slate-400">Door-to-door</div>
                  </div>
                </div>

                {/* AI Rationale */}
                <div className="p-2.5 rounded-md bg-white/90 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed shadow-2xs">
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-bold block mb-0.5">
                    AI Selection Rationale
                  </span>
                  {route.aiExplanation}
                </div>

                {/* Carrier & Capacity */}
                <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Carrier Partner:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-[170px]">{route.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Berth Availability:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{route.capacityAvailable}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                <Link
                  href={`/app/routing/${route.id}`}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
                >
                  Inspect Checkpoints →
                </Link>
                <Button
                  variant={isRecommended ? 'primary' : 'secondary'}
                  size="sm"
                  icon={CheckCircle2}
                  onClick={() => handleApprove(route.id)}
                >
                  Approve Route
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

