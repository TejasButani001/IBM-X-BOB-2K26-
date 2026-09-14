'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useControlTower } from '../../context/ControlTowerContext';
import {
  Search,
  X,
  AlertTriangle,
  Package,
  Truck,
  Thermometer,
  Compass,
  FileText,
  Activity,
  Bot,
  Sliders,
  CheckCircle,
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const router = useRouter();
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    shipments,
    disruptions,
    fleet,
    coldChain,
  } = useControlTower();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredShipments = shipments
    .filter(
      (s) =>
        s.id.toLowerCase().includes(query.toLowerCase()) ||
        s.cargo.toLowerCase().includes(query.toLowerCase()) ||
        s.origin.toLowerCase().includes(query.toLowerCase()) ||
        s.destination.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 4);

  const filteredDisruptions = disruptions
    .filter(
      (d) =>
        d.id.toLowerCase().includes(query.toLowerCase()) ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.location.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 3);

  const filteredFleet = fleet
    .filter(
      (f) =>
        f.id.toLowerCase().includes(query.toLowerCase()) ||
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.location.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 3);

  const filteredColdChain = coldChain
    .filter(
      (c) =>
        c.id.toLowerCase().includes(query.toLowerCase()) ||
        c.cargo.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 3);

  const staticNavigation = [
    { label: 'Overview Control Tower', path: '/app/overview', icon: Activity },
    { label: 'Disruption Center', path: '/app/disruptions', icon: AlertTriangle },
    { label: 'Shipment Tracking Table', path: '/app/shipments', icon: Package },
    { label: 'AI Routing Comparison', path: '/app/routing', icon: Compass },
    { label: 'Fleet Utilisation & Assets', path: '/app/fleet', icon: Truck },
    { label: 'Fleet Redeployment Engine', path: '/app/fleet/redeployment', icon: Truck },
    { label: 'Cold-Chain Monitoring', path: '/app/cold-chain', icon: Thermometer },
    { label: 'AI Copilot Operations Chat', path: '/app/copilot', icon: Bot },
    { label: 'Action Center Approvals', path: '/app/action-center', icon: CheckCircle },
    { label: 'Simulation Sandbox Center', path: '/app/simulations', icon: Sliders },
    { label: 'Reports & Briefings', path: '/app/reports', icon: FileText },
  ].filter((p) => p.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => {
    setCommandPaletteOpen(false);
    router.push(path);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4 bg-slate-950/60 dark:bg-black/70 backdrop-blur-xs animate-in fade-in duration-150 select-none"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search shipments (S101), disruptions (Mumbai), fleet (T04), cold-chain (VAX-2045), or pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-3.5 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-2 sm:p-3 space-y-3 text-xs divide-y divide-slate-100 dark:divide-slate-800/60">
          {/* Disruptions */}
          {filteredDisruptions.length > 0 && (
            <div className="pt-1">
              <div className="px-2.5 py-1 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
                Disruptions
              </div>
              {filteredDisruptions.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleSelect(`/app/disruptions/${d.id}`)}
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                    <div className="truncate">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{d.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{d.location}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 uppercase shrink-0">
                    {d.severity}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Shipments */}
          {filteredShipments.length > 0 && (
            <div className="pt-1">
              <div className="px-2.5 py-1 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
                Shipments
              </div>
              {filteredShipments.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelect(`/app/shipments/${s.id}`)}
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Package className="w-4 h-4 text-blue-500 shrink-0" />
                    <div className="truncate">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {s.id} — {s.cargo}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {s.origin} → {s.destination}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                    Risk {s.riskScore}/100
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Fleet Assets */}
          {filteredFleet.length > 0 && (
            <div className="pt-1">
              <div className="px-2.5 py-1 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
                Fleet Assets
              </div>
              {filteredFleet.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleSelect('/app/fleet')}
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Truck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div className="truncate">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{f.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {f.location} • {f.capacityTons}T {f.hasReefer ? 'Reefer' : 'Dry'}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ${
                      f.status === 'Idle'
                        ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                        : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                    }`}
                  >
                    {f.status} ({f.utilisation}%)
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Cold-Chain */}
          {filteredColdChain.length > 0 && (
            <div className="pt-1">
              <div className="px-2.5 py-1 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
                Cold-Chain Monitored Units
              </div>
              {filteredColdChain.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(`/app/cold-chain/${c.id}`)}
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Thermometer className="w-4 h-4 text-orange-500 shrink-0" />
                    <div className="truncate">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {c.id} ({c.cargo})
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Temp: {c.currentTemperature}°C • Safe: {c.requiredRange}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 shrink-0">
                    {c.severity}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Pages */}
          {staticNavigation.length > 0 && (
            <div className="pt-1">
              <div className="px-2.5 py-1 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
                Pages & Navigation
              </div>
              {staticNavigation.map((item, idx) => {
                const NavIcon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 text-left transition-colors"
                  >
                    <NavIcon className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-[#070A12] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px] font-mono">
              ESC
            </kbd>
            <span>to close</span>
          </div>
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">Bob AI Control Tower</span>
        </div>
      </div>
    </div>
  );
};
