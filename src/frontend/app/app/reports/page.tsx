'use client';

import React, { useState } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import {
  FileText,
  Download,
  Share2,
  Calendar,
  Filter,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ShieldCheck,
  Building,
  RefreshCw,
} from 'lucide-react';

interface ReportMeta {
  id: string;
  title: string;
  description: string;
  date: string;
  period: string;
  type: string;
  status: 'Ready' | 'Generating' | 'Archived';
}

const REPORT_LIBRARY: ReportMeta[] = [
  {
    id: 'REP-001',
    title: 'Disruption Impact Report: West Asia Corridor',
    description: 'Comprehensive analysis of D001 JNPT labor strike, affected bill of ladings, and multimodal reroute performance.',
    date: '2026-09-14',
    period: 'Last 7 Days',
    type: 'Disruption Impact',
    status: 'Ready',
  },
  {
    id: 'REP-002',
    title: 'Fleet Utilisation & Idle Capacity Audit',
    description: 'Regional asset deployment efficiency, idle reefer truck metrics, and match score accuracy across dry ports.',
    date: '2026-09-14',
    period: 'Current Month',
    type: 'Fleet Utilisation',
    status: 'Ready',
  },
  {
    id: 'REP-003',
    title: 'Cold-Chain Incident & Excursion Brief',
    description: 'Sensor telemetry logs, temperature excursion durations (+10.0°C spikes), and cargo inspection audit trails.',
    date: '2026-09-13',
    period: 'Last 30 Days',
    type: 'Cold-Chain Incident',
    status: 'Ready',
  },
  {
    id: 'REP-004',
    title: 'Daily Operations Executive Summary',
    description: 'High-level synthesis of network risk score, active disruptions, top 5 delayed shipments, and AI mitigation ROI.',
    date: '2026-09-14',
    period: 'Today',
    type: 'Daily Brief',
    status: 'Ready',
  },
  {
    id: 'REP-005',
    title: 'Q3 Supply Chain Resilience & SLA Compliance',
    description: 'Quarterly review of carrier SLA performance, route failure modes, and automated risk scoring efficacy.',
    date: '2026-09-10',
    period: 'Q3 2026',
    type: 'Executive Summary',
    status: 'Ready',
  },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportMeta>(REPORT_LIBRARY[0]);
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [regionFilter, setRegionFilter] = useState('West Asia Corridor');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1200);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Operations Reporting System"
        subtitle="Generate executive logistics intelligence briefs, risk audit trails, and carrier SLA compliance exports."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Reports' },
        ]}
      />

      {/* Filter & Generator Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <div>
            <label className="block text-slate-400 text-[10px] uppercase font-mono font-bold mb-1">
              Reporting Period
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none"
            >
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Q3 2026">Q3 2026</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 text-[10px] uppercase font-mono font-bold mb-1">
              Geographic Scope
            </label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none"
            >
              <option value="West Asia Corridor">West Asia Corridor</option>
              <option value="Trans-Pacific">Trans-Pacific</option>
              <option value="Global Network">Global Network</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>{isExporting ? 'Exporting PDF...' : 'Export PDF / CSV'}</span>
          </button>
          <button
            onClick={() => alert('Report link copied to clipboard.')}
            className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Report</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Left Report Library | Right Document Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Report Library */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-mono text-xs uppercase font-bold text-slate-400 tracking-wider">
            REPORT LIBRARY ({REPORT_LIBRARY.length})
          </h3>

          <div className="space-y-2">
            {REPORT_LIBRARY.map((report) => {
              const isSelected = selectedReport.id === report.id;
              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-950/80 to-slate-900 border-indigo-500 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      {report.type}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{report.date}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs sm:text-sm leading-snug">{report.title}</h4>
                  <p className="text-slate-400 text-[11px] mt-1 line-clamp-2">{report.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Document-like Executive Preview */}
        <div className="lg:col-span-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-[#090D16] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl space-y-6">
            {/* Report Header */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-mono font-bold text-white text-xs">
                    FC
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">
                      FluxChain AI Control Tower
                    </h2>
                    <span className="text-[11px] font-mono text-slate-500">Autonomous Operations Briefing</span>
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-slate-500">
                  <div>Report ID: {selectedReport.id}</div>
                  <div>Generated: {selectedReport.date}</div>
                </div>
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">{selectedReport.title}</h1>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
                  <span>Scope: {regionFilter}</span>
                  <span>•</span>
                  <span>Period: {selectedReport.period}</span>
                  <span>•</span>
                  <span className="text-emerald-500 font-bold">Status: VERIFIED</span>
                </div>
              </div>
            </div>

            {/* 1. Executive Summary */}
            <div className="space-y-2 text-xs leading-relaxed">
              <h3 className="font-mono text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                1. Executive Summary
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                During the reporting period, the West Asia Corridor experienced severe labor disruption (D001 JNPT Strike), escalating berth dwell times to +77 hours. FluxChain AI successfully rerouted 14 affected shipments via Mundra Rail Bypass, reducing average delay by 71% and preserving $3.4M in temperature-sensitive pharmaceuticals.
              </p>
            </div>

            {/* 2. Key Incident & Disruption Matrix */}
            <div className="space-y-2 text-xs">
              <h3 className="font-mono text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                2. Key Network Incidents
              </h3>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                  <span>D001: Mumbai Port Strike (JNPT Gateway)</span>
                  <span className="font-mono text-rose-500 font-bold">CRITICAL SEVERITY</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                  Walkout of dockworkers at Terminals 2 & 3. 18 container vessels held at anchorage.
                </p>
              </div>
            </div>

            {/* 3. Risk & Cold-Chain Analysis */}
            <div className="space-y-2 text-xs">
              <h3 className="font-mono text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                3. Risk Attribution & Cold-Chain Telemetry
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Avg Corridor Risk Score</div>
                  <div className="text-xl font-bold text-rose-500 mt-0.5">87 / 100</div>
                  <div className="text-[10px] text-slate-400">Escalated by JNPT hold</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Cold-Chain Excursions</div>
                  <div className="text-xl font-bold text-orange-500 mt-0.5">1 Incident (VAX-2045)</div>
                  <div className="text-[10px] text-slate-400">+10.0°C peak (47 min duration)</div>
                </div>
              </div>
            </div>

            {/* 4. AI Recommendations & Next Actions */}
            <div className="space-y-2 text-xs">
              <h3 className="font-mono text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                4. AI Recommendations & Next Actions
              </h3>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Reroute S101 via Mundra Corridor with Concor express rail connection.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Redeploy Truck T04 from Ahmedabad to handle dry port container pickup.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Perform physical reefer genset check on VAX-2045 prior to final dispatch.</span>
                </li>
              </ul>
            </div>

            {/* Document Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>FluxChain AI Operations Engine v2.4</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
