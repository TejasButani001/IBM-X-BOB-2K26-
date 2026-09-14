'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useControlTower } from '../../../../context/ControlTowerContext';
import { PageHeader } from '../../../../components/ui/PageHeader';
import { RiskBadge } from '../../../../components/ui/RiskBadge';
import { Button } from '../../../../components/ui/Button';
import {
  Thermometer,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Battery,
  Radio,
  MapPin,
  Sparkles,
  Shield,
  X,
  TrendingUp,
} from 'lucide-react';

export default function ColdChainDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || 'VAX-2045';
  const { coldChain, shipments, approveAction, triggerColdChainExcursion } = useControlTower();

  const [stabilized, setStabilized] = useState(false);
  const [simulatedTemp, setSimulatedTemp] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const item = coldChain.find((c) => c.id === id) || coldChain[0];
  const shipment = shipments.find((s) => s.id === item.shipmentId);

  const handleStabilize = () => {
    approveAction('ACT-03');
    setStabilized(true);
    setToastMessage('✓ Emergency Dry-Ice Recharge Executed! Temperature stabilized to 4.8°C (Normal Range).');
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleSimulateExcursion = () => {
    triggerColdChainExcursion();
    setSimulatedTemp(10.5);
    setStabilized(false);
    setToastMessage('⚠️ Temperature Excursion Simulated! Spiked to 10.5°C. Alert dispatched to Action Center.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Sensor readings
  const sensorReadings = [
    { time: '08:00 AM', temp: 5.2 },
    { time: '08:30 AM', temp: 5.8 },
    { time: '09:00 AM', temp: 7.1 },
    { time: '09:15 AM', temp: 8.5, isBreach: true },
    { time: '09:30 AM', temp: simulatedTemp || 10.0, isBreach: true },
    { time: '09:45 AM', temp: 9.7, isBreach: true },
    { time: '10:02 AM', temp: stabilized ? 4.8 : 7.8 },
  ];

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-slate-900 text-white border border-indigo-500 shadow-2xl flex items-center gap-3 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <PageHeader
        title={`Cold-Chain Telemetry: ${item.id}`}
        subtitle={`Cargo: ${item.cargo} • Assigned Shipment: ${item.shipmentId}`}
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Cold-Chain', href: '/app/cold-chain' },
          { label: item.id },
        ]}
        badge={<RiskBadge severity={stabilized ? 'healthy' : item.severity} />}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={AlertTriangle}
              onClick={handleSimulateExcursion}
            >
              Simulate Excursion
            </Button>
            <Button
              variant={stabilized ? 'secondary' : 'danger'}
              size="sm"
              icon={CheckCircle2}
              onClick={handleStabilize}
              disabled={stabilized}
            >
              {stabilized ? 'Re-Icing Executed' : 'Execute Emergency Dry-Ice Recharge'}
            </Button>
          </div>
        }
      />

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">Current Temp</div>
          <div className="mt-1 text-2xl font-bold font-mono">
            <span className={stabilized ? 'text-emerald-600 dark:text-emerald-400' : item.currentTemperature > 8.0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>
              {stabilized ? '4.8°C' : `${simulatedTemp || item.currentTemperature}°C`}
            </span>
          </div>
          <div className="text-slate-500 text-[11px]">Required Range: {item.requiredRange}</div>
        </div>

        <div className="p-3.5 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">Peak Recorded Temp</div>
          <div className="mt-1 text-2xl font-bold font-mono text-rose-600 dark:text-rose-400">
            {simulatedTemp || item.maxRecordedTemp}°C
          </div>
          <div className="text-slate-500 text-[11px]">Breached at 09:30 AM</div>
        </div>

        <div className="p-3.5 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">Excursion Duration</div>
          <div className="mt-1 text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
            {item.excursionDurationMins} Mins
          </div>
          <div className="text-slate-500 text-[11px]">Cumulative above 8.0°C</div>
        </div>

        <div className="p-3.5 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">Sensor Telemetry</div>
          <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span>BLE + Satellite 4G</span>
          </div>
          <div className="text-slate-500 text-[11px]">Battery: {item.batteryLevel}% • Health: {item.sensorHealth}</div>
        </div>
      </div>

      {/* Main Visualization: Large Time-Series Thermal Chart */}
      <div className="p-5 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Continuous Time-Series Thermal Trajectory</h3>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-emerald-600 dark:text-emerald-400">Min: 2.0°C</span>
            <span className="text-rose-600 dark:text-rose-400">Max: 8.0°C</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-900 dark:bg-slate-950 border border-slate-800 space-y-4">
          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-800 relative">
            {/* Threshold Line Max 8.0°C */}
            <div className="absolute left-0 right-0 top-[30%] border-t-2 border-dashed border-rose-500/80 z-0 flex items-center justify-between px-2 text-[10px] font-mono text-rose-400">
              <span>MAX SAFE LIMIT: 8.0°C</span>
              <span>EXCURSION ZONE (&gt;8.0°C)</span>
            </div>

            {sensorReadings.map((r, idx) => {
              const heightPercent = Math.min(100, Math.max(15, (r.temp / 12) * 100));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group z-10">
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      r.isBreach ? 'text-rose-400 font-bold animate-pulse' : 'text-emerald-400'
                    }`}
                  >
                    {r.temp}°C
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[36px] rounded-t-md transition-all ${
                      r.isBreach
                        ? 'bg-gradient-to-t from-rose-900 to-rose-500 border-t-2 border-rose-400'
                        : 'bg-gradient-to-t from-emerald-950 to-emerald-600 border-t-2 border-emerald-400'
                    }`}
                  />
                  <span className="text-[10px] font-mono text-slate-400 mt-1">{r.time}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-2">
            <span>Minimum Safe Limit: 2.0°C</span>
            <span className="text-amber-400">Peak Thermal Exposure: {simulatedTemp || 10.0}°C (09:30 AM)</span>
            <span>Maximum Safe Limit: 8.0°C</span>
          </div>
        </div>
      </div>

      {/* AI Biological Assessment & Action Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        <div className="lg:col-span-2 p-5 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>AI Biological Assessment & Kinetic Stability Model</span>
          </div>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
            {item.aiAnalysis}
          </p>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="font-semibold text-slate-900 dark:text-white block">Recommended Operational Actions:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {item.recommendedActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Commercial Risk & Regulatory Notice */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-slate-400 font-mono text-[10px] uppercase font-bold">Cargo Commercial Value</span>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">$3,400,000 USD</div>
            <p className="text-slate-500 text-[11px]">
              Consignee: Global Oncology Research Hospital, Mumbai.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
            <strong className="text-amber-800 dark:text-amber-300 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Compliance & Safety Notice:
            </strong>
            <p className="leading-relaxed">
              This classification is provided for hackathon demonstration & decision-support modeling. It does not replace certified calibrated dataloggers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
