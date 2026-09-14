'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import { MetricCard } from '../../../components/ui/MetricCard';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { Button } from '../../../components/ui/Button';
import {
  Truck,
  Anchor,
  Box,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  X,
  Zap,
  BarChart3,
  RefreshCw,
  Compass,
} from 'lucide-react';

export default function FleetPage() {
  const { fleet, metrics, redeployAsset, shipments } = useControlTower();

  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedShipmentForMatch, setSelectedShipmentForMatch] = useState('S101');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const trucks = fleet.filter((f) => f.type === 'Truck');
  const containers = fleet.filter((f) => f.type === 'Container');
  const vessels = fleet.filter((f) => f.type === 'Vessel');

  const activeCount = fleet.filter((f) => f.status === 'Active').length;
  const availableCount = fleet.filter((f) => f.status === 'Available').length;
  const idleCount = fleet.filter((f) => f.status === 'Idle').length;
  const maintenanceCount = fleet.filter((f) => f.status === 'Maintenance').length;
  const idleAssetsList = fleet.filter((f) => f.status === 'Idle');

  const selectedAsset = fleet.find((f) => f.id === selectedAssetId) || idleAssetsList[0] || fleet[0];

  const handleOpenRedeployDrawer = (assetId: string) => {
    setSelectedAssetId(assetId);
    setIsDrawerOpen(true);
  };

  const handleConfirmRedeployment = () => {
    if (selectedAsset) {
      redeployAsset(selectedAsset.id, 'Ahmedabad → Mundra Port → Mumbai Bypass');
      setIsDrawerOpen(false);
      setToastMessage(`✓ Asset ${selectedAsset.id} (${selectedAsset.name}) Redeployed! Status changed to Active (82% projected utilisation).`);
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-emerald-900 text-white border border-emerald-500 shadow-2xl flex items-center gap-3 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <PageHeader
        title="Fleet Utilisation Optimizer & Telematics"
        subtitle="Real-time multi-asset telematics across prime movers, reefer containers, and coastal feeder vessels."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Fleet Optimization' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/app/fleet/assets">
              <Button variant="secondary" size="sm">
                Asset Registry ({fleet.length})
              </Button>
            </Link>
            <Link href="/app/fleet/redeployment">
              <Button variant="primary" size="sm" icon={Sparkles}>
                AI Match Engine ({idleCount} Idle)
              </Button>
            </Link>
          </div>
        }
      />

      {/* FLEET OVERVIEW KPIS (6 metrics) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <MetricCard label="Total Assets" value={fleet.length} icon={Layers} />
        <MetricCard label="Active Assets" value={activeCount} icon={Activity} variant="healthy" />
        <MetricCard label="Available" value={availableCount} icon={Truck} variant="info" />
        <MetricCard
          label="Idle Capacity"
          value={idleCount}
          subValue="redeployment pool"
          icon={Truck}
          variant="warning"
        />
        <MetricCard label="Maintenance" value={maintenanceCount} icon={Activity} />
        <MetricCard
          label="Avg Utilisation"
          value={`${metrics.fleetUtilisationPercent}%`}
          icon={TrendingUp}
          variant="info"
          change="+14% target"
        />
      </div>

      {/* VISUALS & REGIONAL CAPACITY BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Utilisation Trend */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Utilisation Trend & Capacity Gauge
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{metrics.fleetUtilisationPercent}%</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400">Active Utilised Capacity</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeCount} / {fleet.length} Units</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
              <div className="h-full bg-indigo-600" style={{ width: `${(activeCount / fleet.length) * 100}%` }} />
              <div className="h-full bg-emerald-500" style={{ width: `${(availableCount / fleet.length) * 100}%` }} />
              <div className="h-full bg-amber-500" style={{ width: `${(idleCount / fleet.length) * 100}%` }} />
              <div className="h-full bg-slate-400" style={{ width: `${(maintenanceCount / fleet.length) * 100}%` }} />
            </div>
            <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-slate-400 pt-1 text-center">
              <span className="text-indigo-600 font-bold">Active ({activeCount})</span>
              <span className="text-emerald-600 font-bold">Avail ({availableCount})</span>
              <span className="text-amber-600 font-bold">Idle ({idleCount})</span>
              <span>Maint ({maintenanceCount})</span>
            </div>
          </div>
        </div>

        {/* Regional Capacity Distribution */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Regional Capacity Balance
            </span>
            <span className="font-mono text-[10px] text-slate-400">3 Hub Regions</span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <strong className="text-slate-800 dark:text-slate-200 block">Gujarat & Western Corridor</strong>
                <span className="text-[10px] text-slate-400">Ahmedabad, Mundra, Vadodara</span>
              </div>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">3 Idle Units</span>
            </div>
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <strong className="text-slate-800 dark:text-slate-200 block">Maharashtra Port Hub</strong>
                <span className="text-[10px] text-slate-400">Mumbai, Nhava Sheva (JNPT)</span>
              </div>
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">1 Disrupted Unit</span>
            </div>
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <strong className="text-slate-800 dark:text-slate-200 block">Southeast Asia Transshipment</strong>
                <span className="text-[10px] text-slate-400">Singapore Feeder Basin</span>
              </div>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">1 Idle Vessel</span>
            </div>
          </div>
        </div>

        {/* AI Redeployment Spotlight */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/50 dark:from-[#0B1024] dark:via-[#090E1A] dark:to-[#0C132B] border border-indigo-200 dark:border-indigo-900/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-900/40 pb-2">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              AI Asset Match Spotlight
            </span>
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200">
              94% Match
            </span>
          </div>

          <div className="space-y-1">
            <strong className="text-slate-900 dark:text-white block text-sm">Truck T04 (Scania R500 Reefer)</strong>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              18.0T multi-temperature reefer idle in Ahmedabad for 19.5 hours. Recommended for S101 biologics transfer at Mundra quay.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            className="w-full"
            onClick={() => handleOpenRedeployDrawer('T04')}
          >
            Redeploy Truck T04
          </Button>
        </div>
      </div>

      {/* FLEET MAP: INTERACTIVE ASSET LOCATIONS & VISUAL STATES */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Interactive Telematics Map & Asset State Grid
            </h3>
          </div>
          {/* Visual Legend */}
          <div className="flex items-center gap-3 text-[10px] font-mono flex-wrap">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Active
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Idle / Low Util
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Disrupted
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Maintenance
            </span>
          </div>
        </div>

        {/* Telematics Asset Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {fleet.map((asset) => {
            let stateColor = 'bg-blue-500';
            let borderColor = 'border-blue-200 dark:border-blue-900/50';
            if (asset.status === 'Available') {
              stateColor = 'bg-emerald-500';
              borderColor = 'border-emerald-200 dark:border-emerald-900/50';
            } else if (asset.status === 'Idle') {
              stateColor = 'bg-amber-500';
              borderColor = 'border-amber-200 dark:border-amber-900/50';
            } else if ((asset.status as string) === 'Disrupted') {
              stateColor = 'bg-rose-500';
              borderColor = 'border-rose-200 dark:border-rose-900/50';
            } else if (asset.status === 'Maintenance') {
              stateColor = 'bg-slate-400';
              borderColor = 'border-slate-200 dark:border-slate-800';
            }

            return (
              <div
                key={asset.id}
                className={`p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border ${borderColor} space-y-2 transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${stateColor} shrink-0`} />
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{asset.id}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{asset.type}</span>
                </div>

                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{asset.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>{asset.location}</span>
                    <span className="font-mono">{asset.capacityTons}T</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800/80 text-[10px]">
                  <StatusBadge status={asset.status} size="sm" />
                  {asset.status === 'Idle' && (
                    <button
                      onClick={() => handleOpenRedeployDrawer(asset.id)}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                    >
                      Redeploy →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* IDLE ASSET VIEW & BEST MATCHES */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Idle Asset Pool & Route Match Matrix ({idleCount} Assets)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">0% Active Utilisation Standby</span>
        </div>

        <div className="overflow-x-auto max-h-[400px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 bg-slate-50 dark:bg-slate-950/90 backdrop-blur-sm text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 z-10">
              <tr>
                <th className="py-2.5 px-3">Asset ID</th>
                <th className="py-2.5 px-3">Asset Name & Type</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3 text-right">Capacity</th>
                <th className="py-2.5 px-3 text-right">Idle Hours</th>
                <th className="py-2.5 px-3">Compatible Routes</th>
                <th className="py-2.5 px-3 text-right">Match Score</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {idleAssetsList.map((asset) => {
                const isT04 = asset.id === 'T04';

                return (
                  <tr key={asset.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">{asset.id}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {asset.name}
                      <span className="text-[10px] text-slate-400 block font-normal">{asset.type} • {asset.hasReefer ? 'Active Reefer' : 'Dry Cargo'}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{asset.location}</td>
                    <td className="py-2.5 px-3 font-mono text-right font-semibold tabular-nums">{asset.capacityTons}T</td>
                    <td className="py-2.5 px-3 font-mono text-amber-600 dark:text-amber-400 text-right font-bold tabular-nums">
                      {asset.idleDurationHours}h
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                      {isT04 ? 'Mundra → Mumbai Cold-Chain Bypass' : 'Hazira → Pune Expressway Shuttle'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {isT04 ? '94%' : '88%'}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <Button
                        variant="primary"
                        size="xs"
                        onClick={() => handleOpenRedeployDrawer(asset.id)}
                      >
                        Redeploy
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* REDEPLOYMENT CONFIRMATION DRAWER / MODAL */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white dark:bg-[#0B101D] border border-indigo-200 dark:border-indigo-900/80 shadow-2xl p-6 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Authorize Asset Redeployment & Dispatch
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Target Asset: <strong className="text-indigo-600 dark:text-indigo-400 font-mono">{selectedAsset.id} ({selectedAsset.name})</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Affected Shipment Selector */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300 block uppercase font-mono text-[11px]">
                Target Affected Shipment Match
              </label>
              <select
                value={selectedShipmentForMatch}
                onChange={(e) => setSelectedShipmentForMatch(e.target.value)}
                className="w-full p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-medium text-xs"
              >
                <option value="S101">Shipment S101: VAX-2045 Biologics (Shanghai → Mundra Quay Transfer)</option>
                <option value="S103">Shipment S103: Automotive Microcontrollers (Hazira Terminal Transfer)</option>
              </select>
            </div>

            {/* Best Asset Match Explanation */}
            <div className="p-3.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 dark:text-white">BEST ASSET MATCH RECOMMENDATION</strong>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 border border-emerald-200">
                  94% MATCH SCORE
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                &ldquo;Recommended because {selectedAsset.name} is an 18T multi-temperature reefer staged in {selectedAsset.location}, 320km from Mundra quay, with 0% current utilisation and cryogenic capability required for {selectedShipmentForMatch}.&rdquo;
              </p>
            </div>

            {/* BEFORE / AFTER UTILISATION COMPARISON BOX */}
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <div className="font-bold text-slate-900 dark:text-white uppercase font-mono text-[11px]">
                Utilisation & Operational Impact Simulation
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">BEFORE REDEPLOYMENT</span>
                  <div className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400">0% Utilisation</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">19.5 hours unproductive idle in depot.</p>
                </div>

                <div className="p-3 rounded-md bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block uppercase font-bold">AFTER REDEPLOYMENT</span>
                  <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">82% Projected Utilisation</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Active revenue corridor & zero spoilage transfer.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2 text-xs">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsDrawerOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle2}
                onClick={handleConfirmRedeployment}
              >
                Confirm Redeployment & Dispatch
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
