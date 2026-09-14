'use client';

import React, { useState } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import {
  PlugZap,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Cpu,
  Database,
  Radio,
  CloudSun,
  Anchor,
  Truck,
} from 'lucide-react';

interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  status: 'Connected' | 'Syncing' | 'Not Connected';
  lastSync: string;
  latencyMs: number;
  description: string;
  icon: any;
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>([
    {
      id: 'INT-01',
      name: 'IBM watsonx.ai Granite 3.0',
      category: 'Foundation AI Engine',
      status: 'Connected',
      lastSync: '12 seconds ago',
      latencyMs: 140,
      description: 'Powers cascading disruption prediction, multi-criteria alternative route optimization, and operational copilot reasoning.',
      icon: Cpu,
    },
    {
      id: 'INT-02',
      name: 'IBM Instana Observability',
      category: 'APM & Telemetry Pipeline',
      status: 'Connected',
      lastSync: '45 seconds ago',
      latencyMs: 42,
      description: 'End-to-end distributed tracing across microservices, EDI ingestion queues, and satellite link health.',
      icon: Database,
    },
    {
      id: 'INT-03',
      name: 'Satellite AIS Vessel Fleet Feed (Spire Maritime)',
      category: 'Vessel Tracking',
      status: 'Connected',
      lastSync: '1 min ago',
      latencyMs: 85,
      description: 'Real-time oceanic vessel transponder telemetry, dead-reckoning speed, and harbor pilot approach statuses.',
      icon: Anchor,
    },
    {
      id: 'INT-04',
      name: 'Cold-Chain IoT BLE & Cellular Thermocouples',
      category: 'Sensor Telemetry',
      status: 'Connected',
      lastSync: '3 mins ago',
      latencyMs: 110,
      description: 'Ingests active reefer unit internal temperature, compressor RPM, auxiliary fuel levels, and battery states.',
      icon: Radio,
    },
    {
      id: 'INT-05',
      name: 'Global Weather & Cyclone Radar (NOAA / ECMWF)',
      category: 'Weather Intelligence',
      status: 'Syncing',
      lastSync: 'Syncing now...',
      latencyMs: 320,
      description: 'Typhoon wind radii, ocean wave swell charts, and gale warning polygons updated every 15 minutes.',
      icon: CloudSun,
    },
    {
      id: 'INT-06',
      name: 'Highway Prime Mover Telematics (Scania / Volvo FMS)',
      category: 'Fleet Management',
      status: 'Connected',
      lastSync: '2 mins ago',
      latencyMs: 65,
      description: 'GPS coordinate stream, tachograph driver duty remaining, odometer, and reefer compressor run hours.',
      icon: Truck,
    },
    {
      id: 'INT-07',
      name: 'Port Community & Customs EDI Gateway (PCS / Portnet)',
      category: 'Marine Terminal Feeds',
      status: 'Connected',
      lastSync: '5 mins ago',
      latencyMs: 280,
      description: 'Berth schedule updates, crane productivity rates, dock strike declarations, and customs green channel clearances.',
      icon: Anchor,
    },
    {
      id: 'INT-08',
      name: 'SAP S/4HANA & Oracle TMS Connector',
      category: 'Enterprise ERP',
      status: 'Not Connected',
      lastSync: 'Never',
      latencyMs: 0,
      description: 'Bidirectional sync of commercial orders, bill of lading line items, customer delivery SLAs, and purchase requisitions.',
      icon: PlugZap,
    },
  ]);

  const toggleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'Connected' ? 'Not Connected' : 'Connected';
          return {
            ...item,
            status: nextStatus,
            lastSync: nextStatus === 'Connected' ? 'Just now' : 'Never',
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Data Connectors & Integrations"
        subtitle="Ingestion feeds from IBM AI, APM telemetry, oceanic AIS satellite tracking, carrier EDI, and IoT thermocouples."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Integrations' },
        ]}
      />

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        {integrations.map((item) => {
          const Icon = item.icon;
          const isConnected = item.status === 'Connected';
          const isSyncing = item.status === 'Syncing';

          return (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{item.name}</h3>
                      <span className="text-[11px] font-mono text-slate-400">{item.category}</span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] border uppercase ${
                      isConnected
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50'
                        : isSyncing
                        ? 'bg-blue-950/60 text-blue-400 border-blue-800/50 animate-pulse'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isConnected ? 'bg-emerald-400' : isSyncing ? 'bg-blue-400' : 'bg-slate-500'
                      }`}
                    />
                    {item.status}
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed text-xs">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span>Last Sync: <strong className="text-slate-200">{item.lastSync}</strong></span>
                  {isConnected && (
                    <span>Latency: <strong className="text-emerald-400">{item.latencyMs}ms</strong></span>
                  )}
                </div>

                <button
                  onClick={() => toggleConnect(item.id)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    isConnected
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {isConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
