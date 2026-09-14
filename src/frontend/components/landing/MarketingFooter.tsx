import React from 'react';
import Link from 'next/link';
import { Layers, Cpu, ShieldCheck } from 'lucide-react';

export const MarketingFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#060911] py-12 text-slate-500 dark:text-slate-400 text-xs transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Col 1: Brand & Tagline */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                FLUXCHAIN AI
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
              &ldquo;Turn disruption into a decision.&rdquo; Autonomous supply chain control tower unifying multimodal disruption mitigation, idle fleet redeployment, and cold-chain thermal integrity.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] text-indigo-600 dark:text-indigo-400 font-mono">
              <Cpu className="w-3.5 h-3.5" />
              <span>IBM Bob AI Hackathon 2026 — L2 Logistics & Ports Track</span>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Platform
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/platform" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Control Tower Overview
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Disruption Intelligence
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Multimodal AI Routing
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Fleet Redeployment
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Cold-Chain Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Solutions
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/solutions" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Ports & Terminal Operators
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Pharma Cold-Chain Logistics
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Automotive JIT Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Global Freight Forwarders
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Enterprise Control Towers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Live Modules */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Control Tower
            </h4>
            <ul className="space-y-1.5 font-mono text-[11px]">
              <li>
                <Link href="/app/overview" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  /app/overview
                </Link>
              </li>
              <li>
                <Link href="/app/disruptions" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  /app/disruptions
                </Link>
              </li>
              <li>
                <Link href="/app/shipments" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  /app/shipments
                </Link>
              </li>
              <li>
                <Link href="/app/copilot" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  /app/copilot
                </Link>
              </li>
              <li>
                <Link href="/app/action-center" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  /app/action-center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 FluxChain AI. Developed for IBM Bob AI Hackathon.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Enterprise SOC2 & GxP Ready</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
