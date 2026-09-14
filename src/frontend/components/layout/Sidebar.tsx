'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useControlTower } from '../../context/ControlTowerContext';
import {
  LayoutDashboard,
  AlertTriangle,
  Package,
  Compass,
  Truck,
  Thermometer,
  Bell,
  Bot,
  Sliders,
  CheckCircle2,
  BarChart3,
  FileText,
  PlugZap,
  Settings,
  ChevronLeft,
  ChevronRight,
  Layers,
  X,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { metrics, actionPlan, isMobileNavOpen, setIsMobileNavOpen } = useControlTower();

  const pendingActions = actionPlan.filter((a) => a.status === 'Pending Approval').length;

  const navItems = [
    { label: 'Overview', href: '/app/overview', icon: LayoutDashboard },
    {
      label: 'Disruptions',
      href: '/app/disruptions',
      icon: AlertTriangle,
      badge: metrics.activeDisruptions.toString(),
      badgeColor:
        'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
    },
    {
      label: 'Shipments',
      href: '/app/shipments',
      icon: Package,
      badge: metrics.atRiskShipments.toString(),
      badgeColor:
        'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/60',
    },
    { label: 'AI Routing', href: '/app/routing', icon: Compass },
    {
      label: 'Fleet & Assets',
      href: '/app/fleet',
      icon: Truck,
      badge: `${metrics.idleFleetAssets} idle`,
      badgeColor:
        'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    },
    {
      label: 'Cold-Chain',
      href: '/app/cold-chain',
      icon: Thermometer,
      badge: metrics.coldChainAlerts > 0 ? `${metrics.coldChainAlerts} alert` : undefined,
      badgeColor:
        'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
    },
    { label: 'Alerts', href: '/app/alerts', icon: Bell },
    {
      label: 'AI Copilot',
      href: '/app/copilot',
      icon: Bot,
      highlight: true,
    },
    {
      label: 'Action Center',
      href: '/app/action-center',
      icon: CheckCircle2,
      badge: pendingActions > 0 ? `${pendingActions} ready` : undefined,
      badgeColor:
        'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    },
    { label: 'Simulations', href: '/app/simulations', icon: Sliders },
    { label: 'Analytics', href: '/app/analytics', icon: BarChart3 },
    { label: 'Reports', href: '/app/reports', icon: FileText },
  ];

  const bottomItems = [
    { label: 'Integrations', href: '/app/integrations', icon: PlugZap },
    { label: 'Settings', href: '/app/settings', icon: Settings },
  ];

  const renderNavLinks = (isMobile = false) => (
    <div className="space-y-0.5">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || (item.href !== '/app/overview' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => isMobile && setIsMobileNavOpen(false)}
            className={`group relative flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors select-none ${
              isActive
                ? 'bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold border-l-2 border-indigo-600 dark:border-indigo-500'
                : 'border-l-2 border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 font-medium'
            }`}
            title={collapsed && !isMobile ? item.label : undefined}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                }`}
              />
              {(!collapsed || isMobile) && (
                <span className="truncate">{item.label}</span>
              )}
            </div>

            {(!collapsed || isMobile) && item.badge && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded border uppercase shrink-0 ${item.badgeColor}`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex relative flex-col border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0A0F1B] transition-all duration-200 z-30 shrink-0 select-none ${
          collapsed ? 'w-15' : 'w-56'
        }`}
      >
        {/* Brand Header */}
        <div className="h-14 flex items-center justify-between px-3 border-b border-slate-200 dark:border-slate-800/80">
          <Link href="/app/overview" className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  FLUXCHAIN <span className="text-[9px] px-1 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono">AI</span>
                </span>
                <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider truncate">
                  Control Tower
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
          {!collapsed && (
            <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Operations
            </div>
          )}
          {renderNavLinks(false)}
        </div>

        {/* Bottom Items */}
        <div className="p-2 border-t border-slate-200 dark:border-slate-800/80 space-y-0.5">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}

          {/* User Desk Card */}
          <div className="mt-1 pt-1.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-2 px-1">
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-200 shrink-0">
              OP
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                  Ops Desk 01
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Online
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileNavOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Menu */}
          <div className="relative w-64 max-w-[85vw] bg-white dark:bg-[#0A0F1B] h-full flex flex-col shadow-2xl border-r border-slate-200 dark:border-slate-800 z-10 animate-in slide-in-from-left duration-200">
            {/* Header with close */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
              <Link
                href="/app/overview"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs tracking-tight text-slate-900 dark:text-white">
                  FLUXCHAIN AI
                </span>
              </Link>

              <button
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
              <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Operations
              </div>
              {renderNavLinks(true)}
            </div>

            {/* Mobile Bottom Links */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
              {bottomItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

