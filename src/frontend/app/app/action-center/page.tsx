'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import {
  CheckCircle2,
  Sparkles,
  Compass,
  Truck,
  Thermometer,
  CheckSquare,
} from 'lucide-react';

export default function ActionCenterPage() {
  const { actionPlan, approveAction, approveAllImmediateActions } = useControlTower();
  const [selectedTab, setSelectedTab] = useState<string>('All');

  const filteredActions = actionPlan.filter((a) => {
    if (selectedTab === 'Immediate') return a.priority === 'Immediate';
    if (selectedTab === 'Recommended') return a.priority === 'Recommended';
    if (selectedTab === 'Pending') return a.status === 'Pending Approval';
    if (selectedTab === 'Approved') return a.status === 'Approved';
    return true;
  });

  const pendingImmediate = actionPlan.filter(
    (a) => a.priority === 'Immediate' && a.status === 'Pending Approval'
  ).length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Centralized Action Execution Center"
        subtitle="Review, authorize, and transmit AI-synthesized operational mitigation orders to carriers and fleet dispatchers."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'Action Center' },
        ]}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={CheckSquare}
            onClick={approveAllImmediateActions}
            disabled={pendingImmediate === 0}
          >
            Approve All Immediate Actions ({pendingImmediate})
          </Button>
        }
      />

      {/* Filter Tabs */}
      <div className="flex rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-0.5 max-w-md text-xs shadow-xs">
        {['All', 'Immediate', 'Recommended', 'Pending', 'Approved'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`flex-1 py-1 rounded text-xs font-medium transition-colors ${
              selectedTab === tab
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Action Items List */}
      <div className="space-y-3.5">
        {filteredActions.map((action) => {
          let Icon = Sparkles;
          if (action.category === 'Reroute') Icon = Compass;
          if (action.category === 'Redeploy') Icon = Truck;
          if (action.category === 'Cold-Chain') Icon = Thermometer;

          const isApproved = action.status === 'Approved';

          return (
            <div
              key={action.id}
              className={`p-4 rounded-lg border transition-all text-xs space-y-3 shadow-sm ${
                isApproved
                  ? 'bg-slate-50/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-80'
                  : action.priority === 'Immediate'
                  ? 'bg-white dark:bg-[#0B101D] border-indigo-300 dark:border-indigo-500/60 shadow-indigo-500/5'
                  : 'bg-white dark:bg-[#0B101D] border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-md shrink-0 ${
                      action.category === 'Cold-Chain'
                        ? 'bg-orange-50 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60'
                        : action.category === 'Redeploy'
                        ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60'
                        : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{action.id}</span>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">{action.title}</h3>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-bold ${
                          action.priority === 'Immediate'
                            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60'
                            : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
                        }`}
                      >
                        {action.priority}
                      </span>
                      <span className="text-[10px] font-mono text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/50">
                        {action.confidence}% AI Confidence
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed max-w-3xl">
                      {action.reason}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  <span
                    className={`px-2.5 py-1 rounded-full font-mono text-xs font-semibold ${
                      isApproved
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                        : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                    }`}
                  >
                    {action.status}
                  </span>

                  {!isApproved && (
                    <Button
                      variant="primary"
                      size="sm"
                      icon={CheckCircle2}
                      onClick={() => approveAction(action.id)}
                    >
                      Approve
                    </Button>
                  )}
                </div>
              </div>

              {/* Action Execution Details and Owner Bar */}
              <div className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 dark:text-slate-500 font-mono font-semibold">PAYLOAD:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-mono truncate max-w-xl">{action.details}</span>
                </div>
                <div className="shrink-0">
                  <span>Assigned Owner: </span>
                  <strong className="text-slate-800 dark:text-slate-200 font-semibold">{action.owner}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
