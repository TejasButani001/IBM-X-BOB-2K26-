'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import { MetricCard } from '../../../components/ui/MetricCard';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { RiskBadge } from '../../../components/ui/RiskBadge';
import { Button } from '../../../components/ui/Button';
import GoogleWorldMap from '../../../components/ui/GoogleWorldMap';

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
  Clock,
  Zap,
  RotateCcw,
  CheckSquare,
  X,
  Compass,
  Layers,
  Check,
} from 'lucide-react';

export default function OverviewPage() {
  const {
    metrics,
    disruptions,
    shipments,
    fleet,
    coldChain,
    actionPlan,
    approveAction,
    approveAllImmediateActions,
    triggerMumbaiStrike,
    triggerColdChainExcursion,
  } = useControlTower();

  // Workflow Modal state
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [planProgressStep, setPlanProgressStep] = useState(0);
  const [isPlanGenerated, setIsPlanGenerated] = useState(false);

  // Network Map Selected Node State
  const [selectedNode, setSelectedNode] = useState<string>('JNPT');

  const activeDisruptionsList = disruptions.filter((d) => d.status === 'Active');
  const criticalShipments = shipments
    .filter((s) => s.riskScore >= 80 || s.status === 'Disrupted' || s.status === 'At Risk')
    .slice(0, 5);
  const idleAssets = fleet.filter((f) => f.status === 'Idle');
  const pendingActions = actionPlan.filter((a) => a.status === 'Pending Approval');
  const criticalColdChain = coldChain.find((c) => c.severity === 'critical') || coldChain[0];

  // Workflow steps simulation
  const workflowSteps = [
    'Analysing disruptions & AIS signals...',
    'Mapping affected shipments & customer SLAs...',
    'Calculating multimodal bypass route options...',
    'Matching spatial fleet idle capacity...',
    'Checking kinetic cold-chain thermal exposure...',
    'Synthesizing unified response plan...',
  ];

  const handleStartWorkflow = () => {
    setIsGeneratingPlan(true);
    setPlanProgressStep(0);
    setIsPlanGenerated(false);
  };

  useEffect(() => {
    if (isGeneratingPlan && planProgressStep < workflowSteps.length) {
      const timer = setTimeout(() => {
        setPlanProgressStep((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else if (isGeneratingPlan && planProgressStep === workflowSteps.length) {
      setIsPlanGenerated(true);
    }
  }, [isGeneratingPlan, planProgressStep, workflowSteps.length]);

  // View mode state: Operator View vs Executive View
  const [viewMode, setViewMode] = useState<'operator' | 'executive'>('operator');

  return (
    <div className="space-y-6">
      {/* TOP: Greeting & Major CTA */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Good morning, Operations.
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operational Network Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here is what needs your attention across global maritime corridors, fleet assets, and thermal telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Segmented Executive vs Operator View Selector */}
          <div className="inline-flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('operator')}
              className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                viewMode === 'operator'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Operator View
            </button>
            <button
              onClick={() => setViewMode('executive')}
              className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                viewMode === 'executive'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Executive View
            </button>
          </div>

          <Button
            variant="ai"
            size="md"
            icon={Sparkles}
            onClick={handleStartWorkflow}
          >
            Generate Response Plan
          </Button>
        </div>
      </div>

      {/* KPI ROW (6 metrics) */}
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
          label="Network Health"
          value={`${metrics.onTimePerformancePercent}%`}
          icon={Activity}
          variant="info"
          change="Target: 95%"
        />
      </div>

      {/* EXECUTIVE VIEW CONDITIONAL PANEL */}
      {viewMode === 'executive' ? (
        <div className="p-6 rounded-2xl bg-[#090E1A] border border-indigo-900/60 shadow-2xl space-y-6 text-xs text-white">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">FluxChain AI Executive Control Tower Brief</h2>
            </div>
            <span className="font-mono text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded border border-emerald-800/40">
              SLA Compliance: {metrics.onTimePerformancePercent}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-mono font-bold">Network Risk Score</span>
              <div className="text-2xl font-bold font-mono text-rose-400">87 / 100</div>
              <div className="text-[11px] text-slate-400">JNPT Strike Impact</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-mono font-bold">Active Disruptions</span>
              <div className="text-2xl font-bold font-mono text-amber-400">{metrics.activeDisruptions} Major</div>
              <div className="text-[11px] text-slate-400">D001 JNPT Strike</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-mono font-bold">Fleet Utilisation</span>
              <div className="text-2xl font-bold font-mono text-indigo-400">{metrics.fleetUtilisationPercent}%</div>
              <div className="text-[11px] text-slate-400">5 Idle Units (T04 Ready)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-mono font-bold">Cold-Chain Status</span>
              <div className="text-2xl font-bold font-mono text-orange-400">1 Excursion</div>
              <div className="text-[11px] text-rose-400">VAX-2045 (+10.0°C Peak)</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 space-y-2">
            <h3 className="font-bold text-white text-sm">Operational Impact Summary</h3>
            <p className="text-slate-300 leading-relaxed">
              JNPT dockworkers strike walkout (D001) affects 18 inbound containers valued at $12.4M. Autonomous rerouting of S101 via Mundra Rail Corridor recovers 71 hours of delay and mobilizes idle Truck T04 for zero-spoilage biologics delivery.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* HERO OPERATIONAL SECTION: FULL-WIDTH BIG SCREEN GOOGLE GIS MAP */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B101D] shadow-sm p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Global Network Health & Interactive GIS Corridor Map
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Real-time global ocean corridors, port strikes, bypass routes, and idle fleet telemetry.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-mono text-[11px]">Inspecting Hub:</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800">
                    {selectedNode}
                  </span>
                </div>
                <Link href="/app/routing" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1">
                  Routing Studio <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Big Screen Google GIS World Map Container */}
            <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg">
              <GoogleWorldMap
                onNodeSelect={(nodeName) => setSelectedNode(nodeName)}
                height="520px"
                center={[23, 68]}
                zoom={3}
              />
            </div>
          </div>

          {/* SECONDARY OPERATIONAL AREA: Critical Action Queue (Left 2 Cols) + AI Executive Brief & Timeline (Right 1 Col) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Critical Action Queue (Prioritized Operational Items) */}
            <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B101D] shadow-sm p-4 space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    Critical Action Queue
                  </h2>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60">
                  4 Prioritized Items
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* 1. Critical Cold-Chain Incident */}
                <div className="p-3.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-mono font-bold text-[10px]">
                        1. CRITICAL COLD-CHAIN
                      </span>
                      <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">9.7°C (47m)</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">Unit VAX-2045 (Shipment S101)</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Oncology mRNA Vaccines exceeding thermal threshold outside JNPT outer anchorage.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-rose-200/60 dark:border-rose-900/40 text-[11px]">
                    <span className="text-rose-700 dark:text-rose-400 font-semibold">$3.4M Batch Spoilage Risk</span>
                    <Link href="/app/cold-chain/VAX-2045">
                      <Button variant="danger" size="xs">
                        Deploy Dry-Ice Kit
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* 2. High-Impact Disruption */}
                <div className="p-3.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono font-bold text-[10px]">
                        2. PORT STRIKE IMPACT
                      </span>
                      <span className="font-mono text-amber-700 dark:text-amber-400 font-bold">D001 • JNPT</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">Mumbai Port Crane Walkout</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      72-hour labor disruption immobilizing 18 inbound containers and feeder vessels.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[11px]">
                    <span className="text-amber-700 dark:text-amber-400 font-semibold">+77h Delay Saved by Bypass</span>
                    <Link href="/app/disruptions/D001">
                      <Button variant="secondary" size="xs">
                        Execute Reroute
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* 3. High-Risk Shipment */}
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-[10px]">
                        3. SHIPMENT AT RISK
                      </span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">S101 • 92 Risk</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">Shipment S101 Biologics Cargo</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Shanghai → JNPT leg blocked. Alternate route via Mundra T3 calculated.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px]">
                    <span className="text-slate-600 dark:text-slate-400 font-mono">Cost: +$1,200 / TEU</span>
                    <Link href="/app/shipments/S101">
                      <Button variant="secondary" size="xs">
                        Inspect S101
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* 4. Fleet Redeployment Opportunity */}
                <div className="p-3.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-[10px]">
                        4. ASSET REDEPLOYMENT
                      </span>
                      <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">94% Match</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">Truck T04 Idle in Ahmedabad</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      18T Scania Reefer idle for 19.5 hours. Ready to stage at Mundra quay for S101.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-emerald-200/60 dark:border-emerald-900/40 text-[11px]">
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Zero Spoilage Transfer</span>
                    <Link href="/app/fleet/redeployment">
                      <Button variant="primary" size="xs">
                        Redeploy T04
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: AI BRIEF & OPERATIONAL TIMELINE */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* AI Brief (Concise operational summary) */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/50 dark:from-[#0B1024] dark:via-[#090E1A] dark:to-[#0C132B] border border-indigo-200 dark:border-indigo-900/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-900/40 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                AI Operational Executive Brief
              </h3>
            </div>
            <span className="text-[10px] font-mono text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
              Grounded in 50 Telemetry Signals
            </span>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            &ldquo;Three issues require attention. Mumbai Port Strike currently affects 18 shipments, including two cold-chain loads. Truck T04 is idle near Ahmedabad and is the best available match for S101&apos;s rerouting plan.&rdquo;
          </p>

          <div className="p-2.5 rounded-lg bg-white/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1 text-slate-600 dark:text-slate-400 font-mono">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold">SYNTHESIZED ACTION RECOMMENDATION:</div>
            <div>1. Authorize JNPT → Mundra Port vessel reroute.</div>
            <div>2. Dispatch Truck T04 to Mundra Quay 3 for chilled transfer.</div>
            <div>3. Deploy dry-ice stabilization kit to Unit VAX-2045.</div>
          </div>
        </div>

        {/* Operational Timeline (Chronological Audit Event Chain) */}
        <div className="lg:col-span-2 p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Operational Event Timeline
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Real-Time Audit Trail</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              {
                time: '08:00 AM',
                event: 'Disruption Detected',
                desc: 'AIS signals & news alert confirmed 72-hour crane walkout at Nhava Sheva (JNPT).',
                tag: 'D001',
                type: 'critical',
              },
              {
                time: '08:05 AM',
                event: 'Cascade Analysis Completed',
                desc: 'Impact model identified 18 affected shipments ($12.4M cargo value, 3 cold-chain units).',
                tag: 'Analytics',
                type: 'warning',
              },
              {
                time: '08:12 AM',
                event: 'Route Recommendation Generated',
                desc: 'AI bypass engine computed Shanghai → Mundra Port diversion saving 71h delay.',
                tag: 'Routing',
                type: 'info',
              },
              {
                time: '08:20 AM',
                event: 'Operator Action Pre-Authorized',
                desc: 'Truck T04 (18T Reefer, Ahmedabad) reserved for Mundra quay staging.',
                tag: 'Fleet',
                type: 'healthy',
              },
              {
                time: '08:35 AM',
                event: 'Alert Resolution Initiated',
                desc: 'Thermal recovery protocol dispatched for Unit VAX-2045 dry-ice kit.',
                tag: 'Cold-Chain',
                type: 'healthy',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors"
              >
                <span className="font-mono text-[11px] text-slate-400 font-bold shrink-0 w-16">
                  {item.time}
                </span>
                <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 dark:text-white font-semibold">{item.event}</strong>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTIONS: ACTIVE DISRUPTIONS + SHIPMENT RISK + FLEET UTILISATION + COLD-CHAIN HEALTH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Active Disruptions Section */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Disruptions</h3>
            </div>
            <Link href="/app/disruptions" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              View All ({disruptions.length})
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            {activeDisruptionsList.map((d) => (
              <div key={d.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono">{d.id}:</span>
                    <span>{d.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{d.location} • {d.affectedShipmentIds.length} shipments affected</div>
                </div>
                <RiskBadge severity={d.severity} score={d.cascadeRiskScore} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Shipment Risk Section */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-orange-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Top 5 Highest-Risk Shipments</h3>
            </div>
            <Link href="/app/shipments" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            {criticalShipments.map((s) => (
              <div key={s.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white font-mono flex items-center gap-1.5">
                    <span>{s.id}</span>
                    {s.isColdChain && <Thermometer className="w-3 h-3 text-orange-500" />}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">{s.cargo} ({s.origin} → {s.destination})</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-rose-600 dark:text-rose-400">{s.riskScore}/100</div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">+{s.delayHours}h delay</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Utilisation Section */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Fleet Utilisation</h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{metrics.fleetUtilisationPercent}% Active</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-600 dark:text-slate-400">Current Fleet Utilisation</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{metrics.fleetUtilisationPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${metrics.fleetUtilisationPercent}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                <span>5 Idle Units Ready</span>
                <span>Target: 85%</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between gap-2">
              <div>
                <strong className="text-slate-900 dark:text-white">Spotlight: Truck T04 (Scania R500)</strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">Idle for 19.5h in Ahmedabad. Matched for Mundra quay.</p>
              </div>
              <Link href="/app/fleet/redeployment">
                <Button variant="primary" size="xs">
                  Redeploy
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Cold-Chain Health Section */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Cold-Chain Telemetry Health</h3>
            </div>
            <Link href="/app/cold-chain" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Inspect Sensors
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
              <div className="p-1.5 rounded bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                <div className="font-bold text-xs">1</div>
                <div>Critical</div>
              </div>
              <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <div className="font-bold text-xs">0</div>
                <div>Major</div>
              </div>
              <div className="p-1.5 rounded bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                <div className="font-bold text-xs">1</div>
                <div>Warning</div>
              </div>
              <div className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <div className="font-bold text-xs">10</div>
                <div>Nominal</div>
              </div>
            </div>

            {criticalColdChain && (
              <div className="p-2.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-1">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-slate-900 dark:text-white">{criticalColdChain.id} ({criticalColdChain.shipmentId})</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">{criticalColdChain.currentTemperature}°C</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">{criticalColdChain.cargo} • Excursion: {criticalColdChain.excursionDurationMins} mins</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </>
      )}

      {/* AI WORKFLOW MODAL: "Generate Response Plan" */}
      {isGeneratingPlan && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl bg-white dark:bg-[#0B101D] border border-indigo-200 dark:border-indigo-900/80 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Bob AI Operational Response Workflow
                </h2>
              </div>
              <button
                onClick={() => setIsGeneratingPlan(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps Progress */}
            <div className="space-y-3 text-xs">
              {workflowSteps.map((stepText, idx) => {
                const isDone = planProgressStep > idx;
                const isCurrent = planProgressStep === idx;

                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-md flex items-center justify-between transition-all ${
                      isDone
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300'
                        : isCurrent
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : isCurrent ? (
                        <Radio className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 shrink-0" />
                      )}
                      <span>{stepText}</span>
                    </div>
                    {isDone && <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">✓ Verified</span>}
                  </div>
                );
              })}
            </div>

            {/* Revealed Action Plan when finished */}
            {isPlanGenerated && (
              <div className="p-4 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-3 text-xs">
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>SYNTHESIZED ACTION PLAN READY</span>
                  <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded">
                    96% Confidence
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Reroute 18 JNPT shipments to Mundra Port T3, mobilize Truck T04 from Ahmedabad for chilled transfer of S101 biologics, and deploy dry-ice kit to VAX-2045.
                </p>
                <div className="pt-2 flex items-center justify-end gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsGeneratingPlan(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={CheckSquare}
                    onClick={() => {
                      approveAllImmediateActions();
                      setIsGeneratingPlan(false);
                    }}
                  >
                    Authorize All Actions
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
