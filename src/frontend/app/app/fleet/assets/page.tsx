'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../../context/ControlTowerContext';
import { PageHeader } from '../../../../components/ui/PageHeader';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import {
  Truck,
  Search,
  Filter,
  Download,
  Sparkles,
  ChevronRight,
  Shield,
  Layers,
} from 'lucide-react';
import { AssetType, AssetStatus } from '../../../../types';

export default function FleetAssetsPage() {
  const { fleet, redeployAsset } = useControlTower();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredAssets = fleet.filter((a) => {
    const matchesSearch =
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || a.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || a.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fleet Asset Registry"
        subtitle="Comprehensive status, capacity, and telemetry for all prime movers, reefer chassis, and feeder vessels."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Fleet', href: '/app/fleet' },
          { label: 'Asset Registry' },
        ]}
        actions={
          <Link
            href="/app/fleet/redeployment"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Redeployment Matcher</span>
          </Link>
        }
      />

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by asset ID (T04), model, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Types</option>
            <option value="Truck">Trucks Only</option>
            <option value="Container">Containers Only</option>
            <option value="Vessel">Vessels Only</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Available">Available</option>
            <option value="Idle">Idle (Redeployable)</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Assets Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-medium border-b border-slate-800">
              <tr>
                <th className="p-3.5">Asset ID</th>
                <th className="p-3.5">Type & Model</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Payload Capacity</th>
                <th className="p-3.5">Reefer</th>
                <th className="p-3.5">Utilisation</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Available From</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  className={`hover:bg-slate-800/30 transition-colors ${
                    asset.status === 'Idle' ? 'bg-amber-950/10' : ''
                  }`}
                >
                  <td className="p-3.5 font-bold text-white font-mono">{asset.id}</td>
                  <td className="p-3.5 text-slate-300">
                    <div className="font-semibold text-white">{asset.name}</div>
                    <div className="text-[11px] text-slate-400">{asset.model}</div>
                  </td>
                  <td className="p-3.5 text-slate-300">{asset.location}</td>
                  <td className="p-3.5 font-mono text-slate-200">{asset.capacityTons} Tons</td>
                  <td className="p-3.5">
                    {asset.hasReefer ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/50">
                        Reefer
                      </span>
                    ) : (
                      <span className="text-slate-500 font-mono text-[10px]">Dry</span>
                    )}
                  </td>
                  <td className="p-3.5 font-mono font-bold">
                    <span
                      className={
                        asset.utilisation === 0
                          ? 'text-amber-400'
                          : asset.utilisation >= 75
                          ? 'text-emerald-400'
                          : 'text-slate-300'
                      }
                    >
                      {asset.utilisation}%
                    </span>
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={asset.status} />
                  </td>
                  <td className="p-3.5 text-slate-400 text-[11px] font-mono">{asset.availableFrom}</td>
                  <td className="p-3.5 text-right">
                    {asset.status === 'Idle' ? (
                      <button
                        onClick={() => redeployAsset(asset.id)}
                        className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors"
                      >
                        Redeploy
                      </button>
                    ) : (
                      <span className="text-slate-600 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
