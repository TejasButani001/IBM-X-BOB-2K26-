'use client';

import React, { useState } from 'react';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import {
  Settings,
  User,
  Building,
  Bell,
  Sliders,
  Thermometer,
  Bot,
  Shield,
  Save,
  CheckCircle2,
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme } = useControlTower();
  const [selectedTab, setSelectedTab] = useState('Risk Rules');
  const [saved, setSaved] = useState(false);

  // Form states
  const [criticalDelayThreshold, setCriticalDelayThreshold] = useState(24);
  const [coldChainSafeMin, setColdChainSafeMin] = useState(2.0);
  const [coldChainSafeMax, setColdChainSafeMax] = useState(8.0);
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(85);
  const [autoApproveReroute, setAutoApproveReroute] = useState(false);

  const tabs = [
    { label: 'Risk Rules', icon: Sliders },
    { label: 'Cold-Chain Thresholds', icon: Thermometer },
    { label: 'AI Preferences', icon: Bot },
    { label: 'Workspace & Profile', icon: User },
    { label: 'Notifications', icon: Bell },
    { label: 'Security & SSO', icon: Shield },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Control Tower Settings & Rules Configuration"
        subtitle="Manage automated disruption classification, cold-chain safety bands, and AI autonomous authorization thresholds."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Settings' },
        ]}
        actions={
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            {saved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saved ? 'Rules Saved' : 'Save Rules'}</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
        {/* Left Vertical Tabs */}
        <div className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedTab === tab.label;

            return (
              <button
                key={tab.label}
                onClick={() => setSelectedTab(tab.label)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left font-medium transition-all ${
                  isSelected
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Body (3 Cols) */}
        <div className="md:col-span-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          {/* TAB 1: Risk Rules */}
          {selectedTab === 'Risk Rules' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white">Disruption & Risk Trigger Rules</h3>
                <p className="text-slate-400 mt-0.5">
                  Configure automated escalation gates for shipment delays and demurrage penalties.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between mb-1.5 font-medium text-slate-300">
                    <span>Critical Delay Alert Threshold</span>
                    <span className="font-mono text-indigo-400 font-bold">{criticalDelayThreshold} Hours</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={72}
                    step={6}
                    value={criticalDelayThreshold}
                    onChange={(e) => setCriticalDelayThreshold(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Shipments exceeding this dwell threshold are automatically elevated to Critical priority.
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Auto-Flag Port Strikes</span>
                    <span className="text-slate-400 text-[11px]">
                      Automatically initiate alternative port bypass evaluation upon official union notices.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Cold-Chain Thresholds */}
          {selectedTab === 'Cold-Chain Thresholds' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white">Cold-Chain Thermal Safety Bands</h3>
                <p className="text-slate-400 mt-0.5">
                  Establish certified temperature bounds for pharmaceutical and perishable cargo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="block text-slate-300 font-medium">Minimum Safe Temperature (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={coldChainSafeMin}
                    onChange={(e) => setColdChainSafeMin(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-[10px] text-slate-500 block">Default standard for mRNA / vaccines: 2.0°C</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="block text-slate-300 font-medium">Maximum Safe Temperature (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={coldChainSafeMax}
                    onChange={(e) => setColdChainSafeMax(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-[10px] text-slate-500 block">Default standard for mRNA / vaccines: 8.0°C</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <strong className="text-amber-300">Arrhenius Degradation Kinetic Rule:</strong>
                <p>
                  Excursions beyond maximum temperature for &gt;45 cumulative minutes trigger automatic priority dispatch of secondary mobile reefer units and dry-ice recharge kits.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: AI Preferences */}
          {selectedTab === 'AI Preferences' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white">IBM Bob AI Decision Gates</h3>
                <p className="text-slate-400 mt-0.5">
                  Configure confidence floors for autonomous recommendations and copilot responses.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between mb-1.5 font-medium text-slate-300">
                    <span>Minimum AI Recommendation Confidence Floor</span>
                    <span className="font-mono text-emerald-400 font-bold">{aiConfidenceThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min={70}
                    max={98}
                    step={2}
                    value={aiConfidenceThreshold}
                    onChange={(e) => setAiConfidenceThreshold(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Recommendations with confidence below this threshold require dual senior dispatcher review.
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Theme Mode</span>
                    <span className="text-slate-400 text-[11px]">
                      Toggle Control Tower display interface.
                    </span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono"
                  >
                    Current: {theme.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Fallback for other tabs */}
          {['Workspace & Profile', 'Notifications', 'Security & SSO'].includes(selectedTab) && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">{selectedTab}</h3>
                <p className="text-slate-400 mt-0.5">Configuration active for current organization.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Organization:</span>
                  <span className="font-semibold text-white">Global Logistics Command</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Environment:</span>
                  <span className="font-mono text-emerald-400">Production (IBM Hackathon L2)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SSO Provider:</span>
                  <span className="font-mono text-indigo-300">IBM Security Verify / SAML 2.0</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
