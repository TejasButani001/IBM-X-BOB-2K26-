import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/landing/MarketingNav';
import { MarketingFooter } from '@/components/landing/MarketingFooter';
import {
  ArrowRight,
  Database,
  Cpu,
  Workflow,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Global Sensor & Disruption Ingestion',
      subtitle: 'Continuous Multimodal Data Pipelines',
      desc: 'FluxChain AI connects to maritime AIS feeds, global weather radars, port strike bulletins, customs EDI gate feeds, and cellular IoT cold-chain thermocouples.',
      tech: ['Satellite AIS Feed', 'NOAA Weather APIs', 'EDI 315/214 Status', 'BLE & 4G Sensors'],
    },
    {
      num: '02',
      title: 'Cascading Impact Analysis (IBM Bob AI)',
      subtitle: 'Correlating Macro Events with Micro Bills of Lading',
      desc: 'When an event like the Mumbai Port Strike (D001) occurs, watsonx Granite 3.0 algorithms calculate ripple effects across all active shipments, dwell hours, and temperature exposures.',
      tech: ['watsonx.ai Granite 3.0', 'Graph Dependency Modeling', 'ETA Drift Simulation'],
    },
    {
      num: '03',
      title: 'Autonomous Multimodal Route & Fleet Matching',
      subtitle: 'Synthesizing Alternative Corridors & Idle Assets',
      desc: 'Instead of alerting operators without a fix, the engine evaluates available deepwater bypasses (e.g. Mundra Port) and identifies nearby idle assets (e.g. Truck T04 in Ahmedabad) to fulfill the corridor.',
      tech: ['Spatial K-D Tree Matching', 'Capacity-Weight Verifier', 'Tariff & Cost Optimization'],
    },
    {
      num: '04',
      title: 'Unified Operational Action Plan',
      subtitle: 'Human-in-the-Loop Decision Support',
      desc: 'The operator reviews a structured response plan: (1) Reroute S101, (2) Redeploy Truck T04, (3) Inspect VAX-2045 reefer unit. A single click authorizes execution across all systems.',
      tech: ['Action Board', 'Audit Trail Logging', 'Confidence Scoring (96%)'],
    },
    {
      num: '05',
      title: 'Real-Time Milestone & Thermal Verification',
      subtitle: 'Closing the Operational Loop',
      desc: 'Telemetry verifies vessel turn to Mundra, truck dispatch, and thermal re-stabilization below 6°C, ensuring compliance and SLA integrity.',
      tech: ['Geofence Triggers', 'Thermal Kinetic Tracking', 'Customer EDI Push'],
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      <MarketingNav />

      <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Technical Architecture
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            How FluxChain AI Works
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            A 5-stage closed-loop operational decision pipeline connecting disruption detection to physical asset execution.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-indigo-500/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-3xl font-extrabold text-indigo-400">
                  {step.num}
                </span>
                <div className="space-y-1.5 max-w-2xl">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    {step.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="lg:border-l lg:border-slate-800 lg:pl-6 space-y-2 shrink-0">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Core Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {step.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-indigo-950/40 border border-indigo-900/50 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Experience the full workflow in live demo mode</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Test the complete chain: trigger the Mumbai Port Strike, observe S101 at risk, review Mundra bypass routing, and redeploy Truck T04.
          </p>
          <div className="pt-2">
            <Link
              href="/app/overview"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all"
            >
              <span>Launch Interactive Walkthrough</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
