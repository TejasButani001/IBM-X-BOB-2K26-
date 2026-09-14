import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/landing/MarketingNav';
import { MarketingFooter } from '@/components/landing/MarketingFooter';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Truck,
  Thermometer,
  Bot,
  Sliders,
  CheckSquare,
} from 'lucide-react';

export default function DemoGuidePage() {
  const demoSteps = [
    {
      step: 1,
      title: 'Launch the Control Tower',
      route: '/app/overview',
      desc: 'View active high-density KPI cards: 18 at-risk shipments, 5 idle fleet assets, and 2 active cold-chain alerts.',
      action: 'Click "Launch Control Tower" button',
      icon: Sparkles,
    },
    {
      step: 2,
      title: 'Inspect Mumbai Port Strike (D001)',
      route: '/app/disruptions/D001',
      desc: 'Examine the 72-hour Nhava Sheva strike affecting 18 inbound shipments with 77h average dwell time surge.',
      action: 'Open Disruption D001 detail page',
      icon: AlertTriangle,
    },
    {
      step: 3,
      title: 'Drill into Critical Shipment S101',
      route: '/app/shipments/S101',
      desc: 'Inspect S101 carrying VAX-2045 mRNA Therapeutics. Risk score is 94/100 due to combined strike delay and refrigeration failure.',
      action: 'Click "Find Alternative Route"',
      icon: Compass,
    },
    {
      step: 4,
      title: 'Evaluate AI Recommended Route R-ALT-01',
      route: '/app/routing',
      desc: 'See why AI recommends Mundra Port bypass: saves 71 hours of waiting time for an extra $4,200 freight cost.',
      action: 'Compare Route R-ALT-01 with Hazira and Pipavav',
      icon: Compass,
    },
    {
      step: 5,
      title: 'Detect Idle Truck T04 in Ahmedabad',
      route: '/app/fleet/redeployment',
      desc: 'The spatial engine matches Truck T04 (18T reefer, 0% utilisation, 19.5h idle) to the Mundra-Mumbai corridor with 94% compatibility.',
      action: 'Review redeployment proposal',
      icon: Truck,
    },
    {
      step: 6,
      title: 'Monitor Cold-Chain VAX-2045 Excursion',
      route: '/app/cold-chain/VAX-2045',
      desc: 'Inspect the live time-series temperature chart showing peak 10.0°C excursion and Arrhenius stability window (75 mins).',
      action: 'Trigger emergency re-icing alert',
      icon: Thermometer,
    },
    {
      step: 7,
      title: 'Consult the Grounded AI Copilot',
      route: '/app/copilot',
      desc: 'Ask "What should I do first?" and receive an executive summary, evidence, impact analysis, and ready-to-execute actions.',
      action: 'Click suggested prompt in Copilot',
      icon: Bot,
    },
    {
      step: 8,
      title: 'Run 24h vs 48h Disruption Simulation',
      route: '/app/simulations',
      desc: 'Slide the duration slider to test how extending the strike cascades risk across additional feeder services.',
      action: 'Adjust simulation timeline',
      icon: Sliders,
    },
    {
      step: 9,
      title: 'Approve Unified Operational Plan',
      route: '/app/action-center',
      desc: 'Click "Approve All Recommended Actions" in the Action Center. Watch S101 rerouted, Truck T04 deployed, and VAX-2045 stabilized.',
      action: 'Click "Approve All Immediate Actions"',
      icon: CheckSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      <MarketingNav />

      <main className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold">
            EVALUATOR & JUDGE WALKTHROUGH GUIDE
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Interactive Hackathon Demo Journey
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Follow this step-by-step journey to experience the interconnected operational response chain across disruptions, fleet assets, and cold-chain cargo.
          </p>
          <div className="pt-2">
            <Link
              href="/app/overview"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/25"
            >
              <span>Begin Step 1: Launch Control Tower</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {demoSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-800/50 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    0{step.step}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{step.title}</h3>
                      <span className="text-[10px] font-mono text-slate-400">
                        {step.route}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                    <div className="text-[11px] text-emerald-400 font-medium">
                      Recommended Action: {step.action}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-2 md:pt-0">
                  <Link
                    href={step.route}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
                  >
                    <span>Open Route</span>
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
