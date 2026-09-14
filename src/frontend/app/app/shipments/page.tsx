'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { RiskBadge } from '../../../components/ui/RiskBadge';
import { Button } from '../../../components/ui/Button';
import {
  Search,
  Download,
  Thermometer,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export default function ShipmentsPage() {
  const { shipments } = useControlTower();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [coldChainOnly, setColdChainOnly] = useState(false);
  const [disruptedOnly, setDisruptedOnly] = useState(false);

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.cargo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.carrier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || s.priority === selectedPriority;
    const matchesColdChain = !coldChainOnly || s.isColdChain;
    const matchesDisrupted = !disruptedOnly || Boolean(s.disruptionId);

    return matchesSearch && matchesStatus && matchesPriority && matchesColdChain && matchesDisrupted;
  });

  const handleExport = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(filteredShipments, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'shipments_manifest.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Shipment Registry & Multimodal Tracking"
        subtitle="Global active container manifests, temperature-monitored consignments, and disruption exposure scoring."
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

      {/* Multi-Faceted Filter & Search Bar */}
      <div className="p-3.5 sm:p-4 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200/90 dark:border-slate-800/80 shadow-enterprise space-y-3 text-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by ID (S101), cargo, carrier, origin or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Status Selector */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="On Time">On Time</option>
              <option value="In Transit">In Transit</option>
              <option value="Delayed">Delayed</option>
              <option value="At Risk">At Risk</option>
              <option value="Disrupted">Disrupted</option>
              <option value="Held">Held</option>
              <option value="Delivered">Delivered</option>
            </select>

            {/* Priority Selector */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-2.5 py-1.5 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical Priority</option>
              <option value="High">High Priority</option>
              <option value="Standard">Standard Priority</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Toggles */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex-wrap">
          <button
            type="button"
            onClick={() => setColdChainOnly(!coldChainOnly)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              coldChainOnly
                ? 'bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60'
                : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>Cold-Chain Telemetry Only</span>
          </button>

          <button
            type="button"
            onClick={() => setDisruptedOnly(!disruptedOnly)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              disruptedOnly
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60'
                : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>Disruption Exposed Only</span>
          </button>

          {(coldChainOnly ||
            disruptedOnly ||
            selectedStatus !== 'All' ||
            selectedPriority !== 'All' ||
            searchQuery) && (
            <button
              onClick={() => {
                setColdChainOnly(false);
                setDisruptedOnly(false);
                setSelectedStatus('All');
                setSelectedPriority('All');
                setSearchQuery('');
              }}
              className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium ml-auto flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Enterprise Data Table */}
      <div className="rounded-lg border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] shadow-enterprise overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/90 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
              <tr>
                <th className="py-2.5 px-3">Shipment ID</th>
                <th className="py-2.5 px-3">Route</th>
                <th className="py-2.5 px-3">Cargo Description</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Risk Score</th>
                <th className="py-2.5 px-3">ETA</th>
                <th className="py-2.5 px-3">Carrier</th>
                <th className="py-2.5 px-3 text-right">Temperature</th>
                <th className="py-2.5 px-3">Updated</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredShipments.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-400 dark:text-slate-500">
                    No shipments match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredShipments.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white font-mono">
                      <Link
                        href={`/app/shipments/${s.id}`}
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
                      >
                        <span>{s.id}</span>
                        {s.isColdChain && <Thermometer className="w-3.5 h-3.5 text-orange-500 shrink-0" />}
                      </Link>
                      <div className="text-[10px] text-slate-400 font-normal">{s.trackingNumber}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                      <div className="truncate max-w-[140px] font-medium">{s.origin}</div>
                      <div className="truncate max-w-[140px] text-[10px] text-slate-400">→ {s.destination}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 max-w-[180px] truncate">
                      {s.cargo}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${
                          s.priority === 'Critical'
                            ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50'
                            : s.priority === 'High'
                            ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {s.priority}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <StatusBadge status={s.status} size="sm" />
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold tabular-nums">
                      <span
                        className={
                          s.riskScore >= 75
                            ? 'text-rose-600 dark:text-rose-400'
                            : s.riskScore >= 50
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }
                      >
                        {s.riskScore}/100
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                      <div>{new Date(s.eta).toLocaleDateString()}</div>
                      {s.delayHours > 0 && (
                        <div className="text-amber-600 dark:text-amber-400 text-[10px] font-semibold">
                          +{s.delayHours}h delay
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 truncate max-w-[110px]">
                      {s.carrier}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {s.isColdChain ? (
                        <Link
                          href={`/app/cold-chain/${s.coldChainId || 'VAX-2045'}`}
                          className={`font-mono text-[11px] font-bold tabular-nums inline-flex items-center gap-1 ${
                            s.temperature && s.temperature > 8.0
                              ? 'text-rose-600 dark:text-rose-400 animate-pulse'
                              : 'text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          <Thermometer className="w-3 h-3" />
                          <span>{s.temperature}°C</span>
                        </Link>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-600 font-mono">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 text-[10px] font-mono">{s.lastUpdated}</td>
                    <td className="py-2.5 px-3 text-right">
                      <Link
                        href={`/app/shipments/${s.id}`}
                        className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-medium transition-colors"
                      >
                        View
                      </Link>
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

