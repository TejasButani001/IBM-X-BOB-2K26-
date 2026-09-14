'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../../context/ControlTowerContext';
import { PageHeader } from '../../../../components/ui/PageHeader';
import {
  Truck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MapPin,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export default function FleetRedeploymentPage() {
  const { fleet, redeployAsset, shipments } = useControlTower();
  const [selectedCorridor, setSelectedCorridor] = useState('Ahmedabad → Mundra Port → Mumbai Cold-Chain Corridor');
  const [isRedeployed, setIsRedeployed] = useState(false);

  const t04 = fleet.find((f) => f.id === 'T04') || fleet[0];

  const handleRedeployT04 = () => {
    redeployAsset('T04', selectedCorridor);
    setIsRedeployed(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Fleet Redeployment Engine"
        subtitle="Match idle trucks, cryogenic reefers, and coastal barges to overloaded disruption corridors."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Fleet', href: '/app/fleet' },
          { label: 'Redeployment' },
        ]}
      />

      {/* Corridor Selector Card */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs">
        <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px]">
          Target Overloaded / Disrupted Corridor
        </label>
        <select
          value={selectedCorridor}
          onChange={(e) => setSelectedCorridor(e.target.value)}
          className="w-full md:max-w-xl px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-indigo-500"
        >
          <option value="Ahmedabad → Mundra Port → Mumbai Cold-Chain Corridor">
            Ahmedabad → Mundra Port → Mumbai Bypass (S101 Cold-Chain Urgent)
          </option>
          <option value="Vadodara → Hazira Port → Pune Automotive Corridor">
            Vadodara → Hazira Port → Pune Automotive Corridor (S103 Microcontrollers)
          </option>
          <option value="Surat → Mumbai Container Shuttle">
            Surat → Mumbai Road Container Shuttle
          </option>
        </select>
        <p className="text-slate-400">
          The spatial engine calculates road network distance, reefer temperature compatibility, and driver duty hours to surface optimal candidate assets.
        </p>
      </div>

      {/* Primary Recommended Match: Truck T04 */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-navy-900 to-indigo-950/40 border-2 border-indigo-500/80 shadow-2xl space-y-5 text-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-indigo-900/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center font-bold font-mono text-sm shrink-0">
              T04
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Truck T04 (Scania R500 Multi-Temp Reefer)</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono text-[10px] font-bold">
                  94% CORRIDOR MATCH
                </span>
              </div>
              <div className="text-slate-400 mt-0.5">
                Current Location: <strong className="text-slate-200">Ahmedabad Logistics Hub</strong> (320 km to Mundra)
              </div>
            </div>
          </div>

          <button
            onClick={handleRedeployT04}
            disabled={isRedeployed}
            className={`px-5 py-2.5 rounded-lg font-semibold text-xs transition-all shadow-md flex items-center gap-2 ${
              isRedeployed
                ? 'bg-emerald-800 text-emerald-100 cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isRedeployed ? 'T04 Dispatched to Mundra' : 'Authorize Redeployment'}</span>
          </button>
        </div>

        {/* 5 Matching Criteria */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase">1. Location Proximity</span>
            <div className="font-bold text-white text-sm">320 km</div>
            <div className="text-[10px] text-emerald-400 font-mono">4.5h Drive Time</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase">2. Payload Capacity</span>
            <div className="font-bold text-white text-sm">18.0 Tons</div>
            <div className="text-[10px] text-emerald-400 font-mono">100% Fit for S101 (14.8T)</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase">3. Asset Type</span>
            <div className="font-bold text-indigo-300 text-sm">Multi-Temp Reefer</div>
            <div className="text-[10px] text-emerald-400 font-mono">-20°C to +8°C Active</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase">4. Availability</span>
            <div className="font-bold text-amber-400 text-sm">Immediate (Idle 19.5h)</div>
            <div className="text-[10px] text-slate-400 font-mono">Driver Rajesh on standby</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase">5. Route Compatibility</span>
            <div className="font-bold text-emerald-400 text-sm">NH-48 Expressway</div>
            <div className="text-[10px] text-emerald-400 font-mono">Green Corridor Fast-Tag</div>
          </div>
        </div>

        {/* Before / After Utilisation Impact Box */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-white">
            <span>Fleet Utilisation Impact Simulation</span>
            <span className="text-indigo-400 font-mono">Corridor Asset Rebalance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] block">BEFORE REDEPLOYMENT:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-amber-400">0% Utilisation</span>
                <span className="text-slate-500 font-mono text-xs">(19.5 hours unproductive idle)</span>
              </div>
              <p className="text-slate-400 text-[11px]">Cost drain: $320/day driver standby and insurance.</p>
            </div>

            <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/50 space-y-1">
              <span className="text-indigo-300 text-[11px] block">AFTER REDEPLOYMENT:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-emerald-400">92% Utilisation</span>
                <span className="text-emerald-400 font-mono text-xs">(Active Revenue Corridor)</span>
              </div>
              <p className="text-slate-300 text-[11px]">Protects $3.4M clinical vaccine cargo from JNPT spoilage.</p>
            </div>
          </div>
        </div>

        {/* AI Recommendation Quote */}
        <div className="p-3.5 rounded-lg bg-slate-950/50 border border-slate-800 text-slate-300 leading-relaxed text-xs">
          <strong className="text-white">IBM Bob Recommendation:</strong> &ldquo;Redeploy Truck T04 to the Ahmedabad → Mundra corridor immediately. Staging T04 at Mundra Terminal 3 berth enables instantaneous roll-on cold-chain transfer upon container discharge, eliminating all port dwell risk.&rdquo;
        </div>
      </div>
    </div>
  );
}
