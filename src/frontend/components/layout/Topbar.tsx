'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useControlTower } from '../../context/ControlTowerContext';
import { NotificationCenter } from './NotificationCenter';
import {
  Search,
  Moon,
  Sun,
  Bell,
  Radio,
  Globe,
  ChevronDown,
  Menu,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  User,
  LogOut,
  Check,
  AlertTriangle,
  Sliders,
  Sparkles,
  BookOpen,
  Keyboard,
} from 'lucide-react';

export const Topbar: React.FC = () => {
  const pathname = usePathname();
  const {
    theme,
    toggleTheme,
    setCommandPaletteOpen,
    setIsMobileNavOpen,
    metrics,
    alerts,
  } = useControlTower();

  const [selectedWorkspace, setSelectedWorkspace] = useState('West Asia Corridor');
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showAlertsMenu, setShowAlertsMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadAlerts = alerts.filter((a) => a.status === 'Unread');

  const workspaces = [
    { name: 'West Asia Corridor', region: 'Global Maritime & Inland', active: true },
    { name: 'APAC Logistics Hub', region: 'East Asia & Oceania', active: false },
    { name: 'EMEA Operations Center', region: 'Europe & Middle East', active: false },
    { name: 'Americas Freight Net', region: 'North & South America', active: false },
  ];

  // Dynamic Breadcrumbs derivation
  const getBreadcrumbs = () => {
    if (pathname === '/app/overview') return [{ label: 'Control Tower', href: '/app/overview' }, { label: 'Overview' }];
    if (pathname === '/app/disruptions') return [{ label: 'Control Tower', href: '/app/overview' }, { label: 'Disruptions' }];
    if (pathname.startsWith('/app/disruptions/')) {
      const id = pathname.split('/')[3] || 'D001';
      return [
        { label: 'Control Tower', href: '/app/overview' },
        { label: 'Disruptions', href: '/app/disruptions' },
        { label: id === 'D001' ? 'D001 (Mumbai Port)' : id },
      ];
    }
    if (pathname === '/app/shipments') return [{ label: 'Control Tower', href: '/app/overview' }, { label: 'Shipments' }];
    if (pathname.startsWith('/app/shipments/')) {
      const id = pathname.split('/')[3] || 'S101';
      return [
        { label: 'Control Tower', href: '/app/overview' },
        { label: 'Shipments', href: '/app/shipments' },
        { label: id },
      ];
    }
    if (pathname === '/app/routing') return [{ label: 'Control Tower', href: '/app/overview' }, { label: 'AI Routing' }];
    if (pathname === '/app/fleet') return [{ label: 'Operations', href: '/app/fleet' }, { label: 'Fleet' }];
    if (pathname === '/app/fleet/redeployment') {
      return [
        { label: 'Operations', href: '/app/fleet' },
        { label: 'Fleet', href: '/app/fleet' },
        { label: 'Redeployment' },
      ];
    }
    if (pathname === '/app/cold-chain') return [{ label: 'Operations', href: '/app/cold-chain' }, { label: 'Cold Chain' }];
    if (pathname.startsWith('/app/cold-chain/')) {
      const id = pathname.split('/')[3] || 'VAX-2045';
      return [
        { label: 'Operations', href: '/app/cold-chain' },
        { label: 'Cold Chain', href: '/app/cold-chain' },
        { label: id },
      ];
    }
    if (pathname === '/app/alerts') return [{ label: 'Operations', href: '/app/alerts' }, { label: 'Alerts' }];
    if (pathname === '/app/action-center') return [{ label: 'Operations', href: '/app/action-center' }, { label: 'Action Center' }];
    if (pathname === '/app/copilot') return [{ label: 'Intelligence', href: '/app/copilot' }, { label: 'AI Copilot' }];
    if (pathname === '/app/analytics') return [{ label: 'Intelligence', href: '/app/analytics' }, { label: 'Analytics' }];
    if (pathname === '/app/simulations') return [{ label: 'Intelligence', href: '/app/simulations' }, { label: 'Simulations' }];
    if (pathname === '/app/reports') return [{ label: 'Reporting', href: '/app/reports' }, { label: 'Reports' }];
    if (pathname === '/app/integrations') return [{ label: 'System', href: '/app/integrations' }, { label: 'Integrations' }];
    if (pathname === '/app/settings') return [{ label: 'System', href: '/app/settings' }, { label: 'Settings' }];

    return [{ label: 'Control Tower', href: '/app/overview' }, { label: 'Overview' }];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-13 sm:h-14 border-b border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#0A0F1B]/95 backdrop-blur-md px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 z-20 shrink-0 select-none">
      {/* Left: Mobile Trigger + Workspace Dropdown + Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="lg:hidden p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Workspace Selector */}
        <div className="relative">
          <button
            onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/80 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400 shrink-0" />
            <span className="hidden sm:inline font-semibold text-slate-900 dark:text-white truncate">
              {selectedWorkspace}
            </span>
            <span className="sm:hidden font-semibold truncate">Corridor</span>
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0 ml-0.5" />
          </button>

          {/* Workspace Menu Dropdown */}
          {showWorkspaceMenu && (
            <div className="absolute top-full left-0 mt-1.5 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Select Active Corridor
              </div>
              <div className="space-y-0.5">
                {workspaces.map((ws) => (
                  <button
                    key={ws.name}
                    onClick={() => {
                      setSelectedWorkspace(ws.name);
                      setShowWorkspaceMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-left transition-colors ${
                      ws.name === selectedWorkspace
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-cyan-300 font-semibold border border-indigo-200 dark:border-indigo-800/60'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{ws.name}</div>
                      <div className="text-[10px] text-slate-400">{ws.region}</div>
                    </div>
                    {ws.name === selectedWorkspace && (
                      <Check className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pl-2 border-l border-slate-200 dark:border-slate-800">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[160px]">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Live Health Beacon */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-400">
          <Radio className="w-3 h-3 animate-pulse shrink-0 text-emerald-500" />
          <span className="font-medium">99.8% SLA</span>
          <span className="text-emerald-400 font-mono font-bold">• {metrics.networkHealthScore}% Health</span>
        </div>
      </div>

      {/* Middle: Command Palette Search Bar */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="flex-1 max-w-xs xl:max-w-md hidden md:flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-100/80 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/70 text-xs text-slate-500 dark:text-slate-400 transition-all shadow-2xs group"
      >
        <div className="flex items-center gap-2 truncate">
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-cyan-400 shrink-0 transition-colors" />
          <span className="truncate">Search (S101, Mumbai, T04)...</span>
        </div>
        <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[10px] text-slate-500 dark:text-slate-300 shadow-2xs shrink-0">
          ⌘K
        </kbd>
      </button>

      {/* Right Tools: Notifications, Help, Theme, Profile */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Mobile Search Icon */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Search (⌘K)"
        >
          <Search className="w-4.5 h-4.5" />
        </button>

        {/* Professional Notification Center */}
        <NotificationCenter />

        {/* Help Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowHelpMenu(!showHelpMenu)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Help & Resources"
          >
            <HelpCircle className="w-4.5 h-4.5" />
          </button>

          {showHelpMenu && (
            <div className="absolute top-full right-0 mt-1.5 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Support & Guides
              </div>
              <div className="space-y-0.5">
                <button
                  onClick={() => {
                    setShowHelpMenu(false);
                    setCommandPaletteOpen(true);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                >
                  <Keyboard className="w-4 h-4 text-indigo-500" />
                  <span>Keyboard Shortcuts (⌘K)</span>
                </button>
                <Link
                  href="/docs"
                  onClick={() => setShowHelpMenu(false)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <BookOpen className="w-4 h-4 text-cyan-500" />
                  <span>Control Tower Guide</span>
                </Link>
                <Link
                  href="/app/copilot"
                  onClick={() => setShowHelpMenu(false)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Ask AI Assistant</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4.5 h-4.5 text-amber-400" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-indigo-600" />
          )}
        </button>

        {/* Bob AI Model Tag */}
        <div className="hidden lg:flex items-center gap-1.5 pl-2.5 border-l border-slate-200 dark:border-slate-800 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
          <span className="text-slate-600 dark:text-slate-400 font-mono font-medium">Bob AI v3.0</span>
        </div>

        {/* Profile Avatar Pill */}
        <div className="relative pl-1.5 border-l border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-500/50 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-600 flex items-center justify-center text-[11px] font-bold text-white shadow-2xs">
              OP
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute top-full right-0 mt-1.5 w-52 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-2.5 py-2 border-b border-slate-100 dark:border-slate-800">
                <div className="font-semibold text-slate-900 dark:text-white">Ops Control Center</div>
                <div className="text-[10px] text-slate-400 font-mono">ops@fluxchain.ai</div>
              </div>
              <div className="py-1">
                <Link
                  href="/app/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile Settings</span>
                </Link>
                <Link
                  href="/app/simulations"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Simulation Modes</span>
                </Link>
              </div>
              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

