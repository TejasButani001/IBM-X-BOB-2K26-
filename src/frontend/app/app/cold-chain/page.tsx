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
  Thermometer,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Radio,
} from 'lucide-react';

export default function ColdChainPage() {
  const { coldChain, triggerColdChainExcursion } = useControlTower();

  const criticalCount = coldChain.filter((c) => c.severity === 'critical').length;
  const majorCount = coldChain.filter((c) => c.severity === 'major').length;
  const warningCount = coldChain.filter((c) => c.severity === 'warning').length;
  const healthyCount = coldChain.filter((c) => c.severity === 'healthy').length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Kinetic Cold-Chain Telemetry & Excursions"
        subtitle="Continuous thermal tracking for pharmaceuticals, biologics, and perishable foods with Arrhenius kinetic shelf-life modeling."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Cold-Chain' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="danger"
              size="sm"
              icon={AlertTriangle}
              onClick={triggerColdChainExcursion}
            >
              Simulate VAX-2045 Excursion
            </Button>
          </div>
        }
      />

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
        <MetricCard
          label="Monitored Reefer Units"
          value={coldChain.length}
          icon={Thermometer}
        />
        <MetricCard
          label="Critical Excursions"
          value={criticalCount}
          subValue=">8.0°C limit"
          icon={AlertTriangle}
          variant={criticalCount > 0 ? 'critical' : 'healthy'}
          change="VAX-2045"
          isNegativeChange
        />
        <MetricCard
          label="Major Breach"
          value={majorCount}
          icon={AlertTriangle}
          variant={majorCount > 0 ? 'warning' : 'healthy'}
        />
        <MetricCard
          label="Warning Threshold"
          value={warningCount}
          icon={Thermometer}
          variant={warningCount > 0 ? 'warning' : 'healthy'}
        />
        <MetricCard
          label="Nominal & Safe"
          value={healthyCount}
          icon={CheckCircle2}
          variant="healthy"
        />
      </div>

      {/* Active Excursion Warning Banner */}
      {criticalCount > 0 && (
        <div className="p-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shrink-0">
              <Thermometer className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  CRITICAL EXCURSION: Unit VAX-2045 (Shipment S101)
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-mono font-bold border border-rose-200 dark:border-rose-800/60">
                  9.7°C (47 MINS EXCURSION)
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Oncology mRNA Therapeutics exceeded the 8.0°C maximum threshold for 47 cumulative minutes outside JNPT. Kinetic stability tolerance window is 75 minutes remaining before permanent batch denaturation.
              </p>
            </div>
          </div>

          <Link
            href="/app/cold-chain/VAX-2045"
            className="px-3.5 py-1.5 rounded-md bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
          >
            Inspect Thermal Telemetry →
          </Link>
        </div>
      )}

      {/* Cold-Chain Monitored Shipments Table */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B101D] overflow-hidden shadow-sm">
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Live Thermocouple Telemetry Table</h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Continuous 15m Telemetry Poll</span>
        </div>

        <div className="overflow-x-auto max-h-[600px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 bg-slate-50 dark:bg-slate-950/90 backdrop-blur-sm text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 z-10">
              <tr>
                <th className="py-2.5 px-3">Unit ID</th>
                <th className="py-2.5 px-3">Shipment</th>
                <th className="py-2.5 px-3">Cargo Description</th>
                <th className="py-2.5 px-3">Required Range</th>
                <th className="py-2.5 px-3 text-right">Live Temperature</th>
                <th className="py-2.5 px-3 text-right">Excursion Time</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Sensor Health</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {coldChain.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${
                    item.severity === 'critical' ? 'bg-rose-50/50 dark:bg-rose-950/20' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-bold font-mono">
                    <Link href={`/app/cold-chain/${item.id}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      {item.id}
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-700 dark:text-slate-300">
                    <Link href={`/app/shipments/${item.shipmentId}`} className="hover:underline font-semibold">
                      {item.shipmentId}
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 max-w-[200px] truncate">{item.cargo}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">{item.requiredRange}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-xs text-right tabular-nums">
                    <span
                      className={
                        item.severity === 'critical'
                          ? 'text-rose-600 dark:text-rose-400 font-bold animate-pulse'
                          : item.severity === 'warning'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }
                    >
                      {item.currentTemperature}°C
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-right tabular-nums">
                    {item.excursionDurationMins > 0 ? (
                      <span className="text-rose-600 dark:text-rose-400 font-bold">
                        {item.excursionDurationMins} mins
                      </span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400 font-normal">0m (Normal)</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400 max-w-[150px] truncate">{item.location}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        item.sensorHealth === 'Healthy'
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50'
                          : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50'
                      }`}
                    >
                      {item.sensorHealth} ({item.batteryLevel}%)
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <RiskBadge severity={item.severity} />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <Link
                      href={`/app/cold-chain/${item.id}`}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Telemetry</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
