'use client';

import React from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import { MetricCard } from '../../../components/ui/MetricCard';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { RiskBadge } from '../../../components/ui/RiskBadge';
import { Button } from '../../../components/ui/Button';
import {
  Package,
  AlertTriangle,
  Truck,
  Thermometer,
  Activity,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Radio,
  MapPin,
} from 'lucide-react';

export default function OverviewPage() {
  const {
    metrics,
    disruptions,
    shipments,
    fleet,
    coldChain,
    actionPlan,
    approveAllImmediateActions,
  } = useControlTower();

  const activeDisruptionsList = disruptions.filter((d) => d.status === 'Active');
  const criticalShipments = shipments
    .filter((s) => s.riskScore >= 80 || s.status === 'Disrupted' || s.status === 'At Risk')
    .slice(0, 5);
  const idleAssets = fleet.filter((f) => f.status === 'Idle').slice(0, 4);
  const pendingActions = actionPlan.filter((a) => a.status === 'Pending Approval');

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <PageHeader
        title="Operations Control Tower"
        subtitle="Real-time multi-modal logistics telemetry, predictive risk monitoring, and autonomous intervention engine."
        badge={
          <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Network Telemetry
          </span>
        }
        actions={
          <div className="flex items-center gap-2">
            <Link href="/app/copilot">
              <Button variant="secondary" size="sm" icon={Sparkles}>
                Ask Copilot
              </Button>
            </Link>
            <Link href="/app/action-center">
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                Action Center ({pendingActions.length})
              </Button>
            </Link>
          </div>
        }
      />

      {/* KPI Cards Row (6 metrics) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          label="Active Shipments"
          value={metrics.totalShipments}
          icon={Package}
          change="+8% vs avg"
        />
        <MetricCard
          label="At-Risk Shipments"
          value={metrics.atRiskShipments}
          subValue="require action"
          icon={AlertTriangle}
          variant={metrics.atRiskShipments > 0 ? 'critical' : 'healthy'}
          change="+18 during strike"
          isNegativeChange
        />
        <MetricCard
          label="Active Disruptions"
          value={metrics.activeDisruptions}
          icon={ShieldAlert}
          variant={metrics.activeDisruptions > 0 ? 'critical' : 'healthy'}
        />
        <MetricCard
          label="Idle Fleet Assets"
          value={metrics.idleFleetAssets}
          subValue="ready to deploy"
          icon={Truck}
          variant="warning"
        />
        <MetricCard
          label="Cold-Chain Alerts"
          value={metrics.coldChainAlerts}
          icon={Thermometer}
          variant={metrics.coldChainAlerts > 0 ? 'critical' : 'healthy'}
          change="VAX-2045 9.7°C"
          isNegativeChange
        />
        <MetricCard
          label="On-Time Rate"
          value={`${metrics.onTimePerformancePercent}%`}
          icon={Activity}
          variant="info"
          change="Target: 95%"
        />
      </div>

      {/* Hero Operational Alert: Disruption D001 Cascading Impact Banner */}
      <div className="p-4 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 shadow-enterprise flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                CRITICAL DISRUPTION D001: Mumbai Port Strike & Berth Congestion
              </span>
              <RiskBadge severity="critical" score={92} size="sm" />
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                JNPT Nhava Sheva (IN)
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Crane walkout at Nhava Sheva immobilizing 18 shipments (est. delay +77h). 3 cold-chain units at risk. Autonomous plan synthesised: reroute S101 via Mundra Port and redeploy Truck T04 from Ahmedabad.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
          <Link href="/app/disruptions/D001">
            <Button variant="danger" size="sm">
              Review Detail
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            icon={CheckCircle2}
            onClick={approveAllImmediateActions}
          >
            Approve AI Plan
          </Button>
        </div>
      </div>

      {/* Main Grid: Left 2 Cols (Tables & Corridor Network) & Right 1 Col (AI Recommendations & Watch) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols */}
        <div className="lg:col-span-2 space-y-5">
          {/* Active Disruptions Table Card */}
          <div className="rounded-lg border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] shadow-enterprise overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Active Global Disruptions
                </h3>
                <span className="text-[11px] font-mono text-slate-400">({activeDisruptionsList.length})</span>
              </div>
              <Link
                href="/app/disruptions"
                className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center gap-0.5"
              >
                <span>View all</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {activeDisruptionsList.map((d) => (
                <Link
                  key={d.id}
                  href={`/app/disruptions/${d.id}`}
                  className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group block"
                >
                  <div className="space-y-0.5 min-w-0 pr-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                        {d.id}: {d.name}
                      </span>
                      <RiskBadge severity={d.severity} score={d.cascadeRiskScore} size="sm" />
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-2 sm:gap-3 flex-wrap">
                      <span>{d.location}</span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-rose-600 dark:text-rose-400 font-medium">
                        {d.affectedShipmentIds.length} shipments affected
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span>Type: {d.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={d.status} />
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Critical & At-Risk Shipments Priority Table */}
          <div className="rounded-lg border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] shadow-enterprise overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-orange-500" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Critical & At-Risk Shipments
                </h3>
                <span className="text-[11px] font-mono text-slate-400">({criticalShipments.length} prioritised)</span>
              </div>
              <Link
                href="/app/shipments"
                className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center gap-0.5"
              >
                <span>Full Shipment Table</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50/80 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 sticky top-0">
                  <tr>
                    <th className="py-2.5 px-3">Shipment</th>
                    <th className="py-2.5 px-3">Route</th>
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3 text-right">Risk Score</th>
                    <th className="py-2.5 px-3 text-right">Est. Delay</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {criticalShipments.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-3">
                        <Link
                          href={`/app/shipments/${s.id}`}
                          className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5"
                        >
                          <span className="font-mono">{s.id}</span>
                          {s.isColdChain && (
                            <Thermometer className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          )}
                        </Link>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                          {s.cargo}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                        <div className="font-medium truncate">{s.origin}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500">→ {s.destination}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${
                            s.priority === 'Critical'
                              ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50'
                              : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50'
                          }`}
                        >
                          {s.priority}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                        {s.riskScore}/100
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-amber-600 dark:text-amber-400 tabular-nums font-semibold">
                        {s.delayHours > 0 ? `+${s.delayHours}h` : 'On Time'}
                      </td>
                      <td className="py-2.5 px-3">
                        <StatusBadge status={s.status} size="sm" />
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <Link
                          href={`/app/shipments/${s.id}`}
                          className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-medium transition-colors"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Connected Network Corridors & Bypass Lanes */}
          <div className="rounded-lg border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] shadow-enterprise p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Active Corridor Network & Bypass Lanes
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                Mundra Bypass Active
              </span>
            </div>

            <div className="p-3.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <strong className="text-slate-900 dark:text-white font-medium">
                    Corridor 1: Shanghai → JNPT Mumbai (Primary)
                  </strong>
                </div>
                <span className="text-rose-600 dark:text-rose-400 font-mono text-[11px] font-semibold">
                  BLOCKED (72h Strike)
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <strong className="text-slate-900 dark:text-white font-medium">
                    Corridor 2: Shanghai → Mundra Port → Truck T04 to Mumbai
                  </strong>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold">
                  OPTIMAL (+6h delay vs +77h)
                </span>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/60">
                <span>Fleet Relay: Truck T04 (Ahmedabad) 94% Matched</span>
                <Link
                  href="/app/routing"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
                >
                  Compare Routes in Routing Center →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: AI Recommendations + Cold-Chain + Fleet */}
        <div className="space-y-5">
          {/* AI Autonomous Response Plan Card (Clearly distinct AI UI) */}
          <div className="rounded-lg border border-indigo-200 dark:border-indigo-800/60 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/40 dark:from-[#0B1024] dark:via-[#090E1A] dark:to-[#0C132B] p-4 space-y-3.5 shadow-enterprise">
            <div className="flex items-center justify-between pb-2.5 border-b border-indigo-100 dark:border-indigo-900/40">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Bob AI Autonomous Plan
                  </h3>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    L2 Operations Dispatch
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                96% Confidence
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Synthesized response resolving the Mumbai choke point across routing, fleet redeployment, and cold-chain integrity.
            </p>

            <div className="space-y-2 text-xs">
              {actionPlan.slice(0, 3).map((act) => (
                <div
                  key={act.id}
                  className="p-2.5 rounded-md bg-white/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-800 dark:text-white truncate">
                      {act.title}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                        act.status === 'Approved'
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
                          : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40'
                      }`}
                    >
                      {act.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {act.reason}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-1">
              <Link href="/app/action-center" className="block w-full">
                <Button variant="ai" size="sm" className="w-full">
                  <span>Authorize in Action Center</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Cold-Chain Quick Monitor */}
          <div className="rounded-lg border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] shadow-enterprise p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-500" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Cold-Chain Excursion Watch
                </h3>
              </div>
              <Link
                href="/app/cold-chain"
                className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
              >
                All Sensors
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {coldChain.slice(0, 2).map((c) => (
                <Link
                  key={c.id}
                  href={`/app/cold-chain/${c.id}`}
                  className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors block space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{c.id}</span>
                    <span
                      className={`font-mono text-xs font-bold tabular-nums ${
                        c.severity === 'critical'
                          ? 'text-rose-600 dark:text-rose-400'
                          : c.severity === 'warning'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {c.currentTemperature}°C
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{c.cargo}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-800/60">
                    <span>Safe: {c.requiredRange}</span>
                    <span className="text-rose-600 dark:text-rose-400 font-medium font-mono">
                      {c.excursionDurationMins}m Excursion
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Idle Fleet Standby */}
          <div className="rounded-lg border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] shadow-enterprise p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Idle Fleet Standby
                </h3>
              </div>
              <Link
                href="/app/fleet/redeployment"
                className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
              >
                Redeploy
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {idleAssets.map((f) => (
                <div
                  key={f.id}
                  className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
                >
                  <div className="truncate">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{f.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {f.location} • {f.capacityTons}T
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 shrink-0">
                    Idle {f.idleDurationHours}h
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

