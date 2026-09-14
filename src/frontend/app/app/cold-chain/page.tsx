'use client';

import React, { useState } from 'react';
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
  Clock,
  Battery,
  MapPin,
  ShieldAlert,
  Sparkles,
  Zap,
  X,
  TrendingUp,
} from 'lucide-react';

export default function ColdChainPage() {
  const { coldChain, triggerColdChainExcursion, approveAction } = useControlTower();

  const [simulatedTemp, setSimulatedTemp] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const criticalCount = coldChain.filter((c) => c.severity === 'critical').length;
  const majorCount = coldChain.filter((c) => c.severity === 'major').length;
  const warningCount = coldChain.filter((c) => c.severity === 'warning').length;
  const healthyCount = coldChain.filter((c) => c.severity === 'healthy').length;
  const activeExcursionsCount = coldChain.filter((c) => c.excursionDurationMins > 0).length;

  const handleSimulateExcursion = () => {
    triggerColdChainExcursion();
    setSimulatedTemp(10.5);
    setToastMessage('⚠️ Temperature Excursion Simulated! Unit VAX-2045 spiked to 10.5°C. Action item dispatched to Action Center & Copilot.');
    setTimeout(() => setToastMessage(null), 6000);
  };

  // Sensor readings for the main time-series chart
  const sensorReadings = [
    { time: '08:00 AM', temp: 5.2, safeMin: 2.0, safeMax: 8.0 },
    { time: '08:30 AM', temp: 5.8, safeMin: 2.0, safeMax: 8.0 },
    { time: '09:00 AM', temp: 7.1, safeMin: 2.0, safeMax: 8.0 },
    { time: '09:15 AM', temp: 8.5, safeMin: 2.0, safeMax: 8.0, isBreach: true, label: 'Excursion Start (09:15)' },
    { time: '09:30 AM', temp: simulatedTemp || 10.0, safeMin: 2.0, safeMax: 8.0, isBreach: true, label: 'Peak (10.0°C)' },
    { time: '09:45 AM', temp: 9.7, safeMin: 2.0, safeMax: 8.0, isBreach: true },
    { time: '10:02 AM', temp: 7.8, safeMin: 2.0, safeMax: 8.0, label: 'Excursion End (10:02)' },
  ];

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-rose-900 text-white border border-rose-500 shadow-2xl flex items-center gap-3 text-xs font-semibold animate-bounce">
          <AlertTriangle className="w-5 h-5 text-rose-300 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-rose-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Kinetic Cold-Chain Telemetry & Excursions"
        subtitle="Continuous thermal tracking for pharmaceuticals, biologics, and perishable foods with Arrhenius kinetic shelf-life modeling."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Cold-Chain' },
        ]}
        badge={
          <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Pre-Delivery Thermal Risk Active
          </span>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="danger"
              size="sm"
              icon={AlertTriangle}
              onClick={handleSimulateExcursion}
            >
              Simulate Temperature Excursion
            </Button>
          </div>
        }
      />

      {/* COLD-CHAIN OVERVIEW KPIS (6 metrics) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <MetricCard
          label="Active Cold-Chain"
          value={coldChain.length}
          icon={Thermometer}
        />
        <MetricCard
          label="Normal & Safe"
          value={healthyCount}
          icon={CheckCircle2}
          variant="healthy"
        />
        <MetricCard
          label="Warning Threshold"
          value={warningCount}
          icon={Thermometer}
          variant={warningCount > 0 ? 'warning' : 'healthy'}
        />
        <MetricCard
          label="Major Breach"
          value={majorCount}
          icon={AlertTriangle}
          variant={majorCount > 0 ? 'warning' : 'healthy'}
        />
        <MetricCard
          label="Critical Excursions"
          value={criticalCount}
          subValue=">8.0°C limit"
          icon={AlertTriangle}
          variant={criticalCount > 0 ? 'critical' : 'healthy'}
          change="VAX-2045 9.7°C"
          isNegativeChange
        />
        <MetricCard
          label="Active Excursions"
          value={activeExcursionsCount}
          icon={Radio}
          variant="critical"
          change="2 Units Exceeded"
          isNegativeChange
        />
      </div>

      {/* MAIN VISUALIZATION: LARGE TEMPERATURE MONITORING CHART */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Continuous Telemetry Chart: Unit VAX-2045 (mRNA Oncology Biologics)
            </h2>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-3 h-1 bg-emerald-500 rounded" /> Configured Min (2.0°C)
            </span>
            <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
              <span className="w-3 h-1 bg-rose-500 rounded" /> Configured Max (8.0°C)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
              <span className="w-3 h-1 bg-indigo-600 rounded" /> Actual Thermocouple Sensor
            </span>
          </div>
        </div>

        {/* Temperature Curve Visual Bar & Threshold Area */}
        <div className="p-4 rounded-lg bg-slate-900/95 dark:bg-slate-950 border border-slate-800 space-y-4">
          <div className="h-52 flex items-end justify-between gap-3 pt-8 px-4 border-b border-slate-800 relative">
            {/* Threshold line max 8.0°C overlay */}
            <div className="absolute left-0 right-0 top-[35%] border-t-2 border-dashed border-rose-500/80 z-0 flex items-center justify-between px-2 text-[10px] font-mono text-rose-400">
              <span>MAXIMUM SAFE THRESHOLD: 8.0°C</span>
              <span>EXCURSION ZONE (&gt;8.0°C)</span>
            </div>

            {/* Threshold line min 2.0°C overlay */}
            <div className="absolute left-0 right-0 bottom-[15%] border-t border-dashed border-emerald-500/80 z-0 flex items-center justify-between px-2 text-[10px] font-mono text-emerald-400">
              <span>MINIMUM SAFE THRESHOLD: 2.0°C</span>
            </div>

            {sensorReadings.map((r, idx) => {
              const heightPercent = Math.min(100, Math.max(15, (r.temp / 12) * 100));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                  <span
                    className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                      r.isBreach
                        ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                        : 'text-emerald-400'
                    }`}
                  >
                    {r.temp}°C
                  </span>

                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[44px] rounded-t-md transition-all ${
                      r.isBreach
                        ? 'bg-gradient-to-t from-rose-900 via-rose-600 to-rose-500 border-t-2 border-rose-300 shadow-lg shadow-rose-500/30'
                        : 'bg-gradient-to-t from-emerald-950 via-emerald-600 to-emerald-400 border-t-2 border-emerald-300'
                    }`}
                  />
                  <span className="text-[10px] font-mono text-slate-400">{r.time}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-slate-300 px-2 gap-2">
            <div>Excursion Start: <strong className="text-rose-400">09:15 AM (8.5°C)</strong></div>
            <div>Peak Temperature: <strong className="text-rose-400 font-bold">{simulatedTemp || 10.0}°C (09:30 AM)</strong></div>
            <div>Excursion End: <strong className="text-emerald-400">10:02 AM (7.8°C)</strong></div>
            <div>Current Live Reading: <strong className="text-emerald-400 font-bold">7.8°C</strong></div>
          </div>
        </div>
      </div>

      {/* CRITICAL SHIPMENT DISPLAY & AI ASSESSMENT CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Critical Excursion Box */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border-2 border-rose-500/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-rose-200 dark:border-rose-900/60 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 animate-pulse" />
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  CRITICAL TEMPERATURE EXCURSION: Unit VAX-2045 (Shipment S101)
                </h3>
                <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  Cargo: mRNA Oncology Therapeutics ($3.4M Commercial Value at Risk)
                </span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
              Critical Severity
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
              <span className="text-[10px] font-mono text-slate-400">EXCURSION DURATION</span>
              <div className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400">47 min</div>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
              <span className="text-[10px] font-mono text-slate-400">MAXIMUM PEAK</span>
              <div className="text-lg font-bold font-mono text-rose-600 dark:text-rose-400">{simulatedTemp || 10.0}°C</div>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
              <span className="text-[10px] font-mono text-slate-400">CURRENT READING</span>
              <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">7.8°C</div>
            </div>
          </div>

          {/* AI ASSESSMENT */}
          <div className="p-4 rounded-lg bg-white dark:bg-slate-950 border border-rose-200 dark:border-rose-900/50 space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>AI Operational Assessment & Recommended Actions</span>
            </div>

            <div className="space-y-1.5">
              <div>
                <strong className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] block">WHY BREACH OCCURRED:</strong>
                <p className="text-slate-700 dark:text-slate-300">
                  Temperature exceeded the configured range (2.0°C–8.0°C) for 47 cumulative minutes outside JNPT outer anchorage due to auxiliary generator fluctuation.
                </p>
              </div>

              <div>
                <strong className="text-rose-600 dark:text-rose-400 font-mono text-[11px] block">POTENTIAL IMPACT:</strong>
                <p className="text-slate-700 dark:text-slate-300">
                  Shipment requires immediate operational review. Arrhenius kinetic stability window allows 75 minutes remaining before permanent batch denaturation.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                <strong className="text-slate-900 dark:text-white font-semibold block">RECOMMENDED ACTIONS:</strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>1. Inspect refrigeration unit compressor</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>2. Hold shipment at dockside storage</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>3. Move to controlled reefer facility</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>4. Initiate quality review & thermal assay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TELEMETRY DIAGNOSTICS & DETAILS */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
            Sensor Diagnostics & Location
          </h3>

          <div className="space-y-3 text-[11px]">
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
              <span className="text-slate-400 font-mono text-[10px]">SENSOR HEALTH:</span>
              <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Thermocouple Sensor #3 Healthy</span>
                <span className="text-emerald-600 font-mono">98% Battery</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
              <span className="text-slate-400 font-mono text-[10px]">LAST READING:</span>
              <div className="font-bold text-slate-900 dark:text-white font-mono">
                Just now (0s ago) • BLE + Satellite 4G
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
              <span className="text-slate-400 font-mono text-[10px]">GPS LOCATION:</span>
              <div className="font-bold text-slate-900 dark:text-white font-mono flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>JNPT Outer Anchorage (18.95° N, 72.95° E)</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
              <span className="text-slate-400 font-mono text-[10px]">ESTIMATED DELIVERY (ETA):</span>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                Sep 16, 2026 • 14:00 UTC
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>Disclaimer Note:</strong> Kinetic thermal classification is provided for hackathon demonstration & decision-support modeling. Real-world pharmaceuticals require certified physical dataloggers.
          </div>
        </div>
      </div>

      {/* CHRONOLOGICAL TELEMETRY TIMELINE */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Chronological Telemetry Event Audit Trail
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Sensor Log Stream</span>
        </div>

        <div className="space-y-2.5">
          {[
            { time: '09:15 AM', event: 'Initial Threshold Breach', desc: 'Sensor T-01 logged temperature spike to 8.5°C (exceeded 8.0°C limit).', state: 'warning' },
            { time: '09:30 AM', event: 'Peak Temperature Recorded', desc: 'Peak temperature of 10.0°C recorded. Arrhenius kinetic stability timer activated (75 mins remaining).', state: 'critical' },
            { time: '09:47 AM', event: 'Emergency Command Transmitted', desc: 'Dry-ice thermal blanket recharge command issued to Mundra dockside agent.', state: 'info' },
            { time: '10:02 AM', event: 'Temperature Recovery Logged', desc: 'Temperature dropped to 7.8°C. Unit restored within safe thermal band.', state: 'healthy' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0 text-[11px]">{item.time}</span>
              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1 shrink-0" />
              <div className="space-y-0.5">
                <strong className="text-slate-900 dark:text-white block font-semibold">{item.event}</strong>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COLD-CHAIN MONITORED SHIPMENTS TABLE */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B101D] overflow-hidden shadow-sm">
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Live Thermocouple Telemetry Table</h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Continuous 15m Telemetry Poll</span>
        </div>

        <div className="overflow-x-auto max-h-[500px]">
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
