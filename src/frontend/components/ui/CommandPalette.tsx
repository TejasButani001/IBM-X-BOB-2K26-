'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Zap,
  CornerDownLeft,
  Bell,
  PlugZap,
  Settings,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Layers,
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  type: 'Action' | 'Disruption' | 'Shipment' | 'Fleet' | 'Cold-Chain' | 'Alert' | 'Report' | 'Page';
  category: string;
  metadata: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ElementType;
  iconColor: string;
  path: string;
  actionText: string;
}

export const CommandPalette: React.FC = () => {
  const router = useRouter();
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    shipments,
    disruptions,
    fleet,
    coldChain,
    alerts,
    triggerMumbaiStrike,
    setStrikeDurationHours,
  } = useControlTower();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Reset state when opening/closing
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  // Build full searchable command dataset
  const buildCommands = (): CommandItem[] => {
    const items: CommandItem[] = [];

    // 1. Quick Actions
    const quickActions: CommandItem[] = [
      {
        id: 'act-reroute',
        title: 'Find Alternative Route for S101 (Mumbai Port Avoidance)',
        type: 'Action',
        category: 'Quick Actions',
        metadata: 'AI Recommended R-ALT-01 • China → Mundra → Mumbai',
        badge: 'AI Recommended',
        badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
        icon: Zap,
        iconColor: 'text-cyan-500',
        path: '/app/routing',
        actionText: 'Execute Reroute',
      },
      {
        id: 'act-redeploy',
        title: 'Redeploy Truck T04 to Mumbai Freight Hub',
        type: 'Action',
        category: 'Quick Actions',
        metadata: '94% Match Score • 18T Reefer • Available Immediately',
        badge: '94% Match',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
        icon: Truck,
        iconColor: 'text-emerald-500',
        path: '/app/fleet/redeployment',
        actionText: 'Dispatch Fleet',
      },
      {
        id: 'act-sim-48h',
        title: 'Run 48-Hour Disruption Escalation Scenario',
        type: 'Action',
        category: 'Quick Actions',
        metadata: 'Simulate strike extension to 48 hours • Impact +14 Shipments',
        badge: 'What-If Simulation',
        badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
        icon: Sliders,
        iconColor: 'text-indigo-500',
        path: '/app/simulations',
        actionText: 'Simulate Scenario',
      },
      {
        id: 'act-inspect-vax',
        title: 'Inspect Critical Temperature Excursion VAX-2045',
        type: 'Action',
        category: 'Quick Actions',
        metadata: '47 min breach • Max 10.0°C (Safe Range 2–8°C)',
        badge: 'Critical Excursion',
        badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/30',
        icon: Thermometer,
        iconColor: 'text-rose-500',
        path: '/app/cold-chain/VAX-2045',
        actionText: 'Inspect Sensor',
      },
      {
        id: 'act-copilot-ask',
        title: 'Ask AI Copilot about Operational Risk Exposure',
        type: 'Action',
        category: 'Quick Actions',
        metadata: 'Bob AI Assistant • 18 At-Risk Shipments Analysis',
        badge: 'Bob AI v3.0',
        badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
        icon: Bot,
        iconColor: 'text-cyan-400',
        path: '/app/copilot',
        actionText: 'Open Copilot',
      },
    ];
    items.push(...quickActions);

    // 2. Disruptions
    disruptions.forEach((d) => {
      items.push({
        id: `dis-${d.id}`,
        title: d.name,
        type: 'Disruption',
        category: 'Disruptions',
        metadata: `${d.location} • ${d.affectedShipmentIds.length} Shipments Affected`,
        badge: d.severity.toUpperCase(),
        badgeColor:
          d.severity === 'critical' || d.severity === 'major'
            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/30'
            : 'bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-500/30',
        icon: AlertTriangle,
        iconColor: 'text-rose-500',
        path: `/app/disruptions/${d.id}`,
        actionText: 'View Disruption',
      });
    });

    // 3. Shipments
    shipments.forEach((s) => {
      items.push({
        id: `ship-${s.id}`,
        title: `${s.id} — ${s.cargo}`,
        type: 'Shipment',
        category: 'Shipments',
        metadata: `${s.origin} → ${s.destination} | ${s.carrier} | ETA: ${s.eta}`,
        badge: `Risk ${s.riskScore}/100`,
        badgeColor:
          s.riskScore >= 70
            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/30'
            : s.riskScore >= 40
            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30'
            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
        icon: Package,
        iconColor: 'text-blue-500',
        path: `/app/shipments/${s.id}`,
        actionText: 'Track Shipment',
      });
    });

    // 4. Fleet Assets
    fleet.forEach((f) => {
      items.push({
        id: `fleet-${f.id}`,
        title: `${f.name} (${f.id})`,
        type: 'Fleet',
        category: 'Fleet Assets',
        metadata: `${f.location} • ${f.capacityTons} Tons ${f.hasReefer ? 'Reefer' : 'Dry'} • Utilisation: ${f.utilisation}%`,
        badge: f.status,
        badgeColor:
          f.status === 'Idle'
            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30'
            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
        icon: Truck,
        iconColor: 'text-emerald-500',
        path: '/app/fleet',
        actionText: 'View Asset',
      });
    });

    // 5. Cold Chain Monitored Units
    coldChain.forEach((c) => {
      items.push({
        id: `cold-${c.id}`,
        title: `${c.id} — ${c.cargo}`,
        type: 'Cold-Chain',
        category: 'Cold Chain',
        metadata: `Current: ${c.currentTemperature}°C | Safe Limit: ${c.requiredRange} | Location: ${c.location}`,
        badge: c.severity.toUpperCase(),
        badgeColor:
          c.severity === 'critical' || c.severity === 'major'
            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/30'
            : 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30',
        icon: Thermometer,
        iconColor: 'text-orange-500',
        path: `/app/cold-chain/${c.id}`,
        actionText: 'Inspect Telemetry',
      });
    });

    // 6. Alerts
    alerts.forEach((a) => {
      items.push({
        id: `alt-${a.id}`,
        title: a.title,
        type: 'Alert',
        category: 'Operational Alerts',
        metadata: `${a.description} • ${a.timestamp}`,
        badge: a.status,
        badgeColor:
          a.status === 'Unread'
            ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/30'
            : 'bg-slate-500/10 text-slate-500 border-slate-500/20',
        icon: Bell,
        iconColor: 'text-indigo-500',
        path: '/app/alerts',
        actionText: 'Open Alert',
      });
    });

    // 7. System Pages
    const pages: CommandItem[] = [
      { id: 'page-overview', title: 'Control Tower Overview', type: 'Page', category: 'Navigation Pages', metadata: 'Real-time network operational control dashboard', icon: Activity, iconColor: 'text-indigo-500', path: '/app/overview', actionText: 'Go to Page' },
      { id: 'page-disruptions', title: 'Disruption Intelligence Hub', type: 'Page', category: 'Navigation Pages', metadata: 'Active port strikes, weather delays & geopolitical risks', icon: AlertTriangle, iconColor: 'text-rose-500', path: '/app/disruptions', actionText: 'Go to Page' },
      { id: 'page-shipments', title: 'Shipment Tracking & Risk Table', type: 'Page', category: 'Navigation Pages', metadata: 'Real-time cargo tracking, ETA predictions & delay scores', icon: Package, iconColor: 'text-blue-500', path: '/app/shipments', actionText: 'Go to Page' },
      { id: 'page-routing', title: 'AI Route Optimization Comparison', type: 'Page', category: 'Navigation Pages', metadata: 'In-page multi-modal route risk comparison (R-ALT-01)', icon: Compass, iconColor: 'text-cyan-500', path: '/app/routing', actionText: 'Go to Page' },
      { id: 'page-fleet', title: 'Fleet Utilisation Optimizer', type: 'Page', category: 'Navigation Pages', metadata: 'Vehicle capacity overview, idle asset matrix & regional balance', icon: Truck, iconColor: 'text-emerald-500', path: '/app/fleet', actionText: 'Go to Page' },
      { id: 'page-fleet-redeploy', title: 'Fleet Asset Redeployment Engine', type: 'Page', category: 'Navigation Pages', metadata: 'Matched vehicle redeployment dispatch for disrupted routes', icon: Truck, iconColor: 'text-amber-500', path: '/app/fleet/redeployment', actionText: 'Go to Page' },
      { id: 'page-cold-chain', title: 'Cold-Chain Intelligence', type: 'Page', category: 'Navigation Pages', metadata: 'Thermocouple time-series telemetry & thermal excursions', icon: Thermometer, iconColor: 'text-orange-500', path: '/app/cold-chain', actionText: 'Go to Page' },
      { id: 'page-copilot', title: 'AI Copilot Assistant', type: 'Page', category: 'Navigation Pages', metadata: 'Bob AI 3-pane supply chain conversational assistant', icon: Bot, iconColor: 'text-cyan-400', path: '/app/copilot', actionText: 'Go to Page' },
      { id: 'page-action-center', title: 'Action Center Approvals', type: 'Page', category: 'Navigation Pages', metadata: 'Prioritized operational intervention approval queue', icon: CheckCircle, iconColor: 'text-emerald-500', path: '/app/action-center', actionText: 'Go to Page' },
      { id: 'page-simulations', title: 'Simulation Sandbox Center', type: 'Page', category: 'Navigation Pages', metadata: 'What-If scenario modeling & disruption stress testing', icon: Sliders, iconColor: 'text-purple-500', path: '/app/simulations', actionText: 'Go to Page' },
      { id: 'page-reports', title: 'Executive Reports & Briefings', type: 'Page', category: 'Navigation Pages', metadata: 'Automated executive summaries, compliance logs & audits', icon: FileText, iconColor: 'text-slate-400', path: '/app/reports', actionText: 'Go to Page' },
      { id: 'page-integrations', title: 'Integrations & ERP Connectors', type: 'Page', category: 'Navigation Pages', metadata: 'SAP, Oracle, IoT sensors & carrier API integrations', icon: PlugZap, iconColor: 'text-yellow-500', path: '/app/integrations', actionText: 'Go to Page' },
      { id: 'page-settings', title: 'Control Tower Settings', type: 'Page', category: 'Navigation Pages', metadata: 'User profile, notification rules & AI thresholds', icon: Settings, iconColor: 'text-slate-400', path: '/app/settings', actionText: 'Go to Page' },
    ];
    items.push(...pages);

    return items;
  };

  const allCommands = buildCommands();

  // Filter commands by search query
  const filteredCommands = allCommands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.type.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      cmd.metadata.toLowerCase().includes(q)
    );
  });

  // Group filtered results by category
  const groupedResults = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  // Flattened array of visible filtered items for keyboard index mapping
  const flatResults = Object.values(groupedResults).flat();

  // Reset index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < flatResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatResults[selectedIndex]) {
        executeCommand(flatResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setCommandPaletteOpen(false);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const executeCommand = (cmd: CommandItem) => {
    setCommandPaletteOpen(false);
    if (cmd.id === 'act-sim-48h') {
      setStrikeDurationHours(48);
      triggerMumbaiStrike();
    }
    router.push(cmd.path);
  };

  if (!isCommandPaletteOpen) return null;

  let currentIndexTracker = 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150 select-none"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh] animate-in zoom-in-95 duration-150 ring-1 ring-slate-900/5"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <Search className="w-4 h-4 text-indigo-600 dark:text-cyan-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search (e.g. S101, Mumbai, T04, VAX-2045, Fleet, Reports)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="mr-2 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-[10px] font-mono shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto flex-1 p-2 space-y-3 text-xs">
          {flatResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <Layers className="w-8 h-8 mx-auto mb-2 text-slate-400 opacity-60" />
              <p className="text-xs font-semibold">No operational matches found for "{query}"</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Try searching for <span className="font-mono text-cyan-400">S101</span>, <span className="font-mono text-cyan-400">Mumbai</span>, <span className="font-mono text-cyan-400">Truck T04</span>, or <span className="font-mono text-cyan-400">Cold Chain</span>
              </p>
            </div>
          ) : (
            Object.entries(groupedResults).map(([category, items]) => (
              <div key={category} className="space-y-1">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-[9px] font-mono text-slate-400">{items.length}</span>
                </div>

                <div className="space-y-0.5">
                  {items.map((item) => {
                    const itemIndex = currentIndexTracker++;
                    const isSelected = itemIndex === selectedIndex;
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.id}
                        data-index={itemIndex}
                        onClick={() => executeCommand(item)}
                        onMouseEnter={() => setSelectedIndex(itemIndex)}
                        className={`relative flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-100 cursor-pointer select-none ${
                          isSelected
                            ? 'bg-indigo-50/90 dark:bg-slate-800/90 text-slate-900 dark:text-white border-l-2 border-indigo-600 dark:border-cyan-400 shadow-2xs pl-2.5'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/40 border-l-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 ${item.iconColor}`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-xs tracking-tight truncate flex items-center gap-2">
                              <span>{item.title}</span>
                              {item.badge && (
                                <span
                                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-semibold shrink-0 ${item.badgeColor}`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {item.metadata}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded transition-opacity ${
                              isSelected
                                ? 'bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold opacity-100'
                                : 'opacity-0 text-slate-400'
                            }`}
                          >
                            {item.actionText} ↵
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#070A12] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono flex items-center gap-0.5">
                <ArrowUp className="w-2.5 h-2.5" />
                <ArrowDown className="w-2.5 h-2.5" />
              </kbd>
              <span>navigate</span>
            </div>

            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono flex items-center gap-1">
                <CornerDownLeft className="w-2.5 h-2.5" />
                Select
              </kbd>
            </div>

            <div className="hidden sm:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono">
                ESC
              </kbd>
              <span>dismiss</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="text-slate-600 dark:text-slate-300 font-semibold">Bob AI Instant Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};
