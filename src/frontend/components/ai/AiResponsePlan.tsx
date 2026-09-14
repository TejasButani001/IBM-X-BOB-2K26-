'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Edit3,
  ChevronRight,
  ShieldAlert,
  RotateCcw,
  Check,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../ui/Button';

export interface ActionPlanItem {
  id: string;
  code: string;
  title: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  affectedEntity: string;
  why: string;
  expectedBenefit: string;
  confidence: number;
  status: 'pending' | 'approved' | 'rejected';
}

const INITIAL_ACTIONS: ActionPlanItem[] = [
  {
    id: 'ACT-01',
    code: 'Action 01',
    title: 'Reroute S101 via Mundra Corridor',
    priority: 'Critical',
    affectedEntity: 'Shipment S101 (VAX-2045 mRNA Therapeutics)',
    why: 'JNPT labor strike adds +77h delay; outer anchorage hold risks thermal runaway.',
    expectedBenefit: 'Saves 71h transit time, preserves $3.4M cargo value.',
    confidence: 96,
    status: 'pending',
  },
  {
    id: 'ACT-02',
    code: 'Action 02',
    title: 'Reroute S103 via Hazira Bypass',
    priority: 'High',
    affectedEntity: 'Shipment S103 (High-Precision Auto Components)',
    why: 'Bypasses congested Mumbai gateway to prevent Pune assembly line shutdown.',
    expectedBenefit: 'Recovers 44h buffer, avoids $180k delay penalty.',
    confidence: 91,
    status: 'pending',
  },
  {
    id: 'ACT-03',
    code: 'Action 03',
    title: 'Redeploy Truck T04 from Ahmedabad',
    priority: 'High',
    affectedEntity: 'Fleet Asset T04 (Volvo FH16 Reefer)',
    why: 'Asset T04 is currently idle at 0% utilization with 18-ton reefer capacity.',
    expectedBenefit: 'Provides instant last-mile drayage from Mundra port.',
    confidence: 94,
    status: 'pending',
  },
  {
    id: 'ACT-04',
    code: 'Action 04',
    title: 'Inspect VAX-2045 Cold-Chain Telemetry',
    priority: 'Critical',
    affectedEntity: 'Container VAX-2045 (Genset Sensor #904)',
    why: 'Temperature reached +10.0°C for 47 mins during container transshipment.',
    expectedBenefit: 'Enforces quality audit before carrier handoff.',
    confidence: 98,
    status: 'pending',
  },
];

const WORKFLOW_STEPS = [
  '1. Detecting disruption impact',
  '2. Identifying affected shipments',
  '3. Calculating route alternatives',
  '4. Checking carrier capacity',
  '5. Matching idle fleet',
  '6. Checking cold-chain exposure',
  '7. Prioritising actions',
];

interface AiResponsePlanProps {
  onActionApproved?: (actionId: string) => void;
  className?: string;
}

export const AiResponsePlan: React.FC<AiResponsePlanProps> = ({
  onActionApproved,
  className = '',
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [hasGenerated, setHasGenerated] = useState(true);
  const [actions, setActions] = useState<ActionPlanItem[]>(INITIAL_ACTIONS);
  const [editingActionId, setEditingActionId] = useState<string | null>(null);

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setCurrentStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < WORKFLOW_STEPS.length) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setHasGenerated(true);
      }
    }, 400);
  };

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    setActions((prev) =>
      prev.map((act) => (act.id === id ? { ...act, status: newStatus } : act))
    );
    if (newStatus === 'approved' && onActionApproved) {
      onActionApproved(id);
    }
  };

  return (
    <div className={`p-5 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 border border-slate-800 text-xs shadow-2xl space-y-5 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white text-base">FluxChain AI Operational Response Plan</h3>
          </div>
          <p className="text-slate-400 text-xs mt-0.5">
            Autonomous multi-agent orchestration for disruption mitigation and fleet dispatch.
          </p>
        </div>

        <button
          onClick={handleGeneratePlan}
          disabled={isGenerating}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Synthesizing Workflow...' : 'Generate Response Plan'}</span>
        </button>
      </div>

      {/* Step-by-Step AI Workflow Simulator */}
      {isGenerating && (
        <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/50 space-y-3">
          <div className="flex items-center justify-between text-xs text-indigo-300 font-mono font-bold">
            <span>Executing Decision Matrix Pipeline</span>
            <span>{currentStepIndex + 1} / {WORKFLOW_STEPS.length}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {WORKFLOW_STEPS.map((stepText, idx) => {
              const isActive = idx === currentStepIndex;
              const isDone = idx < currentStepIndex;
              return (
                <div
                  key={idx}
                  className={`p-2 rounded border text-[11px] font-mono transition-all ${
                    isDone
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400'
                      : isActive
                      ? 'bg-indigo-950/80 border-indigo-500 text-white font-bold animate-pulse'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500'
                  }`}
                >
                  {stepText}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommended Response Plan Cards */}
      {hasGenerated && !isGenerating && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase font-bold text-slate-400 tracking-wider">
              RECOMMENDED RESPONSE PLAN ({actions.filter((a) => a.status === 'approved').length}/{actions.length} Approved)
            </span>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              Confidence Index: 95%
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {actions.map((act) => {
              const isApproved = act.status === 'approved';
              const isRejected = act.status === 'rejected';
              const isCritical = act.priority === 'Critical';

              return (
                <div
                  key={act.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isApproved
                      ? 'bg-emerald-950/20 border-emerald-800/60'
                      : isRejected
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                      : isCritical
                      ? 'bg-slate-950 border-rose-900/50 hover:border-rose-700/60'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-slate-400 text-xs">{act.code}</span>
                      <h4 className="font-bold text-white text-sm">{act.title}</h4>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                          isCritical
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {act.priority}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[11px] text-indigo-400 font-bold">
                        {act.confidence}% Confidence
                      </span>
                      {isApproved && (
                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-[11px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {isRejected && (
                        <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono text-[11px]">
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-3">
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-0.5">
                        Target Entity
                      </span>
                      <span className="text-slate-200 font-medium">{act.affectedEntity}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-0.5">
                        Expected Benefit
                      </span>
                      <span className="text-emerald-400 font-medium">{act.expectedBenefit}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed mb-3">
                    <strong className="text-slate-300">Why:</strong> {act.why}
                  </p>

                  {/* Action Controls */}
                  {act.status === 'pending' && (
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-900">
                      <button
                        onClick={() => handleStatusChange(act.id, 'rejected')}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-800 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(act.id, 'approved')}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Action</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
