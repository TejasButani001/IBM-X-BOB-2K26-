'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Copy,
  Check,
  RotateCcw,
  Plus,
  MessageSquare,
  ChevronRight,
  Truck,
  Compass,
  Thermometer,
  ShieldAlert,
  Package,
  ArrowRight,
  Layers,
  Radio,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content?: string;
  structured?: BobCopilotResponse;
  timestamp: string;
  entityType?: 'shipment' | 'route' | 'fleet' | 'cold-chain' | 'disruption';
  followUps?: string[];
}

interface ConversationThread {
  id: string;
  title: string;
  timestamp: string;
  active: boolean;
}

export default function CopilotPage() {
  const {
    metrics,
    disruptions,
    shipments,
    coldChain,
    fleet,
    rerouteShipment,
    redeployAsset,
  } = useControlTower();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeThreadId, setActiveThreadId] = useState('thread-1');

  // Conversation history threads
  const [threads, setThreads] = useState<ConversationThread[]>([
    { id: 'thread-1', title: 'Mumbai Strike Triage', timestamp: '10:00 AM', active: true },
    { id: 'thread-2', title: 'VAX-2045 Excursion Analysis', timestamp: 'Yesterday', active: false },
    { id: 'thread-3', title: 'Corridor 2 Bypass Evaluation', timestamp: 'Sep 12', active: false },
    { id: 'thread-4', title: 'Fleet Idle Redeployment', timestamp: 'Sep 11', active: false },
    { id: 'thread-5', title: 'Demurrage Fee Optimization', timestamp: 'Sep 10', active: false },
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      timestamp: '10:00 AM',
      structured: {
        summary:
          'FluxChain AI Operations Copilot is online and grounded in 10 global disruptions, 50 shipments, and 20 fleet assets.',
        evidence: [
          'Disruption D001 (Mumbai Port Strike) is active, trapping 18 inbound containers at Nhava Sheva.',
          'Reefer container VAX-2045 (Shipment S101) has breached the 8.0°C thermal limit for 47 minutes.',
          'Truck T04 (18T Scania Reefer) in Ahmedabad has been idle for 19.5 hours (94% corridor match).',
        ],
        impact:
          'Overall network health is reduced to 74%. Without intervention, cold-chain cargo spoilage will reach $3.4M by 15:00 UTC.',
        recommendation:
          'Divert S101 to Mundra Port, mobilize Truck T04 from Ahmedabad to Mundra, and deploy emergency dry-ice stabilization.',
        action: 'Approve Immediate Response Plan',
        actionPayload: { type: 'reroute', targetId: 'S101' },
      },
      entityType: 'disruption',
      followUps: [
        'What is the cost trade-off for Mundra?',
        'Can we expedite Truck T04 to Mundra quay?',
        'Show all 18 affected shipments.',
      ],
    },
  ]);

  const suggestedPrompts = [
    'What is our biggest operational risk right now?',
    'Which shipments are affected by the Mumbai disruption?',
    'Which idle assets should we redeploy?',
    'Find the best alternative route for S101.',
    'Show critical cold-chain excursions.',
    'What should I do first?',
  ];

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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

    // Determine entity type for rich cards
    let entityType: ChatMessage['entityType'] = undefined;
    const q = textToSend.toLowerCase();
    if (q.includes('mumbai') || q.includes('disruption') || q.includes('strike')) entityType = 'disruption';
    else if (q.includes('s101') || q.includes('shipment')) entityType = 'shipment';
    else if (q.includes('route') || q.includes('alternate')) entityType = 'route';
    else if (q.includes('idle') || q.includes('fleet') || q.includes('redeploy')) entityType = 'fleet';
    else if (q.includes('cold') || q.includes('temp') || q.includes('vax') || q.includes('excursion')) entityType = 'cold-chain';

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
        entityType,
        followUps: [
          'What is the financial savings of this action?',
          'How does this impact on-time delivery SLAs?',
          'What is the backup contingency if Mundra is delayed?',
        ],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewChat = () => {
    const newId = `thread-${Date.now()}`;
    const newThread: ConversationThread = {
      id: newId,
      title: 'New Operational Session',
      timestamp: 'Just now',
      active: true,
    };
    setThreads((prev) => [...prev.map((t) => ({ ...t, active: false })), newThread]);
    setActiveThreadId(newId);
    setMessages([
      {
        id: `msg-init-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: 'New Copilot session initialized. Grounded in live control tower telemetry. Ask any operational query.',
      },
    ]);
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
    <div className="space-y-4">
      <PageHeader
        title="Supply Chain Copilot"
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

      {/* 3-Pane Layout: Left Threads (1 col) + Center Chat (2 cols) + Right Context (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-210px)] min-h-[640px]">
        {/* PANE 1: LEFT SIDEBAR - Conversation History */}
        <div className="hidden lg:flex lg:col-span-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B101D] flex-col overflow-hidden shadow-sm p-3 space-y-3">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            className="w-full justify-start"
            onClick={handleNewChat}
          >
            New Conversation
          </Button>

          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider px-1 pt-1">
            Recent Triage Threads
          </div>

          <div className="flex-1 overflow-y-auto space-y-1">
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => {
                  setThreads((prev) => prev.map((t) => ({ ...t, active: t.id === thread.id })));
                  setActiveThreadId(thread.id);
                }}
                className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between gap-2 transition-all ${
                  thread.active || activeThreadId === thread.id
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800/60'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
                  <span className="truncate">{thread.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">{thread.timestamp}</span>
              </button>
            ))}
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">AI Memory & Context:</span>
            <p className="text-[10px] leading-relaxed">
              Sessions are synchronized across the Control Tower context. Reroutes and asset approvals persist instantly.
            </p>
          </div>
        </div>

        {/* PANE 2: CENTER - Main Conversation Thread */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B101D] flex flex-col overflow-hidden shadow-sm">
          {/* Header Bar */}
          <div className="px-4 py-3 bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white font-bold text-xs">Supply Chain Copilot</strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Ask about risks, disruptions, shipments, fleet, or cold-chain operations.</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
              96% AI Confidence
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                  className={`max-w-xl rounded-xl p-4 space-y-3 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-50 dark:bg-[#080C16] border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {msg.content && <p className="leading-relaxed text-xs sm:text-sm">{msg.content}</p>}

                  {/* Structured AI Response Format */}
                  {msg.structured && (
                    <div className="space-y-3.5">
                      {/* SUMMARY */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-bold tracking-wider">
                          SUMMARY
                        </span>
                        <p className="font-semibold text-slate-900 dark:text-white leading-snug text-xs sm:text-sm">
                          {msg.structured.summary}
                        </p>
                      </div>

                      {/* EVIDENCE */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                          EVIDENCE
                        </span>
                        <div className="space-y-1 pl-2.5 border-l-2 border-indigo-400 dark:border-indigo-600">
                          {msg.structured.evidence.map((ev, idx) => (
                            <div key={idx} className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                              • {ev}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* RICH AI CARDS (If applicable to context) */}
                      {msg.entityType === 'disruption' && (
                        <div className="p-3 rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-1.5">
                          <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-xs">
                            <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                              <ShieldAlert className="w-3.5 h-3.5" />
                              Disruption D001: Mumbai Port Strike
                            </span>
                            <span className="font-mono text-[10px] text-rose-600">72h Crane Walkout</span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300">
                            Nhava Sheva (JNPT) terminal berth walkout immobilizing 18 inbound vessels. Average dwell surge: +77 hours.
                          </p>
                        </div>
                      )}

                      {msg.entityType === 'cold-chain' && (
                        <div className="p-3 rounded-lg bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 space-y-1.5">
                          <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-xs">
                            <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                              <Thermometer className="w-3.5 h-3.5" />
                              Cold-Chain Incident: Unit VAX-2045
                            </span>
                            <span className="font-mono text-[10px] text-rose-600 font-bold">9.7°C (47m Excursion)</span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300">
                            Oncology mRNA Biologics cargo outside safe 2.0°C–8.0°C band. Kinetic threshold window allows 75 minutes for dry-ice stabilization.
                          </p>
                        </div>
                      )}

                      {msg.entityType === 'fleet' && (
                        <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1.5">
                          <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-xs">
                            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                              <Truck className="w-3.5 h-3.5" />
                              Fleet Match: Truck T04 (Scania R500)
                            </span>
                            <span className="font-mono text-[10px] text-emerald-600 font-bold">94% Corridor Match</span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300">
                            18T multi-temperature reefer idle in Ahmedabad (19.5h idle). Staging position for Mundra quay transfer.
                          </p>
                        </div>
                      )}

                      {/* IMPACT */}
                      <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-[11px] text-rose-900 dark:text-rose-200">
                        <strong>IMPACT:</strong> {msg.structured.impact}
                      </div>

                      {/* RECOMMENDATION */}
                      <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 text-[11px] text-indigo-900 dark:text-indigo-200">
                        <strong>RECOMMENDATION:</strong> {msg.structured.recommendation}
                      </div>

                      {/* NEXT ACTIONS */}
                      <div className="pt-1 space-y-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block">
                          NEXT ACTIONS
                        </span>
                        <div className="flex items-center gap-2 flex-wrap">
                          {msg.structured.action && (
                            <Button
                              variant="primary"
                              size="xs"
                              icon={CheckCircle2}
                              onClick={() => handleExecuteAction(msg.structured?.actionPayload)}
                            >
                              {msg.structured.action}
                            </Button>
                          )}
                          <Link href="/app/disruptions">
                            <Button variant="secondary" size="xs" icon={ShieldAlert}>
                              View Affected Shipments
                            </Button>
                          </Link>
                          <Link href="/app/routing">
                            <Button variant="secondary" size="xs" icon={Compass}>
                              Compare Routes
                            </Button>
                          </Link>
                          <Link href="/app/fleet/redeployment">
                            <Button variant="secondary" size="xs" icon={Truck}>
                              Redeploy Fleet
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Message Utilities: Copy, Regenerate, Confidence */}
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleCopy(msg.id, msg.structured?.summary || '')}
                            className="hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Response</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleSend(msg.structured?.summary || 'Regenerate answer')}
                            className="hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Regenerate</span>
                          </button>
                        </div>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          96% Confidence • Bob Granite 3.0
                        </span>
                      </div>

                      {/* Follow-up Prompts */}
                      {msg.followUps && msg.followUps.length > 0 && (
                        <div className="pt-2 space-y-1">
                          <span className="text-[10px] font-mono text-slate-400">Suggested Follow-ups:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.followUps.map((f, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSend(f)}
                                className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-[10px] text-slate-600 dark:text-slate-300 transition-colors"
                              >
                                &ldquo;{f}&rdquo;
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="text-[10px] font-mono text-slate-400 text-right">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-700 dark:text-indigo-300 font-mono">
                <Radio className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse shrink-0" />
                <span>IBM Bob analyzing live control tower telemetry & generating response...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Prompts Pills */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-[#070A12] border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            <span className="text-slate-400 shrink-0 font-mono text-[10px]">Prompts:</span>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors border border-slate-200 dark:border-slate-700 shadow-2xs text-[11px]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-[#0B101D] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask Copilot about risks, disruptions, shipments, fleet, or cold-chain operations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              className="flex-1 px-3.5 py-2 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500"
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

        {/* PANE 3: RIGHT SIDEBAR - Live Operational Context */}
        <div className="hidden lg:flex lg:col-span-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B101D] p-3.5 space-y-4 flex-col text-xs overflow-y-auto shadow-sm">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
              <span>Live Operational Context</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>

            <div className="space-y-2.5 pt-3 text-[11px]">
              <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 space-y-0.5">
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] block">ACTIVE DISRUPTION</span>
                <strong className="text-rose-700 dark:text-rose-400 block font-bold">D001: Mumbai Port Strike</strong>
                <span className="text-[10px] text-slate-600 dark:text-slate-300">18 Affected Shipments • 72h Delay</span>
              </div>

              <div className="p-2 rounded bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 space-y-0.5">
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] block">CRITICAL EXCURSION</span>
                <strong className="text-orange-700 dark:text-orange-400 block font-bold">Unit VAX-2045 (9.7°C)</strong>
                <span className="text-[10px] text-slate-600 dark:text-slate-300">47m Excursion • mRNA Biologics</span>
              </div>

              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-0.5">
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] block">MATCHED IDLE ASSET</span>
                <strong className="text-amber-700 dark:text-amber-400 block font-bold">Truck T04 (Scania Reefer)</strong>
                <span className="text-[10px] text-slate-600 dark:text-slate-300">19.5h Idle in Ahmedabad • 94% Match</span>
              </div>

              <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 space-y-0.5">
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] block">OPTIMAL BYPASS ROUTE</span>
                <strong className="text-emerald-700 dark:text-emerald-400 block font-bold">R-ALT-01 (Mundra T3)</strong>
                <span className="text-[10px] text-slate-600 dark:text-slate-300">Saves 71h • 96/100 Composite Score</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs border-b border-slate-200 dark:border-slate-800 pb-2">
              Operational Query Library
            </h3>
            <div className="space-y-1.5 pt-2">
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
