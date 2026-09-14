'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import { RiskBadge } from '../../../components/ui/RiskBadge';
import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Package,
  Truck,
  Thermometer,
  Shield,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { SeverityLevel } from '../../../types';

export default function AlertCenterPage() {
  const { alerts } = useControlTower();
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredAlerts = alerts.filter((a) => {
    const matchesTab =
      selectedTab === 'All' ||
      (selectedTab === 'Critical' && a.severity === 'critical') ||
      (selectedTab === 'High' && (a.severity === 'major' || a.severity === 'critical')) ||
      (selectedTab === 'Medium' && a.severity === 'warning') ||
      (selectedTab === 'Resolved' && a.status === 'Resolved');

    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    return matchesTab && matchesCat;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operational Alert Center"
        subtitle="Prioritized multi-source alerts across disruption cascades, cold-chain spikes, and idle capacity."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Alerts' },
        ]}
      />

      {/* Tabs and Filters */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex rounded-lg bg-slate-950 border border-slate-800 p-0.5">
          {['All', 'Critical', 'High', 'Medium', 'Resolved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedTab === tab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="All">All Categories</option>
          <option value="Cold-Chain">Cold-Chain Only</option>
          <option value="Disruption">Disruption Only</option>
          <option value="Shipment">Shipment Only</option>
          <option value="Fleet">Fleet Only</option>
        </select>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
            No alerts match the selected filter criteria.
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            let Icon = Bell;
            if (alert.category === 'Cold-Chain') Icon = Thermometer;
            if (alert.category === 'Disruption') Icon = AlertTriangle;
            if (alert.category === 'Shipment') Icon = Package;
            if (alert.category === 'Fleet') Icon = Truck;

            let targetUrl = '/app/overview';
            if (alert.entityType === 'disruption') targetUrl = `/app/disruptions/${alert.entityId}`;
            if (alert.entityType === 'shipment') targetUrl = `/app/shipments/${alert.entityId}`;
            if (alert.entityType === 'cold-chain') targetUrl = `/app/cold-chain/${alert.entityId}`;
            if (alert.entityType === 'fleet') targetUrl = `/app/fleet/redeployment`;

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs ${
                  alert.severity === 'critical'
                    ? 'bg-rose-950/20 border-rose-900/60'
                    : alert.severity === 'warning'
                    ? 'bg-amber-950/20 border-amber-900/60'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      alert.severity === 'critical'
                        ? 'bg-rose-900/60 text-rose-400'
                        : alert.severity === 'warning'
                        ? 'bg-amber-900/60 text-amber-400'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-white text-sm">{alert.title}</h3>
                      <RiskBadge severity={alert.severity} size="sm" />
                      <span className="text-[10px] font-mono text-slate-400">{alert.timestamp}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed max-w-3xl">{alert.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  <Link
                    href={targetUrl}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Open Entity</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
