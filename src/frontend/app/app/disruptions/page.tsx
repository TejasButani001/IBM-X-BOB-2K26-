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
  Plus,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

export default function DisruptionsPage() {
  const { disruptions, triggerMumbaiStrike } = useControlTower();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredDisruptions = disruptions.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || d.status === selectedStatus;
    const matchesType = selectedType === 'All' || d.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredDisruptions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'disruptions_report.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Disruption Intelligence Center"
        subtitle="Real-time multi-hazard tracking across global marine ports, canal choke points, weather systems, and land corridors."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Disruptions' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExport}
            >
              Export Data
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={AlertTriangle}
              onClick={triggerMumbaiStrike}
            >
              Simulate Port Strike
            </Button>
          </div>
        }
      />

      {/* Filter & Search Bar */}
      <div className="p-3 sm:p-3.5 rounded-lg bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by ID (D001), location, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Tabs */}
          <div className="flex rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-0.5">
            {['All', 'Active', 'Monitoring', 'Resolved'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Type Dropdown */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-2.5 py-1.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 text-xs"
          >
            <option value="All">All Types</option>
            <option value="Port Strike">Port Strike</option>
            <option value="Weather">Weather</option>
            <option value="Geopolitical">Geopolitical</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Carrier">Carrier</option>
          </select>
        </div>
      </div>

      {/* Disruptions Data Table */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B101D] overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[640px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 bg-slate-50 dark:bg-slate-950/90 backdrop-blur-sm text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 z-10">
              <tr>
                <th className="py-2.5 px-3">Disruption ID & Title</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3 text-right">Cascade Risk</th>
                <th className="py-2.5 px-3 text-right">Affected Cargo</th>
                <th className="py-2.5 px-3">Expected End</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredDisruptions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No disruptions match the selected search criteria.
                  </td>
                </tr>
              ) : (
                filteredDisruptions.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <Link
                        href={`/app/disruptions/${d.id}`}
                        className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5"
                      >
                        <span className="font-mono text-indigo-600 dark:text-indigo-400">{d.id}:</span>
                        <span>{d.name}</span>
                      </Link>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 max-w-md">
                        {d.description}
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px] border border-slate-200 dark:border-slate-700">
                        {d.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-medium">{d.location}</td>
                    <td className="py-2.5 px-3">
                      <RiskBadge severity={d.severity} />
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                      {d.cascadeRiskScore}/100
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {d.affectedShipmentIds.length}
                      </span>{' '}
                      <span className="text-slate-500 dark:text-slate-400 text-[11px]">units</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 font-mono text-[11px] tabular-nums">
                      {d.expectedEnd ? new Date(d.expectedEnd).toLocaleDateString() : 'Indefinite'}
                    </td>
                    <td className="py-2.5 px-3">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <Link
                        href={`/app/disruptions/${d.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3 h-3" />
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
