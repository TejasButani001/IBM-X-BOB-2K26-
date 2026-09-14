'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useControlTower } from '../../../../context/ControlTowerContext';
import { PageHeader } from '../../../../components/ui/PageHeader';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import { RiskBadge } from '../../../../components/ui/RiskBadge';
import { Button } from '../../../../components/ui/Button';
import {
  AlertTriangle,
  Compass,
  Truck,
  Thermometer,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  Package,
  X,
  Check,
  Zap,
  TrendingDown,
  DollarSign,
  ShieldCheck,
  Building2,
  Anchor,
} from 'lucide-react';

export default function DisruptionDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || 'D001';
  const {
    disruptions,
    shipments,
    rerouteShipment,
    redeployAsset,
    approveAction,
    approveAllImmediateActions,
  } = useControlTower();

  // Route comparison modal state
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState('R-ALT-01');
  const [isRouteApproved, setIsRouteApproved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Additional timeline log entries for in-page approval updates
  const [extraTimeline, setExtraTimeline] = useState<Array<{ time: string; event: string; desc: string }>>([]);

  const disruption = disruptions.find((d) => d.id === id) || disruptions[0];

  const affectedShipments = shipments.filter(
    (s) => disruption.affectedShipmentIds.includes(s.id) || s.disruptionId === disruption.id
  );

  const handleApproveRoute = (routeId: string) => {
    // 1. Update shipment state
    rerouteShipment('S101', routeId);
    redeployAsset('T04');
    approveAction('ACT-01');

    // 2. Add event to timeline
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setExtraTimeline((prev) => [
      ...prev,
      {
        time: nowTime,
        event: `Route ${routeId} Operator Approved`,
        desc: `Vessel diverted to Mundra Port Terminal 3. Staged Truck T04 from Ahmedabad for chilled quay transfer.`,
      },
    ]);

    setIsRouteApproved(true);
    setIsCompareOpen(false);

    // 3. Show Toast Confirmation
    setToastMessage(`✓ Route ${routeId} Approved! Vessel diverted to Mundra Port T3. State updated across Control Tower.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleApproveAllPlan = () => {
    approveAllImmediateActions();
    setIsRouteApproved(true);
    setToastMessage('✓ Unified 5-Step AI Response Plan Approved & Transmitted to Carriers.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-emerald-900 text-white border border-emerald-500 shadow-2xl flex items-center gap-3 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. DISRUPTION HEADER & BADGES */}
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
            <Button
              variant="ai"
              size="sm"
              icon={Compass}
              onClick={() => setIsCompareOpen(true)}
            >
              Find Alternative Route
            </Button>
            <Button
              variant={isRouteApproved ? 'secondary' : 'primary'}
              size="sm"
              icon={CheckCircle2}
              onClick={handleApproveAllPlan}
              disabled={isRouteApproved}
            >
              {isRouteApproved ? 'Response Plan Approved' : 'Approve Response Plan'}
            </Button>
          </div>
        }
      />

      {/* 2 & 3. SEVERITY, AFFECTED GEOGRAPHY & 5. IMPACT STATISTICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Affected Geography</div>
          <div className="mt-1 font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>{disruption.location}</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Nhava Sheva Terminal Berths 1-4</div>
        </div>

        <div className="p-3.5 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Affected Cargo Value</div>
          <div className="mt-1 font-bold text-slate-900 dark:text-white font-mono text-xl tabular-nums">$12.4M</div>
          <div className="text-rose-600 dark:text-rose-400 text-[11px] font-semibold">{disruption.affectedShipmentIds.length} Containers (3 Cold-Chain)</div>
        </div>

        <div className="p-3.5 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Est. Dwell Surge</div>
          <div className="mt-1 font-bold text-amber-600 dark:text-amber-400 font-mono text-xl tabular-nums">+77.2h</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Baseline JNPT Dwell: 18.0h</div>
        </div>

        <div className="p-3.5 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Incident Status</div>
          <div className="mt-2 flex items-center justify-between">
            <StatusBadge status={isRouteApproved ? 'Resolved' : disruption.status} size="md" />
            <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">{disruption.cascadeRiskScore}/100</span>
          </div>
        </div>
      </div>

      {/* 4. DISRUPTION TIMELINE & INCIDENT AUDIT */}
      <div className="p-4 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Incident Timeline & Duration Schedule
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">72-Hour Strike Window</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono text-slate-400">STRIKE DECLARED:</span>
            <div className="font-bold text-slate-900 dark:text-white font-mono">Sep 14, 2026 • 08:00 AM</div>
          </div>
          <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono text-slate-400">EXPECTED DURATION:</span>
            <div className="font-bold text-amber-600 dark:text-amber-400 font-mono">72 Hours (3 Days)</div>
          </div>
          <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono text-slate-400">ESTIMATED RESOLUTION:</span>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">Sep 17, 2026 • 08:00 AM</div>
          </div>
        </div>

        {/* Audit event trail */}
        {extraTimeline.length > 0 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">Operator Action Audit:</span>
            {extraTimeline.map((item, idx) => (
              <div key={idx} className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs flex items-center justify-between text-emerald-900 dark:text-emerald-200">
                <span className="font-mono font-bold">{item.time} — {item.event}</span>
                <span className="text-[11px]">{item.desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 8. COLD-CHAIN IMPACT & 9. FLEET IMPACT SPOTLIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cold-Chain Impact */}
        <div className="p-4 rounded-lg bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-orange-200 dark:border-orange-900/40 pb-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Cold-Chain Thermal Impact</h3>
            </div>
            <span className="font-mono text-[10px] text-rose-600 font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 border border-rose-200">
              Critical Risk
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            Container <strong>VAX-2045</strong> (mRNA Oncology Biologics) currently undergoing <strong>9.7°C excursion</strong> outside JNPT outer roads. Tolerance window is 75 minutes remaining before batch denaturation ($3.4M loss).
          </p>
          <div className="pt-1 flex justify-end">
            <Link href="/app/cold-chain/VAX-2045">
              <Button variant="danger" size="xs">
                Inspect VAX-2045 Telemetry →
              </Button>
            </Link>
          </div>
        </div>

        {/* Fleet Impact */}
        <div className="p-4 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-900/40 pb-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Fleet Redeployment Impact</h3>
            </div>
            <span className="font-mono text-[10px] text-emerald-600 font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 border border-emerald-200">
              94% Match Ready
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            <strong>Truck T04 (Scania R500 Multi-Temp Reefer)</strong> is idle in Ahmedabad (19.5h idle). Staging at Mundra quay allows immediate chilled transfer of S101 upon vessel berth.
          </p>
          <div className="pt-1 flex justify-end">
            <Link href="/app/fleet/redeployment">
              <Button variant="primary" size="xs">
                Redeploy Truck T04 →
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 10. AI RESPONSE PLAN & PRIMARY REROUTING CTA */}
      <div className="p-5 rounded-lg bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/50 dark:from-[#0B1024] dark:via-[#090E1A] dark:to-[#0C132B] border border-indigo-200 dark:border-indigo-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-indigo-100 dark:border-indigo-900/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              IBM Bob AI Autonomous Response Plan
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
            96% AI Confidence
          </span>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {disruption.aiImpactSummary}
        </p>

        {/* 5 Response Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 text-xs">
          <div className="p-2.5 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold text-[11px]">1. REROUTE S101</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">Divert China-Mumbai vessel to Mundra Port T3.</p>
          </div>
          <div className="p-2.5 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold text-[11px]">2. REROUTE S103</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">Divert automotive chips to Hazira Port.</p>
          </div>
          <div className="p-2.5 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-[11px]">3. REDEPLOY T04</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">Mobilize 18T reefer truck from Ahmedabad.</p>
          </div>
          <div className="p-2.5 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-rose-600 dark:text-rose-400 font-mono font-bold text-[11px]">4. STABILIZE VAX-2045</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">Deploy dry-ice thermal blanket kit.</p>
          </div>
          <div className="p-2.5 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[11px]">5. NOTIFY CUSTOMERS</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">Proactive ETA update push to Pfizer & Tata.</p>
          </div>
        </div>

        {/* Primary Rerouting Interaction CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Button
            variant="ai"
            size="md"
            icon={Compass}
            onClick={() => setIsCompareOpen(true)}
            className="w-full sm:w-auto"
          >
            Find Alternative Route & Compare
          </Button>

          <Button
            variant={isRouteApproved ? 'secondary' : 'primary'}
            size="md"
            icon={CheckCircle2}
            onClick={handleApproveAllPlan}
            disabled={isRouteApproved}
            className="w-full sm:w-auto"
          >
            {isRouteApproved ? 'Response Plan Approved' : 'Approve & Transmit Plan'}
          </Button>
        </div>
      </div>

      {/* 6 & 7. AFFECTED SHIPMENTS TABLE */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B101D] overflow-hidden shadow-sm">
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Affected Shipments ({affectedShipments.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Sorted by Risk Score</span>
        </div>

        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 bg-slate-50 dark:bg-slate-950/90 backdrop-blur-sm text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 z-10">
              <tr>
                <th className="py-2.5 px-3">Shipment ID</th>
                <th className="py-2.5 px-3">Cargo Description</th>
                <th className="py-2.5 px-3">Carrier</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3 text-right">Risk Score</th>
                <th className="py-2.5 px-3 text-right">Delay Delta</th>
                <th className="py-2.5 px-3">Cold-Chain</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {affectedShipments.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold font-mono">
                    <Link href={`/app/shipments/${s.id}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      {s.id}
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 max-w-xs truncate">{s.cargo}</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{s.carrier}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                        s.priority === 'Critical'
                          ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50'
                          : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50'
                      }`}
                    >
                      {s.priority}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-600 dark:text-rose-400 text-right tabular-nums">{s.riskScore}/100</td>
                  <td className="py-2.5 px-3 font-mono text-amber-600 dark:text-amber-400 text-right tabular-nums font-semibold">+{s.delayHours}h</td>
                  <td className="py-2.5 px-3">
                    {s.isColdChain ? (
                      <Link
                        href={`/app/cold-chain/${s.coldChainId || 'VAX-2045'}`}
                        className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:underline font-mono text-[11px]"
                      >
                        <Thermometer className="w-3.5 h-3.5" />
                        <span>{s.temperature ? `${s.temperature}°C` : 'Reefer'}</span>
                      </Link>
                    ) : (
                      <span className="text-slate-400 font-mono">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => setIsCompareOpen(true)}
                    >
                      Compare Reroute
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* IN-PAGE ROUTE COMPARISON EXPERIENCE MODAL / DRAWER */}
      {isCompareOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="w-full max-w-5xl rounded-xl bg-white dark:bg-[#0B101D] border border-indigo-200 dark:border-indigo-900/80 shadow-2xl p-5 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Multimodal Route Bypass & Reroute Evaluation
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Evaluating bypass corridors for Shipment S101 & Mumbai Disruption D001.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current vs 3 Alternatives Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              {/* CURRENT ROUTE */}
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-rose-300 dark:border-rose-900/60 space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 uppercase font-bold">CURRENT ROUTE</span>
                  <h3 className="font-bold text-slate-900 dark:text-white">China → JNPT Mumbai</h3>
                  <div className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold font-mono">77h Delay (BLOCKED)</div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Travel Time:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">18d 12h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cost:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">$12,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Risk Score:</span>
                    <span className="font-mono font-bold text-rose-600">92/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Berth Capacity:</span>
                    <span className="font-mono text-rose-600">0% (Walkout)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Carrier:</span>
                    <span className="font-mono text-slate-400">Maersk Line</span>
                  </div>
                </div>
              </div>

              {/* ROUTE R-ALT-01 (AI RECOMMENDED) */}
              <div className="p-3.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border-2 border-indigo-500 space-y-3 relative shadow-md">
                <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-[9px] font-bold shadow-sm">
                  ⭐ AI RECOMMENDED
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-bold">R-ALT-01</span>
                  <h3 className="font-bold text-slate-900 dark:text-white">China → Mundra → Mumbai</h3>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">6h Delay (SAVINGS: 71h)</div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-indigo-200 dark:border-indigo-800/60 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Travel Time:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">14d 06h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Cost:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">$13,700 (+$1.2k)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Risk Score:</span>
                    <span className="font-mono font-bold text-emerald-600">18/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Berth Capacity:</span>
                    <span className="font-mono text-emerald-600">100% (Berth 3)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Carrier:</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">Truck T04 Ready</span>
                  </div>
                </div>

                <div className="p-2 rounded bg-white dark:bg-slate-950 border border-indigo-200 dark:border-indigo-800 text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  &ldquo;Recommended because it reduces expected delay while maintaining lower disruption exposure and active cold-chain protection.&rdquo;
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  icon={CheckCircle2}
                  className="w-full"
                  onClick={() => handleApproveRoute('R-ALT-01')}
                >
                  Approve Route R-ALT-01
                </Button>
              </div>

              {/* ROUTE R-ALT-02 */}
              <div className="p-3.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">R-ALT-02</span>
                  <h3 className="font-bold text-slate-900 dark:text-white">China → Hazira → Rail</h3>
                  <div className="text-[11px] text-amber-600 dark:text-amber-400 font-bold font-mono">18h Delay</div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Travel Time:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">15d 12h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cost:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">$13,350 (+$850)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Risk Score:</span>
                    <span className="font-mono font-bold text-amber-600">34/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Berth Capacity:</span>
                    <span className="font-mono text-amber-600">85% (Rake limit)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Carrier:</span>
                    <span className="font-mono text-slate-400">CONCOR Rail</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full mt-auto"
                  onClick={() => handleApproveRoute('R-ALT-02')}
                >
                  Approve R-ALT-02
                </Button>
              </div>

              {/* ROUTE R-ALT-03 */}
              <div className="p-3.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">R-ALT-03</span>
                  <h3 className="font-bold text-slate-900 dark:text-white">China → Colombo → Air</h3>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">2h Delay (EXPRESS)</div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Travel Time:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">11d 00h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cost:</span>
                    <span className="font-mono font-bold text-rose-600">$21,000 (+$8.5k)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Risk Score:</span>
                    <span className="font-mono font-bold text-emerald-600">12/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Berth Capacity:</span>
                    <span className="font-mono text-amber-600">45% (Air Charter)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Carrier:</span>
                    <span className="font-mono text-slate-400">Emirates SkyCargo</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full mt-auto"
                  onClick={() => handleApproveRoute('R-ALT-03')}
                >
                  Approve R-ALT-03
                </Button>
              </div>
            </div>

            {/* VIEW IMPACT BREAKDOWN SUMMARY */}
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Impact Assessment Breakdown (Current vs Recommended R-ALT-01)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="p-3 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400">DELAY REDUCTION</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-rose-600 font-mono font-bold line-through">77h</span>
                    <span className="text-emerald-600 font-mono font-extrabold text-lg">6h</span>
                    <span className="text-emerald-600 text-[11px] font-bold">(-71h saved)</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400">CONTAINERS AVOIDED FROM DISRUPTION</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-indigo-600 font-mono font-extrabold text-lg">18 Units</span>
                    <span className="text-slate-500 text-[11px]">($12.4M value)</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 font-bold">FINANCIAL SPOILAGE PREVENTED</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-emerald-600 font-mono font-extrabold text-lg">$3.4M</span>
                    <span className="text-emerald-600 text-[11px] font-semibold">(VAX-2045 saved)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
