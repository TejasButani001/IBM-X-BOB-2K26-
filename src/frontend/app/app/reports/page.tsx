'use client';

import React, { useState } from 'react';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import {
  FileText,
  Download,
  Share2,
  Sparkles,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Truck,
  Thermometer,
} from 'lucide-react';

export default function ReportsPage() {
  const { metrics } = useControlTower();
  const [selectedReport, setSelectedReport] = useState('Disruption Impact & Rerouting Brief');
  const [generating, setGenerating] = useState(false);

  const reportTypes = [
    'Disruption Impact & Rerouting Brief',
    'Fleet Utilisation & Redeployment Audit',
    'Cold-Chain Thermal Compliance Report',
    'Daily Executive Operational Briefing',
  ];

  const handleDownload = () => {
    alert(`Report "${selectedReport}" downloaded as PDF.`);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      alert(`Report "${selectedReport}" generated with current live telemetry.`);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operational Reports & Executive Briefings"
        subtitle="Generate audit-ready incident reports, carbon footprint trade-offs, and compliance certificates."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Reports' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{generating ? 'Compiling...' : 'Generate Live Report'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        }
      />

      {/* Report Selector Tabs */}
      <div className="flex rounded-lg bg-slate-900/60 border border-slate-800 p-1 overflow-x-auto text-xs">
        {reportTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedReport(type)}
            className={`px-3.5 py-2 rounded-md font-medium whitespace-nowrap transition-colors ${
              selectedReport === type
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Structured Report Preview */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 text-xs text-slate-300">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold">
              OFFICIAL DISPATCH BRIEFING // FLUXCHAIN AI
            </span>
            <h2 className="text-xl font-bold text-white mt-1">{selectedReport}</h2>
          </div>
          <div className="text-right font-mono text-[11px] text-slate-400">
            <div>Generated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</div>
            <div>Classification: <strong className="text-emerald-400">Restricted Operational</strong></div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="font-bold text-white text-sm uppercase font-mono tracking-wider">
            1. Executive Operational Summary
          </h3>
          <p className="leading-relaxed text-slate-300">
            During the monitoring cycle, global disruption D001 (Mumbai Port Strike) escalated to Critical severity, immobilizing 18 active inbound shipments with an average dwell surge of +77.2 hours. A cascading cold-chain temperature excursion was detected on Reefer Container VAX-2045 (Shipment S101), reaching 9.7°C (peak 10.0°C) for 47 cumulative minutes.
          </p>
        </div>

        {/* Key Incident Metrics Table */}
        <div className="space-y-2">
          <h3 className="font-bold text-white text-sm uppercase font-mono tracking-wider">
            2. Key Incident Telemetry
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
              <span className="text-slate-400 text-[10px]">At-Risk Shipments</span>
              <div className="text-lg font-bold font-mono text-rose-400">{metrics.atRiskShipments}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
              <span className="text-slate-400 text-[10px]">Idle Redeployment Pool</span>
              <div className="text-lg font-bold font-mono text-amber-400">{metrics.idleFleetAssets} Assets</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
              <span className="text-slate-400 text-[10px]">Cold-Chain Excursions</span>
              <div className="text-lg font-bold font-mono text-orange-400">2 Active Breaches</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
              <span className="text-slate-400 text-[10px]">Network Health Index</span>
              <div className="text-lg font-bold font-mono text-emerald-400">{metrics.networkHealthScore}%</div>
            </div>
          </div>
        </div>

        {/* Authorized Remediation Actions */}
        <div className="space-y-2">
          <h3 className="font-bold text-white text-sm uppercase font-mono tracking-wider">
            3. AI Recommended & Executed Interventions
          </h3>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Shipment S101 Rerouted:</strong> Diverted from JNPT to Mundra Port Terminal 3 (Route R-ALT-01). Reduced dwell delay from +77h to +6h.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Fleet Redeployment:</strong> Truck T04 (18T Reefer) mobilized from Ahmedabad to Mundra Port quay (94% corridor match).
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Thermal Stabilization:</strong> Emergency dry-ice recharge kit queued at Mundra quay to restore VAX-2045 below 6.0°C.
              </span>
            </div>
          </div>
        </div>

        {/* Sign-off footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Signed: Operations Dispatch Desk 01</span>
          <span>Verified by: IBM Bob AI Decision Engine v3.0</span>
        </div>
      </div>
    </div>
  );
}
