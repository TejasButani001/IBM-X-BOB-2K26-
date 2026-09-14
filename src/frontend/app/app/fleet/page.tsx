'use client';

import React from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import { MetricCard } from '../../../components/ui/MetricCard';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { Button } from '../../../components/ui/Button';
import {
  Truck,
  Anchor,
  Box,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
} from 'lucide-react';

export default function FleetPage() {
  const { fleet, metrics } = useControlTower();

  const trucks = fleet.filter((f) => f.type === 'Truck');
  const containers = fleet.filter((f) => f.type === 'Container');
  const vessels = fleet.filter((f) => f.type === 'Vessel');

  const idleTrucks = trucks.filter((t) => t.status === 'Idle');
  const activeCount = fleet.filter((f) => f.status === 'Active').length;
  const availableCount = fleet.filter((f) => f.status === 'Available').length;
  const idleCount = fleet.filter((f) => f.status === 'Idle').length;
  const maintenanceCount = fleet.filter((f) => f.status === 'Maintenance').length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Fleet Utilisation & Asset Optimization"
        subtitle="Real-time multi-asset telematics across prime movers, reefer containers, and coastal feeder vessels."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Fleet' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/app/fleet/assets">
              <Button variant="secondary" size="sm">
                Asset Registry ({fleet.length})
              </Button>
            </Link>
            <Link href="/app/fleet/redeployment">
              <Button variant="primary" size="sm" icon={Sparkles}>
                AI Redeployment Engine ({idleCount} Idle)
              </Button>
            </Link>
          </div>
        }
      />

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <MetricCard label="Total Assets" value={fleet.length} icon={Layers} />
        <MetricCard label="Active" value={activeCount} icon={Activity} variant="healthy" />
        <MetricCard label="Available" value={availableCount} icon={Truck} variant="info" />
        <MetricCard
          label="Idle Assets"
          value={idleCount}
          subValue="redeployment pool"
          icon={Truck}
          variant="warning"
        />
        <MetricCard label="Maintenance" value={maintenanceCount} icon={Activity} />
        <MetricCard
          label="Fleet Utilisation"
          value={`${metrics.fleetUtilisationPercent}%`}
          icon={TrendingUp}
          variant="info"
        />
      </div>

      {/* Featured Redeployment Opportunity Banner (Truck T04 in Ahmedabad) */}
      <div className="p-4 rounded-lg bg-amber-50/70 dark:bg-slate-900/90 border border-amber-200 dark:border-amber-800/60 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/80 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                HIGH MATCH IDLE ASSET: Truck T04 (Scania R500 Multi-Temp Reefer)
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold border border-emerald-200 dark:border-emerald-800/60">
                94% CORRIDOR MATCH
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Truck T04 has been idle for 19.5 hours in Ahmedabad. Equipped with 18.0T cryogenic refrigeration. Perfectly positioned to stage at Mundra Port to meet diverted shipment S101 and transfer VAX-2045 vaccines under active refrigeration.
            </p>
          </div>
        </div>

        <Link href="/app/fleet/redeployment" className="shrink-0">
          <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
            Redeploy Truck T04
          </Button>
        </Link>
      </div>

      {/* Categories Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Trucks */}
        <div className="p-4 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-sm">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Heavy Prime Movers</h3>
            </div>
            <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px] tabular-nums">{trucks.length} Units</span>
          </div>
          <div className="space-y-2">
            {trucks.slice(0, 4).map((t) => (
              <div
                key={t.id}
                className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{t.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{t.location} • {t.capacityTons}T {t.hasReefer ? 'Reefer' : 'Dry'}</div>
                </div>
                <StatusBadge status={t.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Containers */}
        <div className="p-4 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-sm">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Active Containers</h3>
            </div>
            <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px] tabular-nums">{containers.length} Units</span>
          </div>
          <div className="space-y-2">
            {containers.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{c.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{c.location} • {c.capacityTons}T {c.hasReefer ? 'Reefer' : 'Dry'}</div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Vessels */}
        <div className="p-4 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-sm">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Feeder Vessels</h3>
            </div>
            <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px] tabular-nums">{vessels.length} Units</span>
          </div>
          <div className="space-y-2">
            {vessels.slice(0, 4).map((v) => (
              <div
                key={v.id}
                className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{v.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{v.location} • {v.capacityTons} TEU</div>
                </div>
                <StatusBadge status={v.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
