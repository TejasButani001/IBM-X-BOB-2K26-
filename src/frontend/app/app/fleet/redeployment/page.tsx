'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../../context/ControlTowerContext';
import { PageHeader } from '../../../../components/ui/PageHeader';
import { Button } from '../../../../components/ui/Button';
import {
  Truck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MapPin,
  TrendingUp,
  AlertTriangle,
  X,
  Compass,
} from 'lucide-react';

export default function FleetRedeploymentPage() {
  const { fleet, redeployAsset, shipments } = useControlTower();
  const [selectedCorridor, setSelectedCorridor] = useState('Ahmedabad → Mundra Port → Mumbai Cold-Chain Corridor');
  const [selectedShipment, setSelectedShipment] = useState('S101');
  const [isRedeployed, setIsRedeployed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t04 = fleet.find((f) => f.id === 'T04') || fleet[0];

  const handleRedeployT04 = () => {
    redeployAsset('T04', selectedCorridor);
    setIsRedeployed(true);
    setToastMessage('✓ Truck T04 Redeployed! Dispatched from Ahmedabad to Mundra Quay (Utilisation: 0% → 82%).');
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-emerald-900 text-white border border-emerald-500 shadow-2xl flex items-center gap-3 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <PageHeader
        title="AI Fleet Redeployment Engine"
        subtitle="Match idle trucks, cryogenic reefers, and coastal barges to overloaded disruption corridors."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Fleet', href: '/app/fleet' },
          { label: 'Redeployment' },
        ]}
      />

      {/* Target Corridor & Shipment Selector Card */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1">
              Target Overloaded / Disrupted Corridor
            </label>
            <select
              value={selectedCorridor}
              onChange={(e) => setSelectedCorridor(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-medium text-xs focus:outline-none focus:border-indigo-500"
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
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1">
              Target Affected Shipment
            </label>
            <select
              value={selectedShipment}
              onChange={(e) => setSelectedShipment(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-medium text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="S101">Shipment S101: VAX-2045 mRNA Biologics ($3.4M Cargo Spoilage Risk)</option>
              <option value="S103">Shipment S103: Automotive Microcontrollers ($1.8M Line Stoppage Risk)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Primary Recommended Match: Truck T04 */}
      <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/50 dark:from-[#0B1024] dark:via-[#090E1A] dark:to-[#0C132B] border-2 border-indigo-500 shadow-md space-y-4 text-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-indigo-100 dark:border-indigo-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white font-bold font-mono text-sm flex items-center justify-center shrink-0 shadow-sm">
              T04
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Truck T04 (Scania R500 Multi-Temp Reefer)
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-mono text-[10px] font-bold">
                  94% CORRIDOR MATCH
                </span>
              </div>
              <div className="text-slate-500 dark:text-slate-400 mt-0.5 text-[11px]">
                Current Location: <strong className="text-slate-800 dark:text-slate-200">Ahmedabad Logistics Hub</strong> (320 km to Mundra Quay)
              </div>
            </div>
          </div>

          <Button
            variant={isRedeployed ? 'secondary' : 'primary'}
            size="md"
            icon={CheckCircle2}
            onClick={handleRedeployT04}
            disabled={isRedeployed}
          >
            {isRedeployed ? 'T04 Dispatched to Mundra' : 'Redeploy Truck T04'}
          </Button>
        </div>

        {/* 5 Matching Criteria */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs">
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-mono">1. Proximity</span>
            <div className="font-bold text-slate-900 dark:text-white font-mono text-sm">320 km</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">4.5h Drive Time</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-mono">2. Payload Capacity</span>
            <div className="font-bold text-slate-900 dark:text-white font-mono text-sm">18.0 Tons</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">100% Fit for S101</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-mono">3. Asset Type</span>
            <div className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">Multi-Temp Reefer</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">-20°C to +8°C Active</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-mono">4. Availability</span>
            <div className="font-bold text-amber-600 dark:text-amber-400 text-sm">Immediate (19.5h Idle)</div>
            <div className="text-[10px] text-slate-500 font-mono">Driver on Standby</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-mono">5. Route Express</span>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">NH-48 Expressway</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Fast-Tag Cleared</div>
          </div>
        </div>

        {/* Before / After Utilisation Impact Box */}
        <div className="p-3.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
            <span>Fleet Utilisation Impact Simulation</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">Corridor Asset Rebalance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5">
              <span className="text-slate-500 text-[10px] font-mono block uppercase">BEFORE REDEPLOYMENT:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400">0% Utilisation</span>
                <span className="text-slate-400 font-mono text-[11px]">(19.5 hours unproductive idle)</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-0.5">
              <span className="text-indigo-700 dark:text-indigo-300 text-[10px] font-mono block uppercase font-bold">AFTER REDEPLOYMENT:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">82% Projected Utilisation</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">(Active Revenue Corridor)</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendation Rationale */}
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
          <strong className="text-slate-900 dark:text-white">IBM Bob Recommendation Rationale:</strong> &ldquo;Recommended because Truck T04 is an 18T multi-temperature reefer staged in Ahmedabad, 320km from Mundra quay, with 0% current utilisation and cryogenic capability required for {selectedShipment}.&rdquo;
        </div>
      </div>
    </div>
  );
}
