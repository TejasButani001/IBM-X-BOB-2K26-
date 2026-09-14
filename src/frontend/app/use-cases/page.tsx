import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/landing/MarketingNav';
import { MarketingFooter } from '@/components/landing/MarketingFooter';
import {
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle,
} from 'lucide-react';

export default function UseCasesPage() {
  const useCases = [
    {
      title: 'Port Strike Bypass & Feeder Diversion',
      persona: 'Marine Operations Director',
      scenario: '72-hour dockworkers walkout at Nhava Sheva blocks 18 inbound container vessels.',
      solution: 'FluxChain AI flags high-priority cargo within 4 minutes, simulates berth capacity at Mundra, and dispatches EDI diversion orders.',
      roi: '71 hours delay reduction • $840,000 in avoided demurrage and detention charges.',
    },
    {
      title: 'mRNA Vaccine Cold-Chain Thermal Excursion',
      persona: 'Pharma Quality Assurance VP',
      scenario: 'Reefer unit VAX-2045 breaches 8.0°C threshold offshore for 47 minutes.',
      solution: 'AI assesses Arrhenius kinetic degradation window (75 mins remaining), alerts the captain, and queues dry-ice recharge kit at Mundra quay.',
      roi: '100% batch preservation • $3.4M biologics spoilage loss averted.',
    },
    {
      title: 'Automotive Microcontroller Fast-Track',
      persona: 'Automotive Supply Chain Lead',
      scenario: 'Semiconductors delayed by port congestion threaten Pune assembly line shutdown in 48 hours.',
      solution: 'Engine identifies idle flatbed Truck T08 in Vadodara, routes shipment S103 via Hazira Port, and delivers parts with 8 hours to spare.',
      roi: 'Avoided $1.2M/day plant stoppage penalty • Zero line downtime.',
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      <MarketingNav />

      <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Real-World Impact
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Operational Use Cases & Quantified ROI
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            See how leading global supply chain operators turn catastrophic disruptions into coordinated decisions.
          </p>
        </div>

        <div className="space-y-8">
          {useCases.map((uc, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <h3 className="text-xl font-bold text-white">{uc.title}</h3>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/50">
                  Role: {uc.persona}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="space-y-2">
                  <span className="font-semibold text-rose-400 uppercase text-xs font-mono">
                    The Crisis Scenario
                  </span>
                  <p className="text-slate-300 leading-relaxed">{uc.scenario}</p>
                </div>
                <div className="space-y-2">
                  <span className="font-semibold text-emerald-400 uppercase text-xs font-mono">
                    The FluxChain AI Response
                  </span>
                  <p className="text-slate-300 leading-relaxed">{uc.solution}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-indigo-300">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">Quantified Impact:</span>
                  <strong className="text-white">{uc.roi}</strong>
                </div>
                <Link
                  href="/app/overview"
                  className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-sans font-medium"
                >
                  <span>Simulate in Control Tower</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
