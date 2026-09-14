import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/landing/MarketingNav';
import { MarketingFooter } from '@/components/landing/MarketingFooter';
import { Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Corridor Pilot',
      price: '$4,800',
      period: '/ month',
      desc: 'Ideal for regional logistics operators validating AI disruption and cold-chain automation.',
      features: [
        'Up to 250 active shipments',
        '3 designated trade corridors (e.g. Asia-Middle East)',
        'Disruption intelligence & alerts',
        'Standard cold-chain thermocouple monitoring',
        'AI Multimodal routing recommendations',
        'Standard email support',
      ],
      cta: 'Start 14-Day Pilot',
      highlighted: false,
    },
    {
      name: 'Enterprise Control Tower',
      price: '$12,500',
      period: '/ month',
      desc: 'Full-suite operational decision engine for multinational forwarders, ports, and pharma shippers.',
      features: [
        'Unlimited active shipments & carriers',
        'Global disruption monitoring (ocean, air, rail, road)',
        'Idle fleet asset geospatial redeployment engine',
        'Kinetic Arrhenius cold-chain degradation modeling',
        'Full IBM Bob AI Copilot decision support',
        'Action Center with 1-click execution approvals',
        'Simulation sandbox with what-if scenario testing',
        'Dedicated 24/7 mission-critical operations SLA',
      ],
      cta: 'Launch Control Tower',
      highlighted: true,
    },
    {
      name: 'Custom Infrastructure',
      price: 'Custom',
      period: '',
      desc: 'Tailored on-prem or hybrid cloud deployment with custom IBM watsonx Granite fine-tuning.',
      features: [
        'Custom private cloud / air-gapped deployment',
        'Custom ERP & TMS bidirectional connectors',
        'Bespoke ML models for proprietary reefer fleets',
        'Executive board dashboards & reporting suites',
        'Dedicated Solutions Architect team',
      ],
      cta: 'Contact Architecture Team',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      <MarketingNav />

      <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Transparent Investment
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Predictable Pricing. Exponential ROI.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Preventing a single cold-chain pharmaceutical cargo loss or factory line stoppage pays for your annual subscription multiple times over.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl flex flex-col justify-between transition-all ${
                tier.highlighted
                  ? 'bg-gradient-to-b from-slate-900 to-navy-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20'
                  : 'bg-slate-900/60 border border-slate-800'
              }`}
            >
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                    {tier.highlighted && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono uppercase border border-indigo-500/40">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{tier.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-xs text-slate-400">{tier.period}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-800">
                <Link
                  href={tier.highlighted ? '/app/overview' : '/contact'}
                  className={`w-full py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    tier.highlighted
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <span>{tier.cta}</span>
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
