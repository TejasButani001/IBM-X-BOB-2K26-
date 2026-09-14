import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/landing/MarketingNav';
import { MarketingFooter } from '@/components/landing/MarketingFooter';
import {
  Layers,
  Activity,
  Compass,
  Truck,
  Thermometer,
  Bot,
  Sliders,
  FileText,
  PlugZap,
  ArrowRight,
  Shield,
} from 'lucide-react';

export default function PlatformPage() {
  const pillars = [
    {
      icon: Activity,
      title: 'Executive Control Tower',
      desc: 'Real-time situational awareness across all ocean vessels, feeder barges, rail shuttles, and highway prime movers.',
      link: '/app/overview',
    },
    {
      icon: Layers,
      title: 'Disruption & Incident Intelligence',
      desc: 'Correlate strikes, storms, and canal closures against specific container manifests and delivery commitments.',
      link: '/app/disruptions',
    },
    {
      icon: Compass,
      title: 'AI Multimodal Routing Engine',
      desc: 'Evaluate bypass ports, secondary highway corridors, and electrified dedicated freight rail rakes.',
      link: '/app/routing',
    },
    {
      icon: Truck,
      title: 'Fleet Utilisation & Spatial Matching',
      desc: 'Identify idle trucks, containers, and vessels with real-time geospatial corridor match scoring.',
      link: '/app/fleet',
    },
    {
      icon: Thermometer,
      title: 'Kinetic Cold-Chain Telemetry',
      desc: 'Continuous thermal tracking with Arrhenius biological kinetic degradation modeling and dry-ice recharge alerts.',
      link: '/app/cold-chain',
    },
    {
      icon: Bot,
      title: 'IBM Bob AI Grounded Copilot',
      desc: 'Natural language triage engine grounded directly in your active fleet and shipment telemetry.',
      link: '/app/copilot',
    },
    {
      icon: Sliders,
      title: 'What-If Simulation Sandbox',
      desc: 'Stress-test your supply network against 24h, 48h, or 72h disruption scenarios before they occur.',
      link: '/app/simulations',
    },
    {
      icon: FileText,
      title: 'Executive & Compliance Reporting',
      desc: 'Generate audit-ready incident reports, carbon footprint trade-offs, and customer delay briefings.',
      link: '/app/reports',
    },
    {
      icon: PlugZap,
      title: 'Enterprise Connectors',
      desc: 'Connect to IBM watsonx, Instana APM, carrier EDI, IoT sensors, and enterprise ERP systems.',
      link: '/app/integrations',
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      <MarketingNav />

      <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Unified Architecture
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            The Enterprise AI Supply Chain Platform
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Nine integrated operational modules built to replace fragmented point solutions with an interconnected command center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-800/60 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <Link
                    href={p.link}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
                  >
                    <span>Launch Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
