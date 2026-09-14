import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/landing/MarketingNav';
import { MarketingFooter } from '@/components/landing/MarketingFooter';
import {
  AlertTriangle,
  Compass,
  Truck,
  ThermometerSnowflake,
  Bot,
  Activity,
  ArrowRight,
  CheckCircle,
  Sliders,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      <MarketingNav />

      <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Deep Functional Capabilities
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Engineered for High-Pressure Supply Chains
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            FluxChain AI bridges the gap between passive visibility and operational execution. Discover the technical features powering our multi-tier control tower.
          </p>
        </div>

        {/* Feature 1: Disruption Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-800/60 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Disruption Intelligence & Cascade Modeling</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Continuously correlates real-time weather alerts, union strikes, geopolitical conflict zones, and terminal mechanical failures against active bills of lading.
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated cascade impact mapping for up to 100+ correlated shipments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dwell time escalation algorithms with predictive demurrage cost modeling</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Geospatial polygon exclusion zones for naval security advisories</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/app/disruptions"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                <span>Explore Disruption Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2.5">
            <div className="text-slate-400 text-[11px] pb-2 border-b border-slate-800 flex justify-between">
              <span>DISRUPTION_TELEMETRY // D001</span>
              <span className="text-rose-400">SEVERITY: CRITICAL</span>
            </div>
            <div className="text-slate-300">
              Target: <span className="text-white">JNPT Nhava Sheva, Mumbai (IN)</span>
            </div>
            <div className="text-slate-300">
              Type: <span className="text-amber-400">Port Strike (72 Hours Expected)</span>
            </div>
            <div className="text-slate-300">
              Affected Shipments: <span className="text-rose-400 font-bold">18 active (3 cold-chain)</span>
            </div>
            <div className="text-slate-300">
              Cascade Risk Index: <span className="text-rose-400">92/100</span>
            </div>
          </div>
        </div>

        {/* Feature 2: Multimodal AI Routing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2.5 order-2 lg:order-1">
            <div className="text-slate-400 text-[11px] pb-2 border-b border-slate-800 flex justify-between">
              <span>ROUTING_ENGINE // R-ALT-01</span>
              <span className="text-emerald-400">AI RECOMMENDED (96/100)</span>
            </div>
            <div className="text-slate-300">
              Via: <span className="text-white">Mundra Port + Express Reefer Highway</span>
            </div>
            <div className="text-slate-300">
              Transit Delay Delta: <span className="text-emerald-400 font-bold">-71 Hours Saved</span>
            </div>
            <div className="text-slate-300">
              Cost Differential: <span className="text-slate-200">+$4,200 (+12.5%)</span>
            </div>
            <div className="text-slate-300">
              Matched Fleet Asset: <span className="text-indigo-400">Truck T04 (Ahmedabad)</span>
            </div>
          </div>
          <div className="space-y-4 order-1 lg:order-2">
            <div className="w-10 h-10 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-800/60 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Multimodal Route Optimization & Trade-Offs</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When a gateway port fails, FluxChain AI instantaneously generates alternative sea-rail-road bypass routes, evaluating cost, delay, and capacity constraints side-by-side.
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clear &ldquo;AI Recommended&rdquo; designation with transparent trade-off rationale</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Simulated transit timelines for 24h, 48h, and 72h disruption durations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct carrier EDI dispatch integration ready for authorization</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/app/routing"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                <span>View Routing Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature 3: Fleet Redeployment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/60 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Spatial Idle Fleet Asset Redeployment</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Monitors idle prime movers, reefer units, and container chassis across regional depots, matching spare capacity to overloaded disruption corridors.
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automatic idle asset detection with configurable hour thresholds</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Geospatial corridor matching scoring distance, capacity, and reefer compatibility</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Before-and-after fleet utilisation projection modeling</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/app/fleet/redeployment"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                <span>Open Redeployment Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2.5">
            <div className="text-slate-400 text-[11px] pb-2 border-b border-slate-800 flex justify-between">
              <span>ASSET_DISPATCH // TRUCK_T04</span>
              <span className="text-emerald-400">CORRIDOR MATCH: 94%</span>
            </div>
            <div className="text-slate-300">
              Location: <span className="text-white">Ahmedabad Logistics Hub (320 km from Mundra)</span>
            </div>
            <div className="text-slate-300">
              Capacity: <span className="text-white">18.0 Tons (Carrier Cryo-Reefer)</span>
            </div>
            <div className="text-slate-300">
              Idle Duration: <span className="text-amber-400">19.5 Hours Standby</span>
            </div>
            <div className="text-slate-300">
              Assigned Action: <span className="text-indigo-400">Emergency cold-chain transfer for S101</span>
            </div>
          </div>
        </div>

        {/* Feature 4: Cold-Chain Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2.5 order-2 lg:order-1">
            <div className="text-slate-400 text-[11px] pb-2 border-b border-slate-800 flex justify-between">
              <span>COLD_CHAIN_MONITOR // VAX-2045</span>
              <span className="text-rose-400 animate-pulse">EXCURSION: 9.7°C (47 MINS)</span>
            </div>
            <div className="text-slate-300">
              Allowed Range: <span className="text-white">2.0°C – 8.0°C</span>
            </div>
            <div className="text-slate-300">
              Product: <span className="text-white">Oncology mRNA Therapeutics ($3.4M Cargo)</span>
            </div>
            <div className="text-slate-300">
              Remaining Kinetic Tolerance: <span className="text-rose-400 font-bold">75 Minutes</span>
            </div>
            <div className="text-slate-300">
              Action: <span className="text-emerald-400">Emergency dry-ice recharge kit queued at Mundra</span>
            </div>
          </div>
          <div className="space-y-4 order-1 lg:order-2">
            <div className="w-10 h-10 rounded-lg bg-orange-950/60 text-orange-400 border border-orange-800/60 flex items-center justify-center">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Kinetic Cold-Chain Sensor Intelligence</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Detects temperature excursions in real time from container IoT sensors, calculates cumulative thermal degradation kinetics, and triggers physical interventions.
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real-time time-series thermal charts with dynamic min/max safety bands</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Excursion duration counter and Arrhenius biological shelf-life projection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Autonomous action plan generation: re-icing, technical inspection, and re-routing</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/app/cold-chain"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                <span>View Cold-Chain Telemetry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
