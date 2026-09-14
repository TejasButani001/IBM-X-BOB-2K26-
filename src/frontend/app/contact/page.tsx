'use client';

import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/landing/MarketingNav';
import { MarketingFooter } from '@/components/landing/MarketingFooter';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      <MarketingNav />

      <main className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Enterprise Inquiries
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Talk to an Operations Solutions Architect
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            Schedule a dedicated pilot briefing or discuss integrating your proprietary TMS and IoT sensor streams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white">Global Command Contacts</h3>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>solutions@fluxchain-controltower.ai</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+1 (800) 555-FLUX (24/7 Ops Desk)</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>IBM Bob AI Hackathon HQ • Innovation Hub</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Instant Access Available
              </span>
              <p className="text-slate-400">
                You do not need to wait for sales approval to evaluate the platform. The complete hackathon demo is immediately accessible online.
              </p>
              <Link
                href="/app/overview"
                className="text-indigo-400 font-semibold hover:text-indigo-300 block pt-1"
              >
                Launch Live Control Tower Now →
              </Link>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for reaching out. An enterprise solutions engineer will contact you shortly.');
            }}
            className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs"
          >
            <h3 className="text-base font-bold text-white mb-2">Request Enterprise Pilot</h3>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Full Name</label>
              <input
                type="text"
                required
                defaultValue="Tejas Patel"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Work Email</label>
              <input
                type="email"
                required
                defaultValue="ops-lead@enterprisecargo.com"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Organization & Logistics Scope</label>
              <input
                type="text"
                defaultValue="Global Container Shipping & Reefer Cold-Chain"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Operational Requirements</label>
              <textarea
                rows={3}
                defaultValue="Evaluating multi-tier disruption mitigation and idle fleet asset redeployment for Indian Subcontinent & Middle East trade lanes."
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Enterprise Request</span>
            </button>
          </form>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
