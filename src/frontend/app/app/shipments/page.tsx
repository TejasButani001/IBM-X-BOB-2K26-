'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { Button } from '../../../components/ui/Button';
import {
  Search,
  Download,
  Thermometer,
  AlertTriangle,
  RotateCcw,
  Package,
  Clock,
  ShieldAlert,
  ArrowRight,
  Filter,
  CheckCircle2,
  Compass,
} from 'lucide-react';

export default function ShipmentsPage() {
  const { shipments } = useControlTower();

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [chipFilter, setChipFilter] = useState<'All' | 'Critical' | 'At Risk' | 'Delayed' | 'Cold Chain' | 'Disrupted'>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCarrier, setSelectedCarrier] = useState<string>('All');
  const [coldChainFilter, setColdChainFilter] = useState<string>('All');
  const [disruptionFilter, setDisruptionFilter] = useState<string>('All');
  const [deliveryWindowFilter, setDeliveryWindowFilter] = useState<string>('All');

  // Compute Top KPI Strip
  const totalShipments = shipments.length;
  const inTransitCount = shipments.filter((s) => s.status === 'In Transit' || s.status === 'On Time').length;
  const delayedCount = shipments.filter((s) => s.delayHours > 0 || s.status === 'Delayed').length;
  const atRiskCount = shipments.filter((s) => s.riskScore >= 70 || s.status === 'At Risk').length;
  const disruptedCount = shipments.filter((s) => s.status === 'Disrupted' || Boolean(s.disruptionId)).length;
  const coldChainCount = shipments.filter((s) => s.isColdChain).length;

  // Filter Logic
  const filteredShipments = shipments.filter((s) => {
    // 1. Search Query
    const matchesSearch =
      !searchQuery.trim() ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.cargo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.carrier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Quick Filter Chip
    let matchesChip = true;
    if (chipFilter === 'Critical') matchesChip = s.priority === 'Critical' || s.riskScore >= 80;
    if (chipFilter === 'At Risk') matchesChip = s.riskScore >= 70 || s.status === 'At Risk';
    if (chipFilter === 'Delayed') matchesChip = s.delayHours > 0 || s.status === 'Delayed';
    if (chipFilter === 'Cold Chain') matchesChip = s.isColdChain;
    if (chipFilter === 'Disrupted') matchesChip = s.status === 'Disrupted' || Boolean(s.disruptionId);

    // 3. Dropdown Filters
    const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;
    
    let matchesRisk = true;
    if (selectedRisk === 'Critical') matchesRisk = s.riskScore >= 75;
    if (selectedRisk === 'Medium') matchesRisk = s.riskScore >= 40 && s.riskScore < 75;
    if (selectedRisk === 'Low') matchesRisk = s.riskScore < 40;

    const matchesPriority = selectedPriority === 'All' || s.priority === selectedPriority;
    
    let matchesRegion = true;
    if (selectedRegion === 'West Asia') matchesRegion = s.destination.includes('Mumbai') || s.destination.includes('IN');
    if (selectedRegion === 'East Asia') matchesRegion = s.origin.includes('Shanghai') || s.origin.includes('SG');

    const matchesCarrier = selectedCarrier === 'All' || s.carrier.toLowerCase().includes(selectedCarrier.toLowerCase());
    
    let matchesColdChain = true;
    if (coldChainFilter === 'Yes') matchesColdChain = s.isColdChain;
    if (coldChainFilter === 'No') matchesColdChain = !s.isColdChain;

    let matchesDisruption = true;
    if (disruptionFilter === 'Mumbai') matchesDisruption = s.disruptionId === 'D001';
    if (disruptionFilter === 'None') matchesDisruption = !s.disruptionId;

    let matchesDeliveryWindow = true;
    if (deliveryWindowFilter === 'Overdue') matchesDeliveryWindow = s.delayHours > 24;
    if (deliveryWindowFilter === 'Next 48h') matchesDeliveryWindow = s.delayHours <= 48;

    return (
      matchesSearch &&
      matchesChip &&
      matchesStatus &&
      matchesRisk &&
      matchesPriority &&
      matchesRegion &&
      matchesCarrier &&
      matchesColdChain &&
      matchesDisruption &&
      matchesDeliveryWindow
    );
  });

  const handleReset = () => {
    setSearchQuery('');
    setChipFilter('All');
    setSelectedStatus('All');
    setSelectedRisk('All');
    setSelectedPriority('All');
    setSelectedRegion('All');
    setSelectedCarrier('All');
    setColdChainFilter('All');
    setDisruptionFilter('All');
    setDeliveryWindowFilter('All');
  };

  const handleExport = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(filteredShipments, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'logistics_shipment_manifest.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Shipment Intelligence & Container Registry"
        subtitle="Real-time multi-modal consignment tracking, temperature telemetry, and disruption risk exposure index."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Shipments' },
        ]}
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={handleExport}
          >
            Export Manifest ({filteredShipments.length})
          </Button>
        }
      />

      {/* Top 6 Operational KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Total Shipments
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {totalShipments}
          </div>
          <div className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">Active Consignments</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs">
          <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            In Transit
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {inTransitCount}
          </div>
          <div className="mt-0.5 text-[10px] text-emerald-600/80 dark:text-emerald-400/80">Nominal Progress</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs">
          <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            Delayed
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
            {delayedCount}
          </div>
          <div className="mt-0.5 text-[10px] text-amber-600/80 dark:text-amber-400/80">Schedule Buffer Depleted</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs">
          <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            At Risk
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
            {atRiskCount}
          </div>
          <div className="mt-0.5 text-[10px] text-rose-600/80 dark:text-rose-400/80">Risk Score &gt; 70</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs">
          <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            Disrupted
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
            {disruptedCount}
          </div>
          <div className="mt-0.5 text-[10px] text-rose-600/80 dark:text-rose-400/80">Port / Route Stoppages</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs">
          <div className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1">
            <Thermometer className="w-3 h-3 text-cyan-500" /> Cold Chain
          </div>
          <div className="mt-1 text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">
            {coldChainCount}
          </div>
          <div className="mt-0.5 text-[10px] text-cyan-600/80 dark:text-cyan-400/80">Sensor Telemetry Monitored</div>
        </div>
      </div>

      {/* Quick Filter Chips & Search Control */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200/90 dark:border-slate-800/80 shadow-enterprise space-y-3 text-xs">
        {/* Quick Filter Chips Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Quick View:</span>
            {(
              [
                { id: 'All', label: 'All Shipments', count: totalShipments },
                { id: 'Critical', label: 'Critical Priority', count: shipments.filter((s) => s.priority === 'Critical').length },
                { id: 'At Risk', label: 'At Risk (70+)', count: atRiskCount },
                { id: 'Delayed', label: 'Delayed', count: delayedCount },
                { id: 'Cold Chain', label: 'Cold Chain', count: coldChainCount },
                { id: 'Disrupted', label: 'Disrupted', count: disruptedCount },
              ] as const
            ).map((chip) => (
              <button
                key={chip.id}
                onClick={() => setChipFilter(chip.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  chipFilter === chip.id
                    ? 'bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{chip.label}</span>
                <span className="text-[10px] font-mono opacity-80 font-bold">({chip.count})</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="text-[11px] font-semibold text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1 ml-auto"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All Filters</span>
          </button>
        </div>

        {/* Smart Filters Grid (8 Filters) */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search S101, Cargo, Carrier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
          >
            <option value="All">Status: All</option>
            <option value="In Transit">In Transit</option>
            <option value="On Time">On Time</option>
            <option value="Delayed">Delayed</option>
            <option value="At Risk">At Risk</option>
            <option value="Disrupted">Disrupted</option>
          </select>

          {/* Risk Filter */}
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
          >
            <option value="All">Risk: All</option>
            <option value="Critical">Critical (75+)</option>
            <option value="Medium">Medium (40-74)</option>
            <option value="Low">Low (&lt;40)</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
          >
            <option value="All">Priority: All</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Standard">Standard</option>
          </select>

          {/* Region Filter */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
          >
            <option value="All">Region: All</option>
            <option value="West Asia">West Asia (Mumbai)</option>
            <option value="East Asia">East Asia (Shanghai)</option>
          </select>

          {/* Carrier Filter */}
          <select
            value={selectedCarrier}
            onChange={(e) => setSelectedCarrier(e.target.value)}
            className="px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
          >
            <option value="All">Carrier: All</option>
            <option value="Maersk">Maersk</option>
            <option value="CMA CGM">CMA CGM</option>
          </select>

          {/* Cold Chain Filter */}
          <select
            value={coldChainFilter}
            onChange={(e) => setColdChainFilter(e.target.value)}
            className="px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
          >
            <option value="All">Cold Chain: All</option>
            <option value="Yes">Cold Chain Only</option>
            <option value="No">Ambient Only</option>
          </select>
        </div>
      </div>

      {/* Main Logistics Intelligence Table */}
      <div className="rounded-xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] shadow-enterprise overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/90 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-3.5">Shipment ID</th>
                <th className="py-3 px-3.5">Origin</th>
                <th className="py-3 px-3.5">Destination</th>
                <th className="py-3 px-3.5">Cargo</th>
                <th className="py-3 px-3.5">Priority</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5 text-right">Risk Score</th>
                <th className="py-3 px-3.5">ETA & Delay</th>
                <th className="py-3 px-3.5">Carrier</th>
                <th className="py-3 px-3.5">Last Updated</th>
                <th className="py-3 px-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredShipments.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400 dark:text-slate-500">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-xs text-slate-700 dark:text-slate-300">No matching container manifests found</p>
                    <button onClick={handleReset} className="mt-2 text-indigo-600 dark:text-cyan-400 hover:underline">
                      Reset Filter Criteria
                    </button>
                  </td>
                </tr>
              ) : (
                filteredShipments.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white font-mono">
                      <Link
                        href={`/app/shipments/${s.id}`}
                        className="hover:text-indigo-600 dark:hover:text-cyan-400 flex items-center gap-1.5"
                      >
                        <span>{s.id}</span>
                        {s.isColdChain && <Thermometer className="w-3.5 h-3.5 text-cyan-500 shrink-0" />}
                      </Link>
                      <div className="text-[10px] text-slate-400 font-normal font-mono">{s.trackingNumber}</div>
                    </td>
                    <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 font-medium">
                      <div className="truncate max-w-[130px]">{s.origin}</div>
                    </td>
                    <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 font-medium">
                      <div className="truncate max-w-[130px]">{s.destination}</div>
                    </td>
                    <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 max-w-[160px] truncate font-medium">
                      {s.cargo}
                    </td>
                    <td className="py-3 px-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          s.priority === 'Critical'
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20'
                            : s.priority === 'High'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20'
                            : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20'
                        }`}
                      >
                        {s.priority}
                      </span>
                    </td>
                    <td className="py-3 px-3.5">
                      <StatusBadge status={s.status} size="sm" />
                    </td>
                    <td className="py-3 px-3.5 text-right font-mono font-bold tabular-nums">
                      <span
                        className={`px-2 py-0.5 rounded text-xs inline-block ${
                          s.riskScore >= 75
                            ? 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30'
                            : s.riskScore >= 45
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {s.riskScore}/100
                      </span>
                    </td>
                    <td className="py-3 px-3.5 font-mono text-[11px]">
                      <div className="text-slate-800 dark:text-slate-200 font-semibold">
                        {new Date(s.eta).toLocaleDateString()}
                      </div>
                      {s.delayHours > 0 ? (
                        <div className="text-rose-600 dark:text-rose-400 text-[10px] font-bold">
                          +{s.delayHours}h delay
                        </div>
                      ) : (
                        <div className="text-emerald-600 dark:text-emerald-400 text-[10px]">On Schedule</div>
                      )}
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-400 truncate max-w-[110px] font-medium">
                      {s.carrier}
                    </td>
                    <td className="py-3 px-3.5 text-slate-400 text-[10px] font-mono">{s.lastUpdated}</td>
                    <td className="py-3 px-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/app/shipments/${s.id}`}
                          className="px-2.5 py-1 rounded-md bg-indigo-600/10 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-cyan-500 text-indigo-600 hover:text-white dark:text-cyan-300 dark:hover:text-slate-950 text-[11px] font-bold transition-all"
                        >
                          View
                        </Link>
                        {s.riskScore >= 70 && (
                          <Link
                            href="/app/routing"
                            className="p-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-300 hover:bg-rose-500/20 border border-rose-500/20"
                            title="Compare Reroute"
                          >
                            <Compass className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

