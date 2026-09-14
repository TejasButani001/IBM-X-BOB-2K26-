'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useControlTower } from '../../../../context/ControlTowerContext';
import { PageHeader } from '../../../../components/ui/PageHeader';
import { RiskBadge } from '../../../../components/ui/RiskBadge';
import {
  Thermometer,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Battery,
  Radio,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Shield,
  RotateCcw,
} from 'lucide-react';

export default function ColdChainDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || 'VAX-2045';
  const { coldChain, shipments, approveAction } = useControlTower();

  const [stabilized, setStabilized] = useState(false);

  const item = coldChain.find((c) => c.id === id) || coldChain[0];
  const shipment = shipments.find((s) => s.id === item.shipmentId);

  const handleStabilize = () => {
    approveAction('ACT-03');
    setStabilized(true);
  };

  return (
    <div className="space-y-6">
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
            <Link
              href={`/app/shipments/${item.shipmentId}`}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            >
              View Shipment {item.shipmentId}
            </Link>
            <button
              onClick={handleStabilize}
              disabled={stabilized}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 ${
                stabilized
                  ? 'bg-emerald-800 text-emerald-100 cursor-default'
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{stabilized ? 'Re-Icing Protocol Executed' : 'Execute Emergency Dry-Ice Recharge'}</span>
            </button>
          </div>
        }
      />

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Current Temp</div>
          <div className="mt-1 text-2xl font-bold font-mono">
            <span className={stabilized ? 'text-emerald-400' : item.currentTemperature > item.maxTemp ? 'text-rose-400' : 'text-emerald-400'}>
              {stabilized ? '4.8°C' : `${item.currentTemperature}°C`}
            </span>
          </div>
          <div className="text-slate-400 mt-1">Allowed: {item.requiredRange}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Peak Recorded Temp</div>
          <div className="mt-1 text-2xl font-bold font-mono text-rose-400">
            {item.maxRecordedTemp}°C
          </div>
          <div className="text-slate-400 mt-1">Breached at 11:00 UTC</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Excursion Duration</div>
          <div className="mt-1 text-2xl font-bold font-mono text-amber-400">
            {item.excursionDurationMins} Mins
          </div>
          <div className="text-slate-400 mt-1">Cumulative above 8.0°C</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Sensor Telemetry</div>
          <div className="mt-1 text-sm font-bold text-white flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>BLE + Satellite 4G</span>
          </div>
          <div className="text-slate-400 mt-1">Battery: {item.batteryLevel}% • Health: {item.sensorHealth}</div>
        </div>
      </div>

      {/* Visual Temperature Curve & Threshold Bands */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white">Continuous Time-Series Thermal Trajectory</h3>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2.5 h-1 bg-emerald-500 rounded" /> Safe Band (2.0°C – 8.0°C)
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2.5 h-1 bg-rose-500 rounded" /> Excursion Zone (&gt;8.0°C)
            </span>
          </div>
        </div>

        {/* Visual Bar / Chart representation of readings */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-800">
            {item.readings.map((r, idx) => {
              const isBreach = r.temperature > r.safeMax;
              const heightPercent = Math.min(100, Math.max(15, ((r.temperature + 5) / 20) * 100));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      isBreach ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {r.temperature}°C
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[40px] rounded-t-md transition-all ${
                      isBreach
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
            <span className="text-amber-300">Peak Thermal Exposure: 10.0°C (11:00 UTC)</span>
            <span>Maximum Safe Limit: 8.0°C</span>
          </div>
        </div>
      </div>

      {/* AI Arrhenius Kinetic Assessment & Action Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        {/* AI Analysis (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-indigo-300 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Arrhenius Kinetic Biological Degradation Assessment</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
            {item.aiAnalysis}
          </p>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <span className="font-semibold text-white block">Recommended Operational Action Checklist:</span>
            <div className="space-y-1.5">
              {item.recommendedActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & Cargo Value Box (1 col) */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
            <span className="text-slate-400 font-medium uppercase text-[10px]">Commercial Value At Risk</span>
            <div className="text-2xl font-bold font-mono text-white">$3,400,000 USD</div>
            <p className="text-slate-400 text-[11px]">
              Clinical trial mRNA therapeutics consignee: Global Oncology Research Hospital, Mumbai.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <Shield className="w-3.5 h-3.5" />
              <span>Compliance & Safety Notice</span>
            </div>
            <p className="leading-relaxed">
              This is a hackathon demo classification interface and must not claim real regulatory medical certification. Real-world pharmaceuticals require certified calibrated physical dataloggers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
