import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/landing/MarketingNav';
import { MarketingFooter } from '@/components/landing/MarketingFooter';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight,
  ShieldAlert,
  Truck,
  ThermometerSnowflake,
  Sparkles,
  Bot,
  Activity,
  Compass,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Layers,
  BarChart3,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080C16] text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <MarketingNav />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden border-b border-slate-200 dark:border-slate-800/80">
        {/* Subtle background grid & ambient light */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Multimodal Supply Chain Control Tower</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Turn disruption into a{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-300">
                decision.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              One AI control tower for shipment impact, fleet capacity, route resilience, and cold-chain protection.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/app/overview">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Launch Live Control Tower
                </Button>
              </Link>
              <Link href="/platform">
                <Button variant="secondary" size="lg">
                  Explore Architecture
                </Button>
              </Link>
            </div>

            {/* Trust badge */}
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
              Built for IBM Bob AI Hackathon 2026 • L2 Logistics & Ports Operational Engine
            </p>
          </div>

          {/* Hero Visual Preview: Live Product Mockup */}
          <div className="mt-12 relative rounded-xl border border-slate-300/80 dark:border-slate-800 bg-white dark:bg-[#0B101D] shadow-xl dark:shadow-2xl overflow-hidden">
            {/* Mock Window Title Bar */}
            <div className="h-9 px-4 bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="ml-2 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  fluxchain-control-tower.ai/app/overview
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Telemetry Stream Active
                </span>
                <Link
                  href="/app/overview"
                  className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-medium transition-colors"
                >
                  Enter App →
                </Link>
              </div>
            </div>

            {/* Inside Live Preview Grid */}
            <div className="p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-transparent">
              {/* Top Banner inside preview */}
              <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-400 shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-slate-900 dark:text-white font-semibold">Active Disruption D001: Mumbai Port Strike</strong>
                      <span className="px-1.5 py-0.5 rounded bg-rose-200 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 font-mono text-[10px] uppercase font-bold">
                        Critical Severity
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      72-hour crane walkout at Nhava Sheva affecting 18 inbound shipments including 3 high-value cold-chain units.
                    </p>
                  </div>
                </div>
                <Link
                  href="/app/disruptions/D001"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs self-start md:self-auto shrink-0 transition-colors shadow-sm"
                >
                  <span>Review Impact Plan</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 4 Mini KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    At-Risk Shipments
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 tabular-nums">18</span>
                    <span className="text-[10px] text-rose-600 dark:text-rose-400 font-mono">+12 today</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    Idle Fleet Assets
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">5</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Truck T04 ready</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    Cold-Chain Excursions
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-orange-600 dark:text-orange-400 tabular-nums">2</span>
                    <span className="text-[10px] text-orange-600 dark:text-orange-400 font-mono">VAX-2045 (9.7°C)</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    AI Response Time
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">1.4s</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Bob AI Granite</span>
                  </div>
                </div>
              </div>

              {/* Connected Operational Response Chain in Hero Preview */}
              <div className="p-4 rounded-lg bg-indigo-50/70 dark:bg-slate-900/90 border border-indigo-200 dark:border-indigo-900/50 space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    Recommended Autonomous Operational Plan: S101 & T04
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Confidence: 96%</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left shadow-xs">
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono font-semibold text-[11px]">1. REROUTE S101</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1 text-[11px]">Divert vessel from JNPT to Mundra Port Terminal 3. Saves 71h waiting time.</p>
                  </div>
                  <div className="p-3 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left shadow-xs">
                    <span className="text-amber-600 dark:text-amber-400 font-mono font-semibold text-[11px]">2. REDEPLOY TRUCK T04</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1 text-[11px]">Mobilize idle 18T reefer in Ahmedabad to Mundra quay for chilled transfer.</p>
                  </div>
                  <div className="p-3 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left shadow-xs">
                    <span className="text-rose-600 dark:text-rose-400 font-mono font-semibold text-[11px]">3. STABILIZE VAX-2045</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1 text-[11px]">Emergency dry-ice re-icing kit deployed. Restores temperature to &lt;6°C.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section: 3 Major Pain Points */}
      <section className="py-20 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-semibold">
              The Reality of Global Logistics
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Three critical problems. One cascading failure.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              When a single port strike or storm occurs, legacy control towers only show what already broke. FluxChain AI unifies disruptions, idle assets, and thermal risks into actionable decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Disruption Chaos */}
            <div className="p-5 sm:p-6 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-900/60 transition-all space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Disruption Chaos</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                &ldquo;Disruptions cascade across shipments faster than operators can react.&rdquo;
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Weather alerts, strikes, and geopolitical blockades trap containers in outer anchorages, causing massive demurrage fees and line stoppages.
              </p>
            </div>

            {/* Card 2: Idle Capacity */}
            <div className="p-5 sm:p-6 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-900/60 transition-all space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Idle Capacity</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                &ldquo;Unused assets sit idle while critical routes remain overloaded.&rdquo;
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Trucks, specialized reefer units, and rakes sit underutilized in inland depots only a few hundred kilometers away from choked marine terminals.
              </p>
            </div>

            {/* Card 3: Cold-Chain Risk */}
            <div className="p-5 sm:p-6 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-900/60 transition-all space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center">
                <ThermometerSnowflake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Cold-Chain Risk</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                &ldquo;Temperature excursions can stay hidden until delivery.&rdquo;
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                High-value oncology medicines experience thermal degradation while awaiting customs, discovered only upon delivery when batches must be destroyed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works: 5-Step Core Product Workflow */}
      <section className="py-20 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
              Closed-Loop Operational Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              How FluxChain AI Works
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              From continuous global sensor ingestion to operator-in-the-loop authorization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {[
              {
                step: '01',
                title: 'Detect',
                desc: 'Ingests global weather, port strikes, AIS vessel signals, and IoT temperature telemetry.',
              },
              {
                step: '02',
                title: 'Understand',
                desc: 'Models cascading disruption impact across active shipments, corridors, and customer SLAs.',
              },
              {
                step: '03',
                title: 'Recommend',
                desc: 'Generates alternative multimodal routes and spatial matches for idle fleet capacity.',
              },
              {
                step: '04',
                title: 'Act',
                desc: 'Operator approves unified response with a single click: rerouting, redeployment, and inspection.',
              },
              {
                step: '05',
                title: 'Monitor',
                desc: 'Continuously tracks milestone execution, thermal recovery, and verified on-time arrival.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 relative group hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-colors shadow-sm"
              >
                <div className="font-mono text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-1.5">
                  {item.step}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform: Six Capabilities */}
      <section className="py-20 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
              Platform Modules
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Complete Control Tower Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Disruption Intelligence',
                icon: AlertTriangle,
                desc: 'Classifies weather, strikes, and canal blockades with real-time severity scoring and cascade risk prediction.',
                route: '/app/disruptions',
              },
              {
                title: 'Shipment Risk Scoring',
                icon: Activity,
                desc: 'Continuously scores delivery delay probability across multimodal legs based on live bottleneck metrics.',
                route: '/app/shipments',
              },
              {
                title: 'AI Multimodal Routing',
                icon: Compass,
                desc: 'Evaluates bypass options, feeder vessels, and inland rail corridors with explicit cost vs delay trade-offs.',
                route: '/app/routing',
              },
              {
                title: 'Fleet Optimisation',
                icon: Truck,
                desc: 'Detects idle reefer trucks and containers, automatically computing geospatial corridor matches.',
                route: '/app/fleet',
              },
              {
                title: 'Cold-Chain Intelligence',
                icon: ThermometerSnowflake,
                desc: 'Monitors real-time thermocouple streams, classifies excursion duration, and initiates dry-ice stabilization.',
                route: '/app/cold-chain',
              },
              {
                title: 'AI Operations Copilot',
                icon: Bot,
                desc: 'Natural language reasoning engine grounded in operational data for instant decision support and triage.',
                route: '/app/copilot',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-2.5">
                    <div className="w-9 h-9 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{feature.desc}</p>
                  </div>
                  <div className="pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href={feature.route}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 inline-flex items-center gap-1"
                    >
                      <span>Open in Control Tower</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Copilot Showcase */}
      <section className="py-20 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                Grounded Operations Copilot
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Ask operational questions. Get structured action plans.
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                FluxChain AI does not generate generic chatbot responses. Every answer includes verified evidence, delay impacts, recommended alternative corridors, and a ready-to-approve execution payload.
              </p>

              <div className="space-y-2">
                {[
                  'What is our biggest operational risk right now?',
                  'Which shipments are affected by the Mumbai disruption?',
                  'Which idle assets should we redeploy to Mundra?',
                  'Show critical cold-chain excursions.',
                ].map((prompt, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 shadow-xs"
                  >
                    <Bot className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>&ldquo;{prompt}&rdquo;</span>
                  </div>
                ))}
              </div>

              <div>
                <Link href="/app/copilot">
                  <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                    Experience Copilot Live
                  </Button>
                </Link>
              </div>
            </div>

            {/* Copilot Response Preview */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B101D] p-5 space-y-3.5 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">IBM Bob AI Copilot</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                  Grounded in 50 Shipments
                </span>
              </div>

              <div className="text-xs space-y-3">
                <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-semibold">User Prompt</span>
                  <p className="text-slate-800 dark:text-slate-200 mt-1 font-medium">&ldquo;What should I do first?&rdquo;</p>
                </div>

                <div className="p-3.5 rounded-md bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-2">
                  <div className="font-semibold text-slate-900 dark:text-white">EXECUTIVE SUMMARY</div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Your highest priority is immediate stabilization of Cold-Chain Shipment S101 (VAX-2045 mRNA Therapeutics), followed by rerouting S101 & S103 and redeploying idle Truck T04.
                  </p>
                  <div className="pt-2 border-t border-indigo-200 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-400">
                    <strong className="text-rose-600 dark:text-rose-400">IMPACT:</strong> $3.4M biologics spoilage avoided • 71h delay saved
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center relative overflow-hidden bg-slate-100/60 dark:bg-slate-950/30 border-t border-slate-200 dark:border-slate-800/80">
        <div className="relative max-w-3xl mx-auto px-4 space-y-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Your next supply-chain decision is already waiting.
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Launch the live control tower to explore the interactive Mumbai Port Strike scenario, cold-chain excursion monitor, and autonomous action center.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/app/overview">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Launch Control Tower
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
