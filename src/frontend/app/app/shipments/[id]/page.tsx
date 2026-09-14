'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useControlTower } from '../../../../context/ControlTowerContext';
import { PageHeader } from '../../../../components/ui/PageHeader';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import GoogleWorldMap from '../../../../components/ui/GoogleWorldMap';

import {
  Package,
  Compass,
  Truck,
  Thermometer,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldAlert,
  RotateCcw,
  MapPin,
  Calendar,
  Activity,
  FileText,
  Bot,
  Layers,
  ChevronRight,
} from 'lucide-react';

export default function ShipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'S101';
  const { shipments, rerouteShipment, redeployAsset, triggerColdChainExcursion } = useControlTower();

  const shipment = shipments.find((s) => s.id === id) || shipments[0];
  const [isRerouted, setIsRerouted] = useState(shipment.delayHours <= 10 && shipment.riskScore <= 30);
  const [isRedeployed, setIsRedeployed] = useState(false);

  const handleReroute = () => {
    rerouteShipment(shipment.id, 'R-ALT-01');
    setIsRerouted(true);
  };

  const handleRedeploy = () => {
    redeployAsset('T04');
    setIsRedeployed(true);
  };

  // Diagnostic Risk Breakdown items (matches prompt requirement)
  const riskBreakdown = [
    {
      factor: 'Port Disruption (D001 Mumbai Strike)',
      score: 35,
      maxScore: 40,
      color: 'bg-rose-500',
      description: 'JNPT Nhava Sheva dockworkers strike immobilized berth 03.',
    },
    {
      factor: 'Delivery Buffer Depletion',
      score: 25,
      maxScore: 30,
      color: 'bg-orange-500',
      description: 'Projected +77h delay exceeds oncology manufacturing tolerance.',
    },
    {
      factor: 'Cold-Chain Thermal Sensitivity',
      score: 20,
      maxScore: 20,
      color: 'bg-amber-500',
      description: 'Reefer VAX-2045 breached 8.0°C limit for 47 minutes.',
    },
    {
      factor: 'Carrier Congestion Exposure',
      score: 10,
      maxScore: 10,
      color: 'bg-blue-500',
      description: 'Maersk feeder vessel queued offshore in West India coastal zone.',
    },
  ];

  const totalCalculatedRisk = riskBreakdown.reduce((sum, item) => sum + item.score, 0);

  // Activity Log
  const activityLog = [
    {
      time: '10:10 AM',
      title: 'Action Center Intervention Created',
      details: 'Reroute action plan R-ALT-01 queued for operational controller approval.',
      type: 'system',
    },
    {
      time: '09:40 AM',
      title: 'Idle Reefer Truck T04 Matched',
      details: 'Fleet optimizer identified 94% match (18T Reefer in Ahmedabad).',
      type: 'fleet',
    },
    {
      time: '09:15 AM',
      title: 'Bob AI Reroute Calculation Complete',
      details: 'Alternative corridor via Mundra Port calculated with 96% confidence score.',
      type: 'ai',
    },
    {
      time: '08:30 AM',
      title: 'Thermal Sensor Excursion Logged',
      details: 'Container VAX-2045 telemetry reported 9.7°C (peak 10.0°C).',
      type: 'alert',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Shipment ${shipment.id}: ${shipment.cargo}`}
        subtitle={`Tracking: ${shipment.trackingNumber} • Carrier: ${shipment.carrier} • Container: ${shipment.coldChainId || 'FX-8842'}`}
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Shipments', href: '/app/shipments' },
          { label: shipment.id },
        ]}
        badge={
          <div className="flex items-center gap-2">
            <StatusBadge status={shipment.status} size="md" />
            {shipment.isColdChain && (
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold flex items-center gap-1">
                <Thermometer className="w-3 h-3" /> Cold Chain ({shipment.coldChainId})
              </span>
            )}
          </div>
        }
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/app/copilot"
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask AI Copilot</span>
            </Link>

            <Link
              href="/app/routing"
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Compare Reroutes</span>
            </Link>

            <button
              onClick={handleReroute}
              disabled={isRerouted}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
                isRerouted
                  ? 'bg-emerald-700 text-emerald-100 cursor-default'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isRerouted ? 'Rerouted via Mundra' : 'Execute AI Reroute (R-ALT-01)'}</span>
            </button>
          </div>
        }
      />

      {/* Top 4 KPI Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs">
          <div className="text-slate-400 uppercase font-bold text-[10px] tracking-wider">
            Risk Exposure Score
          </div>
          <div className="mt-1 text-2xl font-bold font-mono">
            <span className={shipment.riskScore >= 75 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>
              {shipment.riskScore} / 100
            </span>
          </div>
          <div className="text-slate-400 mt-1 flex items-center gap-1">
            <span>Priority:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">{shipment.priority}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs">
          <div className="text-slate-400 uppercase font-bold text-[10px] tracking-wider">
            Schedule Delay Delta
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
            {shipment.delayHours > 0 ? `+${shipment.delayHours}h` : '0h (On Time)'}
          </div>
          <div className="text-slate-400 mt-1 font-mono text-[11px]">
            ETA: {new Date(shipment.eta).toLocaleDateString()}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs">
          <div className="text-slate-400 uppercase font-bold text-[10px] tracking-wider">
            Cold-Chain Telemetry
          </div>
          <div className="mt-1 text-2xl font-bold font-mono">
            {shipment.isColdChain ? (
              <span className={shipment.temperature && shipment.temperature > 8 ? 'text-rose-600 dark:text-rose-400 animate-pulse' : 'text-emerald-600 dark:text-emerald-400'}>
                {shipment.temperature}°C
              </span>
            ) : (
              <span className="text-slate-400 text-base">Standard Ambient</span>
            )}
          </div>
          <div className="text-slate-400 mt-1">
            {shipment.isColdChain ? 'Configured Safe: 2.0°C – 8.0°C' : 'Dry Cargo'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs">
          <div className="text-slate-400 uppercase font-bold text-[10px] tracking-wider">
            Disruption Exposure
          </div>
          <div className="mt-1 font-bold text-slate-900 dark:text-white truncate">
            {shipment.disruptionId ? (
              <Link href={`/app/disruptions/${shipment.disruptionId}`} className="hover:text-indigo-600 dark:hover:text-cyan-400 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{shipment.disruptionId}: Port Strike</span>
              </Link>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400">None Active</span>
            )}
          </div>
          <div className="text-slate-400 mt-1 truncate">{shipment.disruptionExposure || 'Nominal Route'}</div>
        </div>
      </div>

      {/* Visual "Why is this shipment at risk?" Diagnostic Breakdown (PROMPT REQUIREMENT) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0B101D] border border-rose-200 dark:border-rose-900/40 shadow-enterprise space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
              <ShieldAlert className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Why is this shipment at risk? (Risk Attribution Breakdown)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Bob AI Diagnostic Engine score decomposition for {shipment.id}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Total Risk Index</span>
            <div className="text-xl font-mono font-bold text-rose-600 dark:text-rose-400 tabular-nums">
              {totalCalculatedRisk} / 100
            </div>
          </div>
        </div>

        {/* Risk Attribution Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskBreakdown.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  {item.factor}
                </span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  +{item.score}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${item.color}`}
                  style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Total Score Summary Bar */}
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="text-rose-900 dark:text-rose-200 font-medium">
              <strong>AI Diagnostic Result:</strong> Port strike D001 (+35) and thermal excursion (+20) drive 61% of total risk score. Rerouting via Mundra drops total score from 90 to 22.
            </span>
          </div>

          <button
            onClick={handleReroute}
            disabled={isRerouted}
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0 transition-colors shadow-xs"
          >
            {isRerouted ? 'Rerouted to Mundra' : 'Mitigate Risk Now (Reroute R-ALT-01)'}
          </button>
        </div>
      </div>

      {/* Main Details Grid: Left (Timeline) & Right (Cargo, Carrier, Activity Log) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        {/* Route Checkpoint Timeline (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] p-5 space-y-4 shadow-enterprise">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <MapPin className="w-4.5 h-4.5 text-indigo-600 dark:text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Multimodal Route Checkpoint Progress</h3>
            </div>
            <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              {shipment.origin} → {shipment.destination}
            </span>
          </div>

          {/* Real Interactive Google GIS Map */}
          <div className="rounded-xl overflow-hidden my-3">
            <GoogleWorldMap height="250px" center={[22, 74]} zoom={4} />
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">

            {shipment.checkpoints.map((cp, idx) => {
              let dotClass = 'bg-slate-400 border-slate-200 dark:border-slate-800';
              if (cp.status === 'completed') dotClass = 'bg-emerald-500 border-emerald-900';
              if (cp.status === 'current') dotClass = 'bg-indigo-600 border-indigo-900 animate-pulse';
              if (cp.status === 'delayed') dotClass = 'bg-rose-600 border-rose-900 animate-ping';

              return (
                <div key={idx} className="relative group">
                  <div className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 ${dotClass}`} />
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">{cp.name}</span>
                      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{cp.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Location: {cp.location}</span>
                      <span className="capitalize font-mono text-slate-700 dark:text-slate-300 font-semibold">[{cp.status}]</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cargo Specification & Activity Log (1 Col) */}
        <div className="space-y-6">
          {/* Cargo Details */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] p-5 space-y-3 shadow-enterprise">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
              <span>Cargo Specification</span>
              <Package className="w-4 h-4 text-indigo-500" />
            </h3>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Cargo Type:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{shipment.cargoType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Gross Weight:</span>
                <span className="font-mono font-semibold">{shipment.weightTons} Metric Tons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Carrier Code:</span>
                <span className="font-mono text-indigo-600 dark:text-cyan-400 font-bold">{shipment.carrierCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Telemetry Sync:</span>
                <span className="font-mono text-slate-500">{shipment.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] p-5 space-y-3 shadow-enterprise">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
              <span>Operator Activity Log</span>
              <Activity className="w-4 h-4 text-cyan-500" />
            </h3>
            <div className="space-y-2.5">
              {activityLog.map((log, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 space-y-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{log.title}</span>
                    <span className="font-mono text-[10px] text-slate-400">{log.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    {log.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
