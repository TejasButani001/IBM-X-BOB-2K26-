import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/landing/MarketingNav';
import { MarketingFooter } from '@/components/landing/MarketingFooter';
import { Layers, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      <MarketingNav />

      <main className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Mission & Philosophy
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            From Passive Visibility to Decisive Action
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Traditional supply chain visibility tools tell you a container is 4 days late when it is already stuck. FluxChain AI turns disruption into a decision before damage occurs.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">Our Engineering Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <strong className="text-white block text-sm">1. Human-in-the-Loop AI</strong>
              <p className="text-slate-400">
                AI should recommend, calculate trade-offs, and pre-configure execution payloads. Operations leaders remain in command of authorization and final sign-off.
              </p>
            </div>
            <div className="space-y-2">
              <strong className="text-white block text-sm">2. Connected Operational Physics</strong>
              <p className="text-slate-400">
                You cannot solve a port strike without checking available road trucks, and you cannot reroute a refrigerated container without checking dwell time power supplies.
              </p>
            </div>
            <div className="space-y-2">
              <strong className="text-white block text-sm">3. Transparent Trade-Off Rationale</strong>
              <p className="text-slate-400">
                Every alternative route score explains exactly why it was chosen—balancing delay hours saved against additional bunker or highway freight expenditure.
              </p>
            </div>
            <div className="space-y-2">
              <strong className="text-white block text-sm">4. Enterprise-Grade Security</strong>
              <p className="text-slate-400">
                Built to interface securely with enterprise ERP, TMS, and carrier EDI systems while preserving sensitive rate sheets and commercial bills of lading.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/app/overview"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all"
          >
            <span>Launch Live Control Tower</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
