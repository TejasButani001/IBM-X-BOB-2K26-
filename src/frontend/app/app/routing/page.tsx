'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import GoogleWorldMap from '../../../components/ui/GoogleWorldMap';

import { RiskBadge } from '../../../components/ui/RiskBadge';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  MapPin,
  Clock,
  DollarSign,
  Truck,
  Anchor,
  HelpCircle,
  X,
  Play,
} from 'lucide-react';

interface RouteOption {
  id: string;
  code: string;
  name: string;
  via: string;
  type: 'AI Recommended' | 'Alternative' | 'Current';
  travelTimeHours: number;
  extraDelayHours: number;
  costDeltaUsd: number;
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  capacity: string;
  carrier: string;
  aiScore: number;
  status: 'Normal' | 'At Risk' | 'Disrupted' | 'Recommended';
  evidence: string[];
  nodes: { name: string; type: 'origin' | 'port' | 'rail' | 'destination'; status: 'normal' | 'disrupted' | 'recommended' | 'warning' }[];
}

const ROUTE_OPTIONS: RouteOption[] = [
  {
    id: 'R-ALT-01',
    code: 'OPTION A',
    name: 'China → Mundra → Mumbai Bypass',
    via: 'Mundra Deepwater Terminal (Rail Corridor)',
    type: 'AI Recommended',
    travelTimeHours: 142,
    extraDelayHours: 14,
    costDeltaUsd: 1450,
    riskScore: 18,
    riskLevel: 'LOW',
    capacity: '24 Berths / High Availability',
    carrier: 'Maersk Line / Concor Express Rail',
    aiScore: 92,
    status: 'Recommended',
    evidence: [
      'Mundra port railhead connects directly to Nhava Sheva dry dock in 18 hours.',
      'Reduces expected delay by 63 hours compared to waiting at JNPT outer anchorage.',
      'Container reefer plugs available with continuous telemetry monitoring.',
      'Feeder vessel berth congestion index is 1.2 (vs 9.4 at JNPT).',
    ],
    nodes: [
      { name: 'Shanghai Port', type: 'origin', status: 'normal' },
      { name: 'Malacca Strait', type: 'port', status: 'normal' },
      { name: 'Mundra Port', type: 'port', status: 'recommended' },
      { name: 'Concor Rail Corridor', type: 'rail', status: 'recommended' },
      { name: 'Mumbai Logistics Hub', type: 'destination', status: 'normal' },
    ],
  },
  {
    id: 'R-ALT-02',
    code: 'OPTION B',
    name: 'China → Colombo → Mumbai Feeder',
    via: 'Colombo South Container Terminal',
    type: 'Alternative',
    travelTimeHours: 168,
    extraDelayHours: 22,
    costDeltaUsd: 890,
    riskScore: 42,
    riskLevel: 'MEDIUM',
    capacity: '12 Berths / Moderate Congestion',
    carrier: 'MSC Mediterranean Shipping',
    aiScore: 78,
    status: 'At Risk',
    evidence: [
      'Colombo transshipment avoids JNPT direct strike zone.',
      'Feeder connection to Mumbai exhibits moderate 22h queue time.',
      'Reefer monitoring available but requires manual checkpoint verification.',
    ],
    nodes: [
      { name: 'Shanghai Port', type: 'origin', status: 'normal' },
      { name: 'Singapore Hub', type: 'port', status: 'normal' },
      { name: 'Colombo Terminal', type: 'port', status: 'warning' },
      { name: 'Mumbai Anchorage', type: 'destination', status: 'warning' },
    ],
  },
  {
    id: 'R-CURRENT',
    code: 'CURRENT ROUTE',
    name: 'China → JNPT Nhava Sheva Direct',
    via: 'JNPT Marine Gate 4',
    type: 'Current',
    travelTimeHours: 198,
    extraDelayHours: 77,
    costDeltaUsd: 0,
    riskScore: 94,
    riskLevel: 'CRITICAL',
    capacity: '0 Berths / Blocked by D001 Strike',
    carrier: 'Evergreen Marine Line',
    aiScore: 24,
    status: 'Disrupted',
    evidence: [
      'D001 Labor strike walkout has suspended crane operations.',
      'Vessel idled at outer anchorage for over +77 hours.',
      'mRNA cargo thermal excursion risk escalates past 48h limit.',
    ],
    nodes: [
      { name: 'Shanghai Port', type: 'origin', status: 'normal' },
      { name: 'JNPT Outer Anchorage', type: 'port', status: 'disrupted' },
      { name: 'JNPT Terminal 3', type: 'port', status: 'disrupted' },
      { name: 'Mumbai Logistics Hub', type: 'destination', status: 'warning' },
    ],
  },
];

export default function RoutingCenterPage() {
  const { rerouteShipment } = useControlTower();
  const [selectedRouteId, setSelectedRouteId] = useState<string>('R-ALT-01');
  const [activeEvidenceRoute, setActiveEvidenceRoute] = useState<RouteOption | null>(null);
  const [isApproved, setIsApproved] = useState(false);

  const selectedRoute = ROUTE_OPTIONS.find((r) => r.id === selectedRouteId) || ROUTE_OPTIONS[0];

  const handleApprove = (routeId: string) => {
    rerouteShipment('S101', routeId);
    setIsApproved(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Multimodal Routing Center"
        subtitle="Side-by-side alternative route evaluation, visual corridor comparison, and autonomous reroute authorization."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'AI Routing' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Target Cargo:</span>
            <span className="font-mono font-semibold text-slate-800 dark:text-white px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs shadow-2xs">
              S101 (VAX-2045 mRNA Therapeutics)
            </span>
          </div>
        }
      />

      {/* Disruption Warning Banner */}
      <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 shadow-enterprise flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-rose-400 uppercase tracking-wider font-mono text-[11px] bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              CURRENT ROUTE DISRUPTED
            </span>
            <span className="font-semibold text-white">Shanghai Port → JNPT Nhava Sheva (Mumbai)</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Vessel idling at outer anchorage due to D001 dockworkers strike. Cumulative expected delay is <strong className="text-rose-400 font-mono font-bold">+77 hours</strong>. Risk score: <strong className="text-rose-400 font-mono font-bold">94/100 (CRITICAL)</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/app/simulations"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <Play className="w-3.5 h-3.5 text-indigo-400" />
            <span>Simulate Reroute Cascade</span>
          </Link>
        </div>
      </div>

      {/* Route Visualization Map / Node Diagram */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white text-sm">Visual Corridor Map: {selectedRoute.name}</h3>
          </div>
          <span className="font-mono text-xs text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
            {selectedRoute.type}
          </span>
        </div>

        {/* Interactive Google GIS Map */}
        <div className="rounded-xl overflow-hidden mb-4">
          <GoogleWorldMap height="300px" center={[22.5, 71.5]} zoom={4} />
        </div>

        {/* Sequential Node Diagram */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 overflow-x-auto">

          <div className="flex items-center justify-between min-w-[650px] gap-2 py-4 px-2">
            {selectedRoute.nodes.map((node, idx) => {
              const isDisrupted = node.status === 'disrupted';
              const isRecommended = node.status === 'recommended';
              const isWarning = node.status === 'warning';

              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center gap-1.5 relative group">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border font-mono font-bold text-xs shadow-md transition-all ${
                        isDisrupted
                          ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                          : isRecommended
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-emerald-500/20'
                          : isWarning
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {node.type === 'origin' ? (
                        'ORG'
                      ) : node.type === 'destination' ? (
                        'DEST'
                      ) : node.type === 'rail' ? (
                        <Truck className="w-4 h-4" />
                      ) : (
                        <Anchor className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-[11px] font-medium text-slate-300 whitespace-nowrap">{node.name}</span>
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                        isDisrupted
                          ? 'text-rose-400 bg-rose-950/60'
                          : isRecommended
                          ? 'text-emerald-400 bg-emerald-950/60'
                          : isWarning
                          ? 'text-amber-400 bg-amber-950/60'
                          : 'text-slate-400 bg-slate-900'
                      }`}
                    >
                      {node.status}
                    </span>
                  </div>

                  {idx < selectedRoute.nodes.length - 1 && (
                    <div className="flex-1 flex items-center justify-center px-2">
                      <div
                        className={`h-0.5 w-full rounded transition-all ${
                          isDisrupted
                            ? 'bg-rose-500/60'
                            : isRecommended
                            ? 'bg-gradient-to-r from-emerald-500 to-indigo-500'
                            : 'bg-slate-700'
                        }`}
                      />
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0 -ml-1" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side-by-Side Route Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {ROUTE_OPTIONS.map((route) => {
          const isRecommended = route.type === 'AI Recommended';
          const isSelected = selectedRouteId === route.id;

          return (
            <div
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`p-5 rounded-2xl flex flex-col justify-between cursor-pointer transition-all border shadow-xl ${
                isRecommended
                  ? 'bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-900 border-2 border-indigo-500 shadow-indigo-500/10'
                  : route.type === 'Current'
                  ? 'bg-slate-900/60 border-rose-900/50 hover:border-rose-700'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                {/* Card Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-slate-400">{route.code}</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                          isRecommended
                            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                            : route.type === 'Current'
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {route.type}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 tabular-nums">
                        {route.aiScore}/100 Score
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">{route.name}</h3>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <span>Via:</span>
                    <span className="text-slate-200 font-medium">{route.via}</span>
                  </div>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">Extra Delay</div>
                    <div
                      className={`font-mono font-bold text-base mt-0.5 tabular-nums ${
                        route.extraDelayHours > 40 ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      +{route.extraDelayHours}h
                    </div>
                    <div className="text-[10px] text-slate-400">vs +77h JNPT</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">Estimated Cost</div>
                    <div className="font-mono font-semibold text-white text-base mt-0.5 tabular-nums">
                      +${route.costDeltaUsd}
                    </div>
                    <div className="text-[10px] text-slate-400">Freight delta</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">Risk Score</div>
                    <div className="font-mono font-bold text-xs mt-1">
                      <RiskBadge severity={route.riskLevel} score={route.riskScore} />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">Total Transit</div>
                    <div className="font-mono font-semibold text-slate-200 text-base mt-0.5 tabular-nums">
                      {route.travelTimeHours}h
                    </div>
                    <div className="text-[10px] text-slate-400">Door-to-door</div>
                  </div>
                </div>

                {/* Carrier & Capacity */}
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 space-y-1 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Carrier:</span>
                    <span className="text-slate-200 font-medium truncate max-w-[170px]">{route.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span className="text-emerald-400 font-medium">{route.capacity}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEvidenceRoute(route);
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Why this route?</span>
                </button>

                <Button
                  variant={isRecommended ? 'primary' : 'secondary'}
                  size="sm"
                  icon={CheckCircle2}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(route.id);
                  }}
                >
                  {isApproved && selectedRouteId === route.id ? 'Approved' : 'Approve Route'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* "Why this route?" Evidence Modal / Drawer */}
      {activeEvidenceRoute && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-white text-base">
                  AI Recommendation Evidence: {activeEvidenceRoute.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveEvidenceRoute(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">
                Supporting Operational Telemetry
              </div>
              <ul className="space-y-2">
                {activeEvidenceRoute.evidence.map((item, idx) => (
                  <li key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="font-mono text-slate-400">AI Confidence: 94.8%</span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleApprove(activeEvidenceRoute.id);
                  setActiveEvidenceRoute(null);
                }}
              >
                Authorize Reroute Immediately
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
