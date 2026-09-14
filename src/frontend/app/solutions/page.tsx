import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/landing/MarketingNav';
import { MarketingFooter } from '@/components/landing/MarketingFooter';
import {
  Anchor,
  Pill,
  Car,
  Boxes,
  Building2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function SolutionsPage() {
  const solutions = [
    {
      icon: Anchor,
      title: 'Marine Ports & Terminal Operators',
      desc: 'Predict yard congestion, manage berth queues during labor walkouts, and dynamically coordinate feeder bypasses before anchorages hit capacity.',
      benefits: [
        'Cut offshore vessel queue time by up to 45%',
        'Automated berth diversion protocols to sister ports',
        'Direct EDI integration with marine carriers and customs',
      ],
    },
    {
      icon: Pill,
      title: 'Pharmaceutical & Cold-Chain Logistics',
      desc: 'Eliminate catastrophic loss of temperature-sensitive vaccines, insulin, and biologics during maritime port delays and customs holds.',
      benefits: [
        'Real-time kinetic thermal excursion detection',
        'Automated emergency dry-ice re-blanketing workflows',
        'Audit-ready electronic batch temperature compliance certificates',
      ],
    },
    {
      icon: Car,
      title: 'Automotive & Just-in-Time Manufacturing',
      desc: 'Prevent multimillion-dollar assembly plant stoppages by isolating critical Tier-1 silicon microcontrollers and dispatching road express shuttles.',
      benefits: [
        'Priority part-level tracking across complex bills of lading',
        'Automatic alternate corridor matching to inland assembly hubs',
        '90% faster incident response compared to phone/email triage',
      ],
    },
    {
      icon: Boxes,
      title: 'Global Freight Forwarders & 3PLs',
      desc: 'Deliver client-facing transparency with verified proactive alerts and instant AI rerouting proposals before customers experience stockouts.',
      benefits: [
        'Turn disruption notices into value-added routing solutions',
        'Automated customer SLA impact briefings',
        'Integrated fleet capacity sharing across partner carriers',
      ],
    },
    {
      icon: Building2,
      title: 'Enterprise Supply Chain Control Towers',
      desc: 'Consolidate multiple disconnected visibility tools into one unified decision engine that connects disruptions directly to fleet assets.',
      benefits: [
        'Single pane of glass across ocean, air, rail, and road',
        'IBM Bob AI decision-support with human-in-the-loop authorization',
        'Scenario simulation sandbox for executive risk planning',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      <MarketingNav />

      <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Industry Solutions
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Tailored for Mission-Critical Supply Chains
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Whether managing cold-chain pharmaceuticals or multi-tier automotive supply lines, FluxChain AI adapts to your operational constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, idx) => {
            const Icon = sol.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/60 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{sol.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{sol.desc}</p>
                  <div className="pt-2 space-y-2">
                    {sol.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <Link
                    href="/app/overview"
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1.5"
                  >
                    <span>Launch in Demo Mode</span>
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
