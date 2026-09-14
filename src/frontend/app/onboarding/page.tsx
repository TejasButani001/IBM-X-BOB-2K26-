'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Building,
  Anchor,
  Truck,
  Thermometer,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('Global Logistics Alliance');
  const [region, setRegion] = useState('South Asia & Middle East (Mumbai-Dubai-Singapore)');
  const [fleetSize, setFleetSize] = useState('50 - 250 assets');
  const [selectedModes, setSelectedModes] = useState<string[]>([
    'Ocean Maritime',
    'Refrigerated Cold-Chain',
    'Highway Prime Movers',
  ]);
  const [priorities, setPriorities] = useState<string[]>([
    'Minimize Port Strike Dwell Time',
    'Zero Cold-Chain Thermal Excursions',
    'Max Idle Fleet Redeployment',
  ]);

  const toggleMode = (mode: string) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const togglePriority = (pri: string) => {
    setPriorities((prev) =>
      prev.includes(pri) ? prev.filter((p) => p !== pri) : [...prev, pri]
    );
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      router.push('/app/overview');
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold">
          STEP {step} OF 4 • ONBOARDING WIZARD
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Configure Your Control Tower
        </h1>
        <p className="text-xs text-slate-400">
          Tailor IBM Bob AI decision rules to your specific corridors and cargo profiles
        </p>

        {/* Step progress bar */}
        <div className="flex gap-2 pt-2 max-w-xs mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i <= step ? 'bg-indigo-500' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 py-8 px-6 sm:px-8 shadow-2xl rounded-2xl space-y-6 text-xs">
          {/* STEP 1: Company Profile */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-400" />
                <span>1. Company & Regional Logistics Scope</span>
              </h2>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Company / Enterprise Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Primary Trade Corridors</label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Active Fleet Scale</label>
                <select
                  value={fleetSize}
                  onChange={(e) => setFleetSize(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option>10 - 50 assets</option>
                  <option>50 - 250 assets</option>
                  <option>250 - 1,000 assets</option>
                  <option>1,000+ global assets</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Operations Type */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Anchor className="w-4 h-4 text-indigo-400" />
                <span>2. Operational Modes & Cargo Specialties</span>
              </h2>
              <p className="text-slate-400 text-[11px]">Select all active freight modes to monitor:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Ocean Maritime',
                  'Refrigerated Cold-Chain',
                  'Highway Prime Movers',
                  'Inland Feeder Barges',
                  'Intermodal Rail Shuttles',
                  'Air Cargo Express',
                ].map((mode) => {
                  const isChecked = selectedModes.includes(mode);
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => toggleMode(mode)}
                      className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-indigo-950/60 border-indigo-600 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-medium">{mode}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Critical Priorities */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>3. Operational Optimization Priorities</span>
              </h2>
              <p className="text-slate-400 text-[11px]">Select key triggers for AI decision scoring:</p>
              <div className="space-y-2">
                {[
                  'Minimize Port Strike Dwell Time',
                  'Zero Cold-Chain Thermal Excursions',
                  'Max Idle Fleet Redeployment',
                  'Lowest Freight Demurrage Cost',
                  'Strict Customer SLA Adherence',
                ].map((pri) => {
                  const isChecked = priorities.includes(pri);
                  return (
                    <button
                      key={pri}
                      type="button"
                      onClick={() => togglePriority(pri)}
                      className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-indigo-950/60 border-indigo-600 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-medium">{pri}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Launch */}
          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-500/20">
                <Sparkles className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-white">Your Control Tower is Ready</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                IBM Bob AI has ingested your configuration for <strong className="text-white">{companyName}</strong>. 10 global disruptions, 50 shipments, and 20 fleet assets have been synchronized into the live decision engine.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono text-[11px] text-slate-400 space-y-1">
                <div>Corridor: <span className="text-indigo-300">{region}</span></div>
                <div>Monitored Modes: <span className="text-emerald-300">{selectedModes.join(', ')}</span></div>
                <div>Status: <span className="text-emerald-400">Decision Engine Armed & Ready</span></div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {step > 1 && step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20"
            >
              <span>{step === 4 ? 'Launch Control Tower' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
