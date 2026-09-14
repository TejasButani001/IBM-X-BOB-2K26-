'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Disruption, Shipment, FleetAsset, ColdChainShipment, AlternativeRoute, AlertItem, ActionPlanItem } from '../types';
import { initialDisruptions, initialShipments, initialFleetAssets, initialColdChainShipments, alternativeRoutesForS101, initialAlerts, initialActionPlan } from '../data/mockData';

interface ControlTowerContextType {
  disruptions: Disruption[];
  shipments: Shipment[];
  fleet: FleetAsset[];
  coldChain: ColdChainShipment[];
  alerts: AlertItem[];
  actionPlan: ActionPlanItem[];
  alternativeRoutes: AlternativeRoute[];
  
  // Theme & Global Modals
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  
  // Demo State & Scenarios
  demoScenario: string;
  isDemoActive: boolean;
  triggerMumbaiStrike: () => void;
  triggerColdChainExcursion: () => void;
  rerouteShipment: (shipmentId: string, routeId: string) => void;
  redeployAsset: (assetId: string, corridor?: string) => void;
  approveAction: (actionId: string) => void;
  approveAllImmediateActions: () => void;
  resolveDisruption: (disruptionId: string) => void;
  resetToBaseline: () => void;
  
  // KPI Metrics
  metrics: {
    totalShipments: number;
    atRiskShipments: number;
    activeDisruptions: number;
    idleFleetAssets: number;
    coldChainAlerts: number;
    onTimePerformancePercent: number;
    fleetUtilisationPercent: number;
    networkHealthScore: number;
  };
}

const ControlTowerContext = createContext<ControlTowerContextType | undefined>(undefined);

export function ControlTowerProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [disruptions, setDisruptions] = useState<Disruption[]>(initialDisruptions);
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [fleet, setFleet] = useState<FleetAsset[]>(initialFleetAssets);
  const [coldChain, setColdChain] = useState<ColdChainShipment[]>(initialColdChainShipments);
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [actionPlan, setActionPlan] = useState<ActionPlanItem[]>(initialActionPlan);
  const [alternativeRoutes] = useState<AlternativeRoute[]>(alternativeRoutesForS101);
  const [demoScenario, setDemoScenario] = useState<string>('mumbai-strike');
  const [isDemoActive, setIsDemoActive] = useState<boolean>(true);

  // Keyboard shortcut Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Theme synchronization
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Demo Trigger: Simulate Mumbai Port Strike (Cascading Impact)
  const triggerMumbaiStrike = () => {
    setDemoScenario('mumbai-strike');
    setIsDemoActive(true);

    // Update D001 to Critical Active
    setDisruptions((prev) =>
      prev.map((d) =>
        d.id === 'D001'
          ? {
              ...d,
              status: 'Active',
              severity: 'critical',
              cascadeRiskScore: 94,
              description: 'ACTIVE DEMO: Unannounced 72-hour dockworkers industrial action halting crane operations at Nhava Sheva. 18 vessels anchored offshore.',
              recommendedActionCount: 5,
            }
          : d
      )
    );

    // Elevate S101, S103, S105, S110, S114 risk scores
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === 'S101') {
          return {
            ...s,
            status: 'Disrupted',
            riskScore: 94,
            delayHours: 77,
            eta: '2026-09-18T14:00:00Z',
            temperature: 9.7,
            aiExplanation: 'CRITICAL DEMO ALERT: Severe exposure to D001 (Mumbai strike). VAX-2045 reefer unit logged 9.7°C excursion. Mundra Port bypass + Truck T04 redeployment urgently recommended.',
          };
        }
        if (s.id === 'S103') {
          return { ...s, status: 'Disrupted', riskScore: 89, delayHours: 70 };
        }
        if (s.id === 'S105') {
          return { ...s, status: 'At Risk', riskScore: 86, delayHours: 50 };
        }
        return s;
      })
    );

    // Ensure Truck T04 is Idle and highlighted for redeployment
    setFleet((prev) =>
      prev.map((a) =>
        a.id === 'T04'
          ? {
              ...a,
              status: 'Idle',
              utilisation: 0,
              idleDurationHours: 19.5,
              matchScore: 94,
              recommendedAction: 'MATCHED CORRIDOR: Redeploy to Mundra Port to meet diverted S101 cargo.',
            }
          : a
      )
    );

    // Add immediate action items
    setActionPlan(initialActionPlan);

    // Add alert
    const newAlert: AlertItem = {
      id: `ALT-${Date.now()}`,
      title: 'DEMO SIMULATION: Mumbai Port Strike Cascaded Across 18 Shipments',
      category: 'Disruption',
      severity: 'critical',
      timestamp: 'Just now',
      entityId: 'D001',
      entityType: 'disruption',
      description: 'Triggered simulated disruption D001. Risk scores surged across 18 shipments; alternative routes generated.',
      status: 'Unread',
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  // Demo Trigger: Simulate Cold-Chain Excursion on VAX-2045
  const triggerColdChainExcursion = () => {
    setDemoScenario('cold-chain-excursion');
    setIsDemoActive(true);

    setColdChain((prev) =>
      prev.map((c) =>
        c.id === 'VAX-2045'
          ? {
              ...c,
              currentTemperature: 10.2,
              maxRecordedTemp: 10.2,
              excursionDurationMins: 58,
              severity: 'critical',
              aiAnalysis: 'LIVE DEMO EXCURSION: Temperature breached 8.0°C for 58 minutes reaching 10.2°C. Kinetic degradation threshold in 32 minutes. Immediate dry-ice re-blanketing and berthing diversion required.',
              readings: [
                ...c.readings,
                { time: '12:30', temperature: 10.2, safeMin: 2.0, safeMax: 8.0 },
              ],
            }
          : c
      )
    );

    setShipments((prev) =>
      prev.map((s) =>
        s.id === 'S101'
          ? {
              ...s,
              temperature: 10.2,
              riskScore: 98,
              status: 'Disrupted',
              aiExplanation: 'LIVE EXCURSION BREACH: VAX-2045 recorded 10.2°C. Extreme risk of clinical vaccine loss without immediate thermal intervention.',
            }
          : s
      )
    );

    const coldAlert: AlertItem = {
      id: `ALT-${Date.now()}`,
      title: 'CRITICAL DEMO: VAX-2045 Excursion Escalated to 10.2°C',
      category: 'Cold-Chain',
      severity: 'critical',
      timestamp: 'Just now',
      entityId: 'VAX-2045',
      entityType: 'cold-chain',
      description: 'Critical mRNA vaccine unit breached thermal boundary. 32-minute kinetic tolerance remaining.',
      status: 'Unread',
    };
    setAlerts((prev) => [coldAlert, ...prev]);
  };

  // Action: Reroute Shipment
  const rerouteShipment = (shipmentId: string, routeId: string) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId) {
          return {
            ...s,
            status: 'In Transit',
            riskScore: 18,
            delayHours: 6,
            eta: '2026-09-16T04:00:00Z',
            disruptionExposure: 'D001 Bypassed via Mundra Port Divert',
            aiExplanation: 'AI ACTION EXECUTED: Successfully rerouted via Mundra Port (Route R-ALT-01). Avoided 71 hours of port strike delay.',
            checkpoints: [
              ...s.checkpoints.slice(0, 3),
              {
                name: 'Diverted to Mundra Port Terminal 3',
                location: 'Mundra Port (IN)',
                timestamp: 'En Route',
                status: 'current',
                eta: '2026-09-15 06:00',
              },
              {
                name: 'Express Road Reefer Transfer (Truck T04)',
                location: 'Ahmedabad - Mumbai Corridor',
                timestamp: 'Scheduled',
                status: 'pending',
                eta: '2026-09-16 04:00',
              },
            ],
          };
        }
        return s;
      })
    );

    // Update Action Item status
    setActionPlan((prev) =>
      prev.map((act) =>
        act.targetEntityId === shipmentId && act.category === 'Reroute'
          ? { ...act, status: 'Approved' }
          : act
      )
    );

    const successAlert: AlertItem = {
      id: `ALT-${Date.now()}`,
      title: `Shipment ${shipmentId} Rerouted via Mundra Bypass`,
      category: 'Shipment',
      severity: 'healthy',
      timestamp: 'Just now',
      entityId: shipmentId,
      entityType: 'shipment',
      description: `Rerouting order executed for ${shipmentId}. Delay reduced by 71 hours. Risk normalized to 18/100.`,
      status: 'Resolved',
    };
    setAlerts((prev) => [successAlert, ...prev]);
  };

  // Action: Redeploy Fleet Asset
  const redeployAsset = (assetId: string, corridor = 'Ahmedabad → Mundra → Mumbai') => {
    setFleet((prev) =>
      prev.map((a) => {
        if (a.id === assetId) {
          return {
            ...a,
            status: 'Active',
            utilisation: 92,
            currentRoute: corridor,
            idleDurationHours: 0,
            recommendedAction: 'DEPLOYED: Dispatched to Mundra Port to meet S101 reefer cargo.',
          };
        }
        return a;
      })
    );

    setActionPlan((prev) =>
      prev.map((act) =>
        act.targetEntityId === assetId && act.category === 'Redeploy'
          ? { ...act, status: 'Approved' }
          : act
      )
    );

    const redeployAlert: AlertItem = {
      id: `ALT-${Date.now()}`,
      title: `Fleet Asset ${assetId} Redeployed to Mundra Corridor`,
      category: 'Fleet',
      severity: 'healthy',
      timestamp: 'Just now',
      entityId: assetId,
      entityType: 'fleet',
      description: `${assetId} mobilized. Utilisation increased from 0% to 92%. Assigned to S101 cold-chain transfer.`,
      status: 'Resolved',
    };
    setAlerts((prev) => [redeployAlert, ...prev]);
  };

  // Action: Approve Single Action
  const approveAction = (actionId: string) => {
    setActionPlan((prev) =>
      prev.map((act) => {
        if (act.id === actionId) {
          if (act.category === 'Reroute' && act.targetEntityId === 'S101') {
            rerouteShipment('S101', 'R-ALT-01');
          }
          if (act.category === 'Redeploy' && act.targetEntityId === 'T04') {
            redeployAsset('T04');
          }
          if (act.category === 'Cold-Chain' && act.targetEntityId === 'VAX-2045') {
            setColdChain((cp) =>
              cp.map((c) =>
                c.id === 'VAX-2045'
                  ? {
                      ...c,
                      currentTemperature: 4.8,
                      severity: 'healthy',
                      aiAnalysis: 'EMERGENCY PROTOCOL EXECUTED: Auxiliary dry-ice blanket activated. Temperatures stabilized to 4.8°C nominal.',
                    }
                  : c
              )
            );
          }
          return { ...act, status: 'Approved' };
        }
        return act;
      })
    );
  };

  // Action: Approve All Immediate Actions
  const approveAllImmediateActions = () => {
    rerouteShipment('S101', 'R-ALT-01');
    redeployAsset('T04');
    setColdChain((cp) =>
      cp.map((c) =>
        c.id === 'VAX-2045'
          ? {
              ...c,
              currentTemperature: 4.8,
              severity: 'healthy',
              aiAnalysis: 'ALL ACTIONS APPROVED: Reefer stabilized at 4.8°C; Mundra transfer underway.',
            }
          : c
      )
    );
    setActionPlan((prev) =>
      prev.map((act) =>
        act.priority === 'Immediate' ? { ...act, status: 'Approved' } : act
      )
    );
    setDemoScenario('cascade-resolved');
  };

  // Action: Resolve Disruption
  const resolveDisruption = (disruptionId: string) => {
    setDisruptions((prev) =>
      prev.map((d) =>
        d.id === disruptionId ? { ...d, status: 'Resolved', severity: 'healthy' } : d
      )
    );
  };

  // Action: Reset to Baseline
  const resetToBaseline = () => {
    setDisruptions(initialDisruptions);
    setShipments(initialShipments);
    setFleet(initialFleetAssets);
    setColdChain(initialColdChainShipments);
    setAlerts(initialAlerts);
    setActionPlan(initialActionPlan);
    setDemoScenario('mumbai-strike');
  };

  // Compute Live High-Density KPI Metrics
  const totalShipments = shipments.length;
  const atRiskShipments = shipments.filter(
    (s) => s.status === 'At Risk' || s.status === 'Disrupted' || s.riskScore > 65
  ).length;
  const activeDisruptions = disruptions.filter((d) => d.status === 'Active').length;
  const idleFleetAssets = fleet.filter((a) => a.status === 'Idle').length;
  const coldChainAlerts = coldChain.filter(
    (c) => c.severity === 'critical' || c.severity === 'major' || c.severity === 'warning'
  ).length;
  const onTimePerformancePercent = Math.round(
    ((totalShipments - atRiskShipments) / totalShipments) * 100
  );
  const fleetUtilisationPercent = Math.round(
    fleet.reduce((acc, curr) => acc + curr.utilisation, 0) / fleet.length
  );
  const networkHealthScore = Math.max(
    20,
    Math.round(100 - (atRiskShipments / totalShipments) * 40 - activeDisruptions * 4)
  );

  return (
    <ControlTowerContext.Provider
      value={{
        disruptions,
        shipments,
        fleet,
        coldChain,
        alerts,
        actionPlan,
        alternativeRoutes,
        theme,
        toggleTheme,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        isMobileNavOpen,
        setIsMobileNavOpen,
        demoScenario,
        isDemoActive,
        triggerMumbaiStrike,
        triggerColdChainExcursion,
        rerouteShipment,
        redeployAsset,
        approveAction,
        approveAllImmediateActions,
        resolveDisruption,
        resetToBaseline,
        metrics: {
          totalShipments,
          atRiskShipments,
          activeDisruptions,
          idleFleetAssets,
          coldChainAlerts,
          onTimePerformancePercent,
          fleetUtilisationPercent,
          networkHealthScore,
        },
      }}
    >
      {children}
    </ControlTowerContext.Provider>
  );
}

export function useControlTower() {
  const context = useContext(ControlTowerContext);
  if (!context) {
    throw new Error('useControlTower must be used within a ControlTowerProvider');
  }
  return context;
}
