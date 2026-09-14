'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useControlTower } from '../../../../context/ControlTowerContext';
import { PageHeader } from '../../../../components/ui/PageHeader';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import { RiskBadge } from '../../../../components/ui/RiskBadge';
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
} from 'lucide-react';

export default function ShipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'S101';
  const { shipments, rerouteShipment, alternativeRoutes } = useControlTower();

  const shipment = shipments.find((s) => s.id === id) || shipments[0];
  const [isRerouted, setIsRerouted] = useState(shipment.delayHours <= 10 && shipment.riskScore <= 30);

  const handleReroute = () => {
    rerouteShipment(shipment.id, 'R-ALT-01');
    setIsRerouted(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Shipment ${shipment.id}: ${shipment.cargo}`}
        subtitle={`Tracking: ${shipment.trackingNumber} • Carrier: ${shipment.carrier}`}
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Shipments', href: '/app/shipments' },
          { label: shipment.id },
        ]}
        badge={<StatusBadge status={shipment.status} size="md" />}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/app/routing"
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Find Alternative Route</span>
            </Link>
            <button
              onClick={handleReroute}
              disabled={isRerouted}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isRerouted
                  ? 'bg-emerald-800 text-emerald-100 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isRerouted ? 'Rerouted to Mundra' : 'Quick Reroute via Mundra'}</span>
            </button>
          </div>
        }
      />

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Risk Score</div>
          <div className="mt-1 text-2xl font-bold font-mono">
            <span className={shipment.riskScore >= 75 ? 'text-rose-400' : 'text-emerald-400'}>
              {shipment.riskScore}/100
            </span>
          </div>
          <div className="text-slate-400 mt-1">Priority: {shipment.priority}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Delay Delta</div>
          <div className="mt-1 text-2xl font-bold font-mono text-amber-400">
            {shipment.delayHours > 0 ? `+${shipment.delayHours}h` : '0h (On Time)'}
          </div>
          <div className="text-slate-400 mt-1">
            Original ETA: {new Date(shipment.originalEta).toLocaleDateString()}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Cold-Chain Status</div>
          <div className="mt-1 text-2xl font-bold font-mono">
            {shipment.isColdChain ? (
              <span className={shipment.temperature && shipment.temperature > 8 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}>
                {shipment.temperature}°C
              </span>
            ) : (
              <span className="text-slate-400 text-base">Standard Ambient</span>
            )}
          </div>
          <div className="text-slate-400 mt-1">
            {shipment.isColdChain ? 'Target: 2.0°C – 8.0°C' : 'Dry Freight'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Disruption Link</div>
          <div className="mt-1 font-bold text-white truncate">
            {shipment.disruptionId ? (
              <Link href={`/app/disruptions/${shipment.disruptionId}`} className="hover:text-indigo-400">
                {shipment.disruptionId}: Port Strike
              </Link>
            ) : (
              <span className="text-emerald-400">None Active</span>
            )}
          </div>
          <div className="text-slate-400 mt-1 truncate">{shipment.disruptionExposure || 'Nominal'}</div>
        </div>
      </div>

      {/* AI Explanation Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-navy-900 via-slate-900 to-indigo-950/40 border border-indigo-900/60 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">IBM Bob AI Risk Diagnosis & Solution</h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            Automated Triage
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {shipment.aiExplanation}
        </p>
        <div className="flex items-center gap-3 pt-1 text-xs">
          <Link
            href="/app/routing"
            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            <span>Compare AI Alternative Route (Mundra Bypass)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {shipment.isColdChain && (
            <Link
              href={`/app/cold-chain/${shipment.coldChainId || 'VAX-2045'}`}
              className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
            >
              <span>View Live Sensor Excursion Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Main Details Grid: Left (Route Checkpoint Timeline) & Right (Cargo, Carrier, Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        {/* Route Checkpoint Timeline (2 Cols) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Multimodal Route Checkpoint Progress</h3>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">
              {shipment.origin} → {shipment.destination}
            </span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {shipment.checkpoints.map((cp, idx) => {
              let dotClass = 'bg-slate-600 border-slate-800';
              if (cp.status === 'completed') dotClass = 'bg-emerald-500 border-emerald-900';
              if (cp.status === 'current') dotClass = 'bg-blue-500 border-blue-900 animate-pulse';
              if (cp.status === 'delayed') dotClass = 'bg-rose-500 border-rose-900 animate-ping';

              return (
                <div key={idx} className="relative group">
                  <div
                    className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 ${dotClass}`}
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{cp.name}</span>
                      <span className="font-mono text-[11px] text-slate-400">{cp.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Location: {cp.location}</span>
                      <span className="capitalize font-mono text-slate-300">[{cp.status}]</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cargo & Action Panel (1 Col) */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              Cargo Specification
            </h3>
            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Cargo Type:</span>
                <span className="font-semibold text-white">{shipment.cargoType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gross Weight:</span>
                <span className="font-mono">{shipment.weightTons} Metric Tons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Carrier Code:</span>
                <span className="font-mono text-indigo-300">{shipment.carrierCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Telemetry Sync:</span>
                <span>{shipment.lastUpdated}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              Operational Actions
            </h3>
            <div className="space-y-2">
              <Link
                href="/app/routing"
                className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-between transition-colors"
              >
                <span>Find Alternative Route</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/app/fleet/redeployment"
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-between transition-colors"
              >
                <span>Assign Dedicated Truck T04</span>
                <Truck className="w-3.5 h-3.5 text-amber-400" />
              </Link>
              <button
                onClick={() => alert(`Shipment ${shipment.id} placed on customs hold.`)}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-between transition-colors"
              >
                <span>Place Inspection Hold</span>
                <Clock className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
