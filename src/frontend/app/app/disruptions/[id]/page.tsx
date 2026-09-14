'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useControlTower } from '../../../../context/ControlTowerContext';
import { PageHeader } from '../../../../components/ui/PageHeader';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import { RiskBadge } from '../../../../components/ui/RiskBadge';
import {
  AlertTriangle,
  Compass,
  Truck,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  ExternalLink,
  RotateCcw,
  Package,
} from 'lucide-react';

export default function DisruptionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'D001';
  const {
    disruptions,
    shipments,
    alternativeRoutes,
    approveAllImmediateActions,
    resolveDisruption,
    redeployAsset,
    rerouteShipment,
  } = useControlTower();

  const [isPlanApproved, setIsPlanApproved] = useState(false);

  const disruption = disruptions.find((d) => d.id === id) || disruptions[0];

  const affectedShipments = shipments.filter(
    (s) => disruption.affectedShipmentIds.includes(s.id) || s.disruptionId === disruption.id
  );

  const handleApprovePlan = () => {
    approveAllImmediateActions();
    setIsPlanApproved(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${disruption.id}: ${disruption.name}`}
        subtitle={disruption.description}
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Disruptions', href: '/app/disruptions' },
          { label: disruption.id },
        ]}
        badge={<RiskBadge severity={disruption.severity} score={disruption.cascadeRiskScore} />}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/app/simulations"
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            >
              Simulate 48h Cascade
            </Link>
            <button
              onClick={handleApprovePlan}
              disabled={isPlanApproved}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold shadow-md transition-all ${
                isPlanApproved
                  ? 'bg-emerald-800 text-emerald-100 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isPlanApproved ? 'Response Plan Approved' : 'Approve AI Action Plan'}</span>
            </button>
          </div>
        }
      />

      {/* Top Impact Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Affected Cargo</div>
          <div className="mt-1 text-2xl font-bold text-white">
            {disruption.affectedShipmentIds.length} <span className="text-xs font-normal text-slate-400">Containers</span>
          </div>
          <div className="text-rose-400 mt-1">3 High-Priority Cold-Chain</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Estimated Dwell Surge</div>
          <div className="mt-1 text-2xl font-bold text-amber-400">+77.2h</div>
          <div className="text-slate-400 mt-1">Normal: 18h at JNPT</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Cascade Risk Score</div>
          <div className="mt-1 text-2xl font-bold text-rose-400">{disruption.cascadeRiskScore}/100</div>
          <div className="text-slate-400 mt-1">Severe Multimodal Choke</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400 uppercase font-medium text-[10px]">Status</div>
          <div className="mt-2">
            <StatusBadge status={disruption.status} size="md" />
          </div>
        </div>
      </div>

      {/* AI Impact Explanation & Autonomous Plan */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-navy-900 via-slate-900 to-indigo-950/40 border border-indigo-900/60 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-indigo-900/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">IBM Bob AI Operational Decision Plan</h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            Confidence: 96%
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {disruption.aiImpactSummary}
        </p>

        {/* 5 Specific Action Steps from the prompt */}
        <div className="space-y-2 pt-2 text-xs">
          <div className="font-semibold text-slate-200">Recommended 5-Step Operational Response:</div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-mono font-bold">1. Reroute S101</span>
              <p className="text-[11px] text-slate-300">Divert China-Mumbai vessel to Mundra Port Berth 3.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-mono font-bold">2. Reroute S103</span>
              <p className="text-[11px] text-slate-300">Divert automotive silicon to Hazira coastal terminal.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-mono font-bold">3. Redeploy T04</span>
              <p className="text-[11px] text-slate-300">Dispatch idle 18T reefer in Ahmedabad to Mundra quay.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-rose-400 font-mono font-bold">4. Inspect VAX-2045</span>
              <p className="text-[11px] text-slate-300">Emergency dry-ice re-blanketing & thermal assay.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-mono font-bold">5. Notify Customers</span>
              <p className="text-[11px] text-slate-300">Proactive revised ETA push to Pfizer & Tata Motors.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleApprovePlan}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approve & Transmit All 5 Steps</span>
          </button>
          <Link
            href="/app/routing"
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
          >
            Modify Routing
          </Link>
        </div>
      </div>

      {/* Affected Shipments Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden space-y-2">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">
              Affected Shipments ({affectedShipments.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">Sorted by Priority & Risk Score</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-medium border-b border-slate-800">
              <tr>
                <th className="p-3.5">Shipment ID</th>
                <th className="p-3.5">Cargo Description</th>
                <th className="p-3.5">Carrier</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Risk Score</th>
                <th className="p-3.5">Delay Delta</th>
                <th className="p-3.5">Cold-Chain</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {affectedShipments.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3.5 font-bold text-white font-mono">
                    <Link href={`/app/shipments/${s.id}`} className="hover:text-indigo-400">
                      {s.id}
                    </Link>
                  </td>
                  <td className="p-3.5 text-slate-300 max-w-xs truncate">{s.cargo}</td>
                  <td className="p-3.5 text-slate-400">{s.carrier}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                        s.priority === 'Critical'
                          ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50'
                          : 'bg-amber-950/60 text-amber-300 border border-amber-800/50'
                      }`}
                    >
                      {s.priority}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-rose-400">{s.riskScore}/100</td>
                  <td className="p-3.5 font-mono text-amber-400">+{s.delayHours}h</td>
                  <td className="p-3.5">
                    {s.isColdChain ? (
                      <Link
                        href={`/app/cold-chain/${s.coldChainId || 'VAX-2045'}`}
                        className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-mono text-[11px]"
                      >
                        <Thermometer className="w-3.5 h-3.5" />
                        <span>{s.temperature ? `${s.temperature}°C` : 'Reefer'}</span>
                      </Link>
                    ) : (
                      <span className="text-slate-500 font-mono">—</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/app/shipments/${s.id}`}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                    >
                      Inspect
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
