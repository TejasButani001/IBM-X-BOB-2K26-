'use client';

import React from 'react';
import Link from 'next/link';
import { useControlTower } from '../../context/ControlTowerContext';
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
} from 'lucide-react';

export const Topbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    setCommandPaletteOpen,
    setIsMobileNavOpen,
    metrics,
    alerts,
  } = useControlTower();

  const unreadAlerts = alerts.filter((a) => a.status === 'Unread').length;

  return (
    <header className="h-13 sm:h-14 border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#0A0F1B]/95 backdrop-blur px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 z-20 shrink-0 select-none">
      {/* Left: Mobile Menu Trigger + Workspace Selector */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="lg:hidden p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Open Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Workspace Selector Dropdown Pill */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
          <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-slate-900 dark:text-white">Global Maritime & Inland</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-500 dark:text-slate-400 truncate">West Asia Corridor</span>
          </div>
          <ChevronDown className="w-3 h-3 text-slate-400 shrink-0 ml-0.5" />
        </div>

        {/* Live Network Health Beacon */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-[11px] text-emerald-700 dark:text-emerald-400">
          <Radio className="w-3 h-3 animate-pulse shrink-0" />
          <span className="hidden md:inline font-medium">Health:</span>
          <span className="font-mono font-bold">{metrics.networkHealthScore}%</span>
        </div>
      </div>

      {/* Middle: Command Palette Search Bar */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="flex-1 max-w-sm lg:max-w-md hidden md:flex items-center justify-between px-3 py-1.5 rounded-md bg-slate-100/80 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/70 text-xs text-slate-500 dark:text-slate-400 transition-colors shadow-2xs"
      >
        <div className="flex items-center gap-2 truncate">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">Search shipments (S101), disruptions, fleet (T04)...</span>
        </div>
        <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[10px] text-slate-500 dark:text-slate-300 shadow-2xs">
          ⌘K
        </kbd>
      </button>

      {/* Right Area: Marketing link, Notifications, Theme toggle, AI status */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Link
          href="/"
          target="_blank"
          className="hidden xl:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span>Marketing Site</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* Mobile Search Button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="md:hidden p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Search (⌘K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications Icon with count pill */}
        <Link
          href="/app/alerts"
          className="relative p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Operational Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadAlerts > 0 && (
            <span className="absolute top-1 right-1 px-1 min-w-[14px] h-3.5 rounded-full bg-rose-600 text-white font-mono text-[9px] flex items-center justify-center font-bold">
              {unreadAlerts}
            </span>
          )}
        </Link>

        {/* Light / Dark Mode Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600" />
          )}
        </button>

        {/* Live Engine Status Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 pl-2.5 border-l border-slate-200 dark:border-slate-800 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-slate-600 dark:text-slate-400 font-mono">Bob AI v3.0</span>
        </div>

        {/* Profile Avatar Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-7 h-7 rounded-full bg-indigo-600 dark:bg-indigo-700 flex items-center justify-center text-[11px] font-bold text-white shadow-2xs">
            OP
          </div>
        </div>
      </div>
    </header>
  );
};

