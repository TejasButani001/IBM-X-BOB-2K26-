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
  User,
  Sparkles,
  HelpCircle,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { metrics, actionPlan, alerts, isMobileNavOpen, setIsMobileNavOpen } = useControlTower();

  const pendingActions = actionPlan.filter((a) => a.status === 'Pending Approval').length;
  const unreadAlerts = alerts.filter((a) => a.status === 'Unread').length;

  const navGroups: NavGroup[] = [
    {
      title: 'CONTROL TOWER',
      items: [
        { label: 'Overview', href: '/app/overview', icon: LayoutDashboard },
        {
          label: 'Disruptions',
          href: '/app/disruptions',
          icon: AlertTriangle,
          badge: metrics.activeDisruptions > 0 ? metrics.activeDisruptions.toString() : undefined,
          badgeColor:
            'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        },
        {
          label: 'Shipments',
          href: '/app/shipments',
          icon: Package,
          badge: metrics.atRiskShipments > 0 ? metrics.atRiskShipments.toString() : undefined,
          badgeColor:
            'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
        },
        { label: 'Routing', href: '/app/routing', icon: Compass },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        {
          label: 'Fleet',
          href: '/app/fleet',
          icon: Truck,
          badge: metrics.idleFleetAssets > 0 ? `${metrics.idleFleetAssets} idle` : undefined,
          badgeColor:
            'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        },
        {
          label: 'Cold Chain',
          href: '/app/cold-chain',
          icon: Thermometer,
          badge: metrics.coldChainAlerts > 0 ? `${metrics.coldChainAlerts} alert` : undefined,
          badgeColor:
            'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        },
        {
          label: 'Alerts',
          href: '/app/alerts',
          icon: Bell,
          badge: unreadAlerts > 0 ? unreadAlerts.toString() : undefined,
          badgeColor:
            'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
        },
        {
          label: 'Action Center',
          href: '/app/action-center',
          icon: CheckCircle2,
          badge: pendingActions > 0 ? `${pendingActions} ready` : undefined,
          badgeColor:
            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        {
          label: 'AI Copilot',
          href: '/app/copilot',
          icon: Bot,
          highlight: true,
          badge: 'Bob v3',
          badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
        },
        { label: 'Analytics', href: '/app/analytics', icon: BarChart3 },
        { label: 'Simulations', href: '/app/simulations', icon: Sliders },
      ],
    },
    {
      title: 'REPORTING',
      items: [
        { label: 'Reports', href: '/app/reports', icon: FileText },
      ],
    },
  ];

  const bottomItems = [
    { label: 'Integrations', href: '/app/integrations', icon: PlugZap },
    { label: 'Settings', href: '/app/settings', icon: Settings },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/app/overview') return pathname === '/app/overview';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const renderNavGroup = (group: NavGroup, isMobile = false) => (
    <div key={group.title} className="space-y-1">
      {(!collapsed || isMobile) && (
        <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase select-none flex items-center justify-between">
          <span>{group.title}</span>
        </div>
      )}

      <div className="space-y-0.5">
        {group.items.map((item) => {
          const Icon = item.icon;
          const active = isLinkActive(item.href);

          return (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                onClick={() => isMobile && setIsMobileNavOpen(false)}
                className={`relative flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 select-none ${
                  active
                    ? item.highlight
                      ? 'bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 text-indigo-700 dark:text-cyan-300 font-semibold border border-cyan-500/30 shadow-xs'
                      : 'bg-indigo-50/90 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/80 dark:border-indigo-800/60 shadow-2xs'
                    : item.highlight
                    ? 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/50'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/40'
                }`}
              >
                {/* Active Indicator Bar */}
                {active && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-indigo-600 dark:bg-cyan-400" />
                )}

                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative shrink-0">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        active
                          ? item.highlight
                            ? 'text-cyan-600 dark:text-cyan-400'
                            : 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                      }`}
                    />
                    {item.highlight && !active && (
                      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </div>

                  {(!collapsed || isMobile) && (
                    <span className="truncate tracking-tight flex items-center gap-1.5">
                      {item.label}
                      {item.highlight && (
                        <Sparkles className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                      )}
                    </span>
                  )}
                </div>

                {(!collapsed || isMobile) && item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-semibold shrink-0 ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>

              {/* Floating Tooltip when Collapsed (Desktop only) */}
              {collapsed && !isMobile && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 px-2.5 py-1.5 bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 text-xs rounded-md shadow-xl border border-slate-700/80 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 flex items-center gap-2">
                  <span className="font-semibold">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex relative flex-col border-r border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#0A0F1B]/95 backdrop-blur-md transition-all duration-200 z-30 shrink-0 select-none ${
          collapsed ? 'w-16' : 'w-56'
        }`}
      >
        {/* Brand Header */}
        <div className="h-14 flex items-center justify-between px-3.5 border-b border-slate-200/90 dark:border-slate-800/80">
          <Link href="/app/overview" className="flex items-center gap-2.5 overflow-hidden group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  FLUXCHAIN <span className="text-[9px] px-1 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono border border-cyan-500/20">AI</span>
                </span>
                <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider truncate">
                  Control Tower
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Grouped Navigation List */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
          {navGroups.map((group) => renderNavGroup(group, false))}
        </div>

        {/* Bottom System & User Section */}
        <div className="p-2.5 border-t border-slate-200/90 dark:border-slate-800/80 space-y-1 bg-slate-50/50 dark:bg-slate-900/30">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const active = isLinkActive(item.href);

            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>

                {collapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 px-2.5 py-1.5 bg-slate-900 text-white dark:bg-slate-800 text-xs rounded-md shadow-xl border border-slate-700 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}

          {/* User Profile Footer */}
          <div className="relative pt-1 border-t border-slate-200/70 dark:border-slate-800/60">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-600 flex items-center justify-center text-[10px] font-bold text-white shadow-2xs shrink-0">
                  OP
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                </div>
                {!collapsed && (
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      Ops Desk 01
                    </span>
                    <span className="text-[10px] text-slate-400 truncate">
                      Chief Controller
                    </span>
                  </div>
                )}
              </div>
              {!collapsed && <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {/* Profile Dropdown Popover */}
            {showProfileMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-1.5 z-50 text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div className="px-2.5 py-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="font-semibold text-slate-900 dark:text-white">Ops Control Center</div>
                  <div className="text-[10px] text-slate-400 font-mono">ops@fluxchain.ai</div>
                </div>
                <div className="py-1">
                  <Link
                    href="/app/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Account Profile</span>
                  </Link>
                  <Link
                    href="/app/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Help & Docs</span>
                  </Link>
                </div>
                <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
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
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          />

          {/* Drawer Menu */}
          <div className="relative w-72 max-w-[85vw] bg-white dark:bg-[#0A0F1B] h-full flex flex-col shadow-2xl border-r border-slate-200 dark:border-slate-800 z-10 animate-in slide-in-from-left duration-200">
            {/* Header with close */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
              <Link
                href="/app/overview"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs tracking-tight text-slate-900 dark:text-white">
                  FLUXCHAIN <span className="text-cyan-500 font-mono">AI</span>
                </span>
              </Link>

              <button
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
              {navGroups.map((group) => renderNavGroup(group, true))}
            </div>

            {/* Mobile Bottom Links */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1 bg-slate-50 dark:bg-slate-900/40">
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

