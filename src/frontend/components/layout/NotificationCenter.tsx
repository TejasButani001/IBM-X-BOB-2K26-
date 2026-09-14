'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useControlTower } from '../../context/ControlTowerContext';
import { NotificationSeverity } from '../../types';
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Package,
  Truck,
  Thermometer,
  Eye,
  CheckCircle2,
  X,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Info,
  Sliders,
  Check,
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const router = useRouter();
  const {
    alerts,
    markAllAlertsRead,
    markAlertRead,
    acknowledgeAlert,
    resolveAlert,
    dismissAlert,
  } = useControlTower();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Critical' | 'High' | 'Warning' | 'Informational'>('All');
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Filter out dismissed notifications
  const visibleAlerts = alerts.filter((a) => a.status !== 'Dismissed');
  const unreadAlerts = visibleAlerts.filter((a) => a.status === 'Unread');
  const criticalCount = visibleAlerts.filter((a) => a.severity === 'Critical' || a.severity === 'critical').length;
  const highCount = visibleAlerts.filter((a) => a.severity === 'High' || a.severity === 'major').length;
  const warningCount = visibleAlerts.filter((a) => a.severity === 'Warning' || a.severity === 'warning').length;
  const infoCount = visibleAlerts.filter((a) => a.severity === 'Informational' || a.severity === 'info' || a.severity === 'healthy').length;

  // Filter by active tab
  const filteredAlerts = visibleAlerts.filter((a) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Critical') return a.severity === 'Critical' || a.severity === 'critical';
    if (activeTab === 'High') return a.severity === 'High' || a.severity === 'major';
    if (activeTab === 'Warning') return a.severity === 'Warning' || a.severity === 'warning';
    if (activeTab === 'Informational') return a.severity === 'Informational' || a.severity === 'info' || a.severity === 'healthy';
    return true;
  });

  const getEntityLink = (entityType: string, entityId: string) => {
    if (entityType === 'disruption') return `/app/disruptions/${entityId}`;
    if (entityType === 'shipment') return `/app/shipments/${entityId}`;
    if (entityType === 'fleet') return `/app/fleet`;
    if (entityType === 'cold-chain') return `/app/cold-chain/${entityId}`;
    return `/app/alerts`;
  };

  const getSeverityBadge = (severity: NotificationSeverity) => {
    const s = severity.toLowerCase();
    if (s === 'critical') {
      return {
        label: 'CRITICAL',
        color: 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30',
        icon: ShieldAlert,
      };
    }
    if (s === 'high' || s === 'major') {
      return {
        label: 'HIGH',
        color: 'bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/30',
        icon: AlertTriangle,
      };
    }
    if (s === 'warning') {
      return {
        label: 'WARNING',
        color: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30',
        icon: AlertTriangle,
      };
    }
    return {
      label: 'INFO',
      color: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30',
      icon: Info,
    };
  };

  const getEntityIcon = (entityType: string) => {
    if (entityType === 'disruption') return AlertTriangle;
    if (entityType === 'shipment') return Package;
    if (entityType === 'fleet') return Truck;
    if (entityType === 'cold-chain') return Thermometer;
    return Bell;
  };

  return (
    <div className="relative" ref={popoverRef}>
      {/* Trigger Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors select-none"
        title="Notification Center"
      >
        <Bell className="w-4.5 h-4.5" />
        {unreadAlerts.length > 0 && (
          <span className="absolute top-1 right-1 px-1 min-w-[15px] h-3.5 rounded-full bg-rose-600 text-white font-mono text-[9px] flex items-center justify-center font-bold animate-pulse shadow-sm">
            {unreadAlerts.length}
          </span>
        )}
      </button>

      {/* Dropdown Popover Window */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-84 sm:w-96 bg-white dark:bg-[#0B101D] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-0 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 ring-1 ring-slate-900/10">
          {/* Header Bar */}
          <div className="px-4 py-3 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-cyan-400 flex items-center justify-center border border-indigo-500/20">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  Notification Center
                  {unreadAlerts.length > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      {unreadAlerts.length} Unread
                    </span>
                  )}
                </h3>
                <p className="text-[10px] text-slate-400">Live Control Tower Alerts & Events</p>
              </div>
            </div>

            {/* Mark All As Read Button */}
            {unreadAlerts.length > 0 && (
              <button
                onClick={markAllAlertsRead}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold text-indigo-600 dark:text-cyan-400 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors border border-indigo-200 dark:border-slate-700"
                title="Mark all notifications as read"
              >
                <CheckCheck className="w-3 h-3" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/20 text-[11px] overflow-x-auto select-none no-scrollbar">
            {(
              [
                { id: 'All', label: 'All', count: visibleAlerts.length },
                { id: 'Critical', label: 'Critical', count: criticalCount },
                { id: 'High', label: 'High', count: highCount },
                { id: 'Warning', label: 'Warning', count: warningCount },
                { id: 'Informational', label: 'Info', count: infoCount },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors shrink-0 flex items-center gap-1 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[9px] font-mono opacity-80">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Notification List Body */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-2 divide-y divide-slate-100 dark:divide-slate-800/50">
            {filteredAlerts.length === 0 ? (
              <div className="py-8 text-center text-slate-400 dark:text-slate-500">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-1 text-emerald-500 opacity-80" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">No active alerts</p>
                <p className="text-[10px] text-slate-400 mt-0.5">All supply chain operations in this category are nominal.</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => {
                const isUnread = alert.status === 'Unread';
                const badge = getSeverityBadge(alert.severity);
                const SeverityIcon = badge.icon;
                const EntityIcon = getEntityIcon(alert.entityType);

                return (
                  <div
                    key={alert.id}
                    className={`group relative p-2.5 rounded-xl transition-all duration-150 border ${
                      isUnread
                        ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200/80 dark:border-indigo-800/40 shadow-2xs'
                        : 'bg-white dark:bg-slate-900/30 border-slate-100 dark:border-slate-800/60'
                    }`}
                  >
                    {/* Top Row: Severity Badge + Unread Dot + Timestamp */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border uppercase flex items-center gap-1 ${badge.color}`}
                        >
                          <SeverityIcon className="w-2.5 h-2.5" />
                          {badge.label}
                        </span>
                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" title="Unread" />
                        )}
                        <span className="text-[10px] text-slate-400 font-mono">
                          {alert.entityId && `• ${alert.entityId}`}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{alert.timestamp}</span>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug mb-1">
                      {alert.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-2.5">
                      {alert.description}
                    </p>

                    {/* Actions Toolbar: View, Acknowledge, Resolve, Dismiss */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800/60 text-[10px]">
                      {/* Left Action: Navigate / View */}
                      <button
                        onClick={() => {
                          markAlertRead(alert.id);
                          setIsOpen(false);
                          router.push(getEntityLink(alert.entityType, alert.entityId));
                        }}
                        className="flex items-center gap-1 text-indigo-600 dark:text-cyan-400 font-semibold hover:underline"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Details</span>
                      </button>

                      {/* Right Actions: Acknowledge, Resolve, Dismiss */}
                      <div className="flex items-center gap-1">
                        {alert.status === 'Unread' && (
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                            title="Acknowledge notification"
                          >
                            Acknowledge
                          </button>
                        )}

                        {alert.status !== 'Resolved' && (
                          <button
                            onClick={() => resolveAlert(alert.id)}
                            className="px-1.5 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20 transition-colors"
                            title="Mark as resolved"
                          >
                            Resolve
                          </button>
                        )}

                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                          title="Dismiss notification"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-[#070A12] border-t border-slate-200/90 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
            <span className="font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Sensor Feed
            </span>
            <Link
              href="/app/alerts"
              onClick={() => setIsOpen(false)}
              className="font-semibold text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>View All Alerts</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
