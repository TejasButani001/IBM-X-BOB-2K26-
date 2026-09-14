'use client';

import React, { useState } from 'react';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import { MetricCard } from '../../../components/ui/MetricCard';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Truck,
  Thermometer,
  AlertTriangle,
  Download,
  Calendar,
} from 'lucide-react';

export default function AnalyticsPage() {
  const { metrics } = useControlTower();
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Predictive Operational Analytics"
        subtitle="Aggregated multi-corridor KPIs, delay distributions, thermal stability drift, and fleet utilization trends."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Analytics' },
        ]}
        actions={
          <div className="flex items-center gap-2 text-xs">
            <div className="flex rounded-lg bg-slate-900 border border-slate-800 p-0.5">
              {['24h', '7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-md font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button
              onClick={() => alert('Analytics report exported as CSV.')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        }
      />

      {/* 4 Core Performance Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 text-xs">
        <MetricCard
          label="On-Time Arrival Index"
          value={`${metrics.onTimePerformancePercent}%`}
          icon={Activity}
          change="+4.2% vs target"
          variant="healthy"
        />
        <MetricCard
          label="Fleet Asset Utilisation"
          value={`${metrics.fleetUtilisationPercent}%`}
          icon={Truck}
          change="+14% post redeployment"
          variant="info"
        />
        <MetricCard
          label="Cumulative Delay Hours"
          value="1,386h"
          subValue="across 18 vessels"
          icon={AlertTriangle}
          variant="critical"
          isNegativeChange
        />
        <MetricCard
          label="Cold-Chain Batch Retention"
          value="99.4%"
          icon={Thermometer}
          variant="healthy"
        />
      </div>

      {/* Analytics Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Chart 1: Delay Distribution by Port */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm">Port Congestion & Delay Surge (Hours)</h3>
            <span className="font-mono text-slate-400 text-[11px]">Avg Dwell Hours</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { port: 'JNPT Nhava Sheva (Mumbai)', hours: 77.2, percent: 95, color: 'bg-rose-500' },
              { port: 'Shanghai Yangshan', hours: 36.0, percent: 45, color: 'bg-orange-500' },
              { port: 'Hamburg Waltershof', hours: 24.5, percent: 32, color: 'bg-amber-500' },
              { port: 'Antwerp Euroterminal', hours: 18.2, percent: 24, color: 'bg-blue-500' },
              { port: 'Mundra Adani Terminal 3 (Bypass)', hours: 4.0, percent: 6, color: 'bg-emerald-500' },
            ].map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium text-slate-200">{row.port}</span>
                  <span className="font-mono font-bold text-white">+{row.hours}h</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${row.percent}%` }}
                    className={`h-full ${row.color} rounded-full transition-all`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Fleet Category Utilisation Breakdown */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm">Fleet Utilisation by Asset Class</h3>
            <span className="font-mono text-slate-400 text-[11px]">Active vs Standby</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { class: 'Multi-Chamber Cryo-Reefers (Trucks)', util: 68, count: '6 / 8 Active', color: 'bg-indigo-500' },
              { class: 'Heavy Prime Movers & Flatbeds', util: 54, count: '7 / 13 Active', color: 'bg-blue-500' },
              { class: '40ft High-Cube Smart Containers', util: 78, count: '14 / 18 Active', color: 'bg-emerald-500' },
              { class: 'Coastal Feeder Barges & Vessels', util: 44, count: '3 / 6 Active', color: 'bg-amber-500' },
              { class: 'Emergency Mobile Reefer Units', util: 32, count: '2 / 6 Active', color: 'bg-purple-500' },
            ].map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium text-slate-200">{row.class}</span>
                  <span className="font-mono font-bold text-white">{row.util}% ({row.count})</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${row.util}%` }}
                    className={`h-full ${row.color} rounded-full transition-all`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
