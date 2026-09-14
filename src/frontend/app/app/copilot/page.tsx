'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useControlTower } from '../../../context/ControlTowerContext';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { bobClient, BobCopilotResponse } from '../../../services/ai/bobClient';
import {
  Bot,
  Send,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content?: string;
  structured?: BobCopilotResponse;
  timestamp: string;
}

export default function CopilotPage() {
  const {
    metrics,
    disruptions,
    shipments,
    rerouteShipment,
    redeployAsset,
  } = useControlTower();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      timestamp: '10:00 AM',
      structured: {
        summary:
          'FluxChain AI Operations Copilot is online and monitoring 10 global disruptions, 50 shipments, and 20 fleet assets.',
        evidence: [
          'D001 (Mumbai Port Strike) is active and causing 77-hour dwell surge on 18 shipments.',
          'Reefer container VAX-2045 has breached 8.0°C safety band for 47 cumulative minutes.',
          'Truck T04 (18T Reefer) in Ahmedabad has been idle for 19.5 hours (94% corridor match).',
        ],
        impact:
          'Overall network health is reduced to 74%. Without intervention, cold-chain cargo loss will reach $3.4M by 15:00 UTC.',
        recommendation:
          'Divert S101 to Mundra Port, mobilize Truck T04 from Ahmedabad to Mundra, and deploy emergency dry-ice stabilization.',
        action: 'Approve Immediate Response Plan',
        actionPayload: { type: 'reroute', targetId: 'S101' },
      },
    },
  ]);

  const suggestedPrompts = [
    'What should I do first?',
    'Which shipments are affected by the Mumbai disruption?',
    'Which idle assets should we redeploy?',
    'Show critical cold-chain excursions.',
    'Find the best alternate route for S101.',
    'What is our biggest operational risk right now?',
  ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await bobClient.answerCopilotQuestion(textToSend, {
        metrics,
        disruptions,
        shipments,
      });

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        structured: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteAction = (actionPayload?: { type: string; targetId: string }) => {
    if (!actionPayload) return;
    if (actionPayload.type === 'reroute') {
      rerouteShipment(actionPayload.targetId, 'R-ALT-01');
      alert(`Action Authorized: Shipment ${actionPayload.targetId} rerouted via Mundra Port.`);
    } else if (actionPayload.type === 'redeploy') {
      redeployAsset(actionPayload.targetId);
      alert(`Action Authorized: Fleet Asset ${actionPayload.targetId} redeployed.`);
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Bob AI Operations Copilot"
        subtitle="Conversational operational decision support grounded in live network telemetry and IBM Bob AI reasoning models."
        breadcrumbs={[
          { label: 'Control Tower', href: '/app/overview' },
          { label: 'AI Copilot' },
        ]}
        badge={
          <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Bob Granite 3.0 Operational Engine Active
          </span>
        }
      />

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[calc(100vh-210px)] min-h-[600px]">
        {/* Left 2 Cols: Chat Window */}
        <div className="lg:col-span-2 rounded-lg border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] flex flex-col overflow-hidden shadow-enterprise">
          {/* Chat Messages Scrollable Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl rounded-lg p-3.5 space-y-2.5 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-50 dark:bg-[#080C16] border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {msg.content && <p className="leading-relaxed text-xs sm:text-sm">{msg.content}</p>}

                  {msg.structured && (
                    <div className="space-y-3">
                      {/* Summary */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-bold tracking-wider">
                          Executive Summary
                        </span>
                        <p className="font-semibold text-slate-900 dark:text-white leading-snug text-xs sm:text-sm">
                          {msg.structured.summary}
                        </p>
                      </div>

                      {/* Evidence */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                          Telemetry Evidence
                        </span>
                        <div className="space-y-1 pl-2 border-l-2 border-slate-300 dark:border-slate-700">
                          {msg.structured.evidence.map((ev, idx) => (
                            <div key={idx} className="text-slate-600 dark:text-slate-300 text-[11px]">
                              • {ev}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Impact */}
                      <div className="p-2.5 rounded-md bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-[11px] text-rose-800 dark:text-rose-200">
                        <strong>Projected Impact:</strong> {msg.structured.impact}
                      </div>

                      {/* Recommendation */}
                      <div className="p-2.5 rounded-md bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 text-[11px] text-indigo-900 dark:text-indigo-200">
                        <strong>Recommended Action:</strong> {msg.structured.recommendation}
                      </div>

                      {/* Action Button */}
                      {msg.structured.action && (
                        <div className="pt-2 flex items-center justify-between gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            icon={CheckCircle2}
                            onClick={() => handleExecuteAction(msg.structured?.actionPayload)}
                          >
                            {msg.structured.action}
                          </Button>
                          <span className="text-[10px] font-mono text-slate-400">
                            Confidence: 96%
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    className={`text-[10px] font-mono ${
                      msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2.5 text-xs text-indigo-600 dark:text-indigo-400 font-mono">
                <div className="w-7 h-7 rounded-md bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center animate-pulse">
                  <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
                </div>
                <span>IBM Bob analyzing active network telemetry...</span>
              </div>
            )}
          </div>

          {/* Prompt Suggestions Bar */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-[#070A12] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px]">
            <span className="text-slate-400 shrink-0 font-mono">Suggested:</span>
            {suggestedPrompts.slice(0, 3).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors border border-slate-200 dark:border-slate-700 shadow-2xs text-[11px]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-[#0B101D] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask Bob AI about disruptions, idle trucks, alternate routes, or cold-chain..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              className="flex-1 px-3.5 py-2 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
            <Button
              variant="primary"
              size="sm"
              icon={Send}
              iconPosition="right"
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
            >
              Send
            </Button>
          </div>
        </div>

        {/* Right 1 Col: Operational Context & Prompts Library */}
        <div className="rounded-lg border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#0B101D] p-4 space-y-4 flex flex-col text-xs overflow-y-auto shadow-enterprise">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm border-b border-slate-200 dark:border-slate-800 pb-2">
              Live Network Context
            </h3>
            <div className="space-y-2 pt-3 text-slate-600 dark:text-slate-300 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Active Disruption:</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">D001 (Mumbai Strike)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Critical Shipment:</span>
                <span className="font-semibold text-slate-800 dark:text-white">S101 (China → Mumbai)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Excursion Container:</span>
                <span className="font-semibold text-orange-600 dark:text-orange-400">VAX-2045 (9.7°C)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Matched Idle Asset:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">Truck T04 (Ahmedabad)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bypass Route:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">R-ALT-01 (Mundra)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm border-b border-slate-200 dark:border-slate-800 pb-2">
              Operational Query Library
            </h3>
            <div className="space-y-1.5">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="w-full text-left p-2 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-[11px]"
                >
                  &ldquo;{p}&rdquo;
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-md bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 text-[11px] text-slate-600 dark:text-slate-400 space-y-1 mt-auto">
            <span className="font-semibold text-indigo-700 dark:text-indigo-300 block">IBM Bob AI Engine:</span>
            <p className="leading-relaxed">
              Decisions are deterministic and bound to active telemetry. Actions authorized here propagate into the Action Center and Shipments registry in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

