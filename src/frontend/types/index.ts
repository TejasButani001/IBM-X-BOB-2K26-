export type SeverityLevel = 'healthy' | 'info' | 'warning' | 'major' | 'critical';

export type DisruptionType = 'Weather' | 'Port Strike' | 'Geopolitical' | 'Carrier' | 'Infrastructure';

export type DisruptionStatus = 'Active' | 'Monitoring' | 'Resolved';

export interface Disruption {
  id: string;
  name: string;
  type: DisruptionType;
  location: string;
  region: string;
  coordinates: [number, number];
  severity: SeverityLevel;
  startTime: string;
  expectedEnd: string;
  affectedShipmentIds: string[];
  affectedRoutes: string[];
  status: DisruptionStatus;
  description: string;
  cascadeRiskScore: number; // 0 - 100
  aiImpactSummary: string;
  recommendedActionCount: number;
}

export type ShipmentStatus = 'On Time' | 'In Transit' | 'Delayed' | 'At Risk' | 'Disrupted' | 'Held' | 'Delivered';
export type ShipmentPriority = 'Critical' | 'High' | 'Standard';

export interface Checkpoint {
  name: string;
  location: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending' | 'delayed';
  eta: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  originCoords: [number, number];
  destCoords: [number, number];
  cargo: string;
  cargoType: 'Pharmaceutical' | 'Electronics' | 'Automotive' | 'Perishable Foods' | 'Chemicals' | 'Industrial';
  weightTons: number;
  priority: ShipmentPriority;
  status: ShipmentStatus;
  riskScore: number; // 0 - 100
  eta: string;
  originalEta: string;
  delayHours: number;
  carrier: string;
  carrierCode: string;
  isColdChain: boolean;
  coldChainId?: string;
  temperature?: number;
  temperatureThreshold?: { min: number; max: number };
  disruptionExposure?: string; // e.g. "D001: Mumbai Port Strike"
  disruptionId?: string;
  lastUpdated: string;
  checkpoints: Checkpoint[];
  aiExplanation: string;
  recommendedRouteId?: string;
  recommendedFleetId?: string;
}

export type AssetType = 'Truck' | 'Container' | 'Vessel';
export type AssetStatus = 'Active' | 'Available' | 'Idle' | 'Maintenance';

export interface FleetAsset {
  id: string;
  name: string;
  type: AssetType;
  model: string;
  location: string;
  coordinates: [number, number];
  capacityTons: number;
  hasReefer: boolean;
  utilisation: number; // 0 - 100%
  status: AssetStatus;
  currentRoute?: string;
  availableFrom: string;
  idleDurationHours: number;
  driverName?: string;
  matchedCorridor?: string;
  matchScore?: number; // 0 - 100%
  recommendedAction?: string;
}

export interface TemperatureReading {
  time: string;
  temperature: number;
  safeMin: number;
  safeMax: number;
}

export interface ColdChainShipment {
  id: string;
  shipmentId: string;
  cargo: string;
  requiredRange: string; // e.g. "2°C - 8°C"
  minTemp: number;
  maxTemp: number;
  currentTemperature: number;
  maxRecordedTemp: number;
  excursionDurationMins: number;
  severity: SeverityLevel;
  location: string;
  eta: string;
  sensorHealth: 'Healthy' | 'Degraded' | 'Fault';
  batteryLevel: number; // %
  readings: TemperatureReading[];
  aiAnalysis: string;
  recommendedActions: string[];
}

export interface AlternativeRoute {
  id: string;
  name: string;
  via: string;
  type: 'AI Recommended' | 'Alternative Secondary' | 'Emergency Multimodal';
  durationHours: number;
  extraDelayHours: number;
  estimatedCostUsd: number;
  costDeltaPercent: number;
  riskScore: number;
  capacityAvailable: string;
  carrier: string;
  aiScore: number; // 0 - 100
  aiExplanation: string;
  routeCheckpoints: string[];
}

export interface AlertItem {
  id: string;
  title: string;
  category: 'Disruption' | 'Shipment' | 'Fleet' | 'Cold-Chain' | 'System';
  severity: SeverityLevel;
  timestamp: string;
  entityId: string;
  entityType: 'disruption' | 'shipment' | 'fleet' | 'cold-chain';
  description: string;
  status: 'Unread' | 'Acknowledged' | 'Resolved';
}

export interface ActionPlanItem {
  id: string;
  priority: 'Immediate' | 'Recommended' | 'Planned';
  title: string;
  category: 'Reroute' | 'Redeploy' | 'Cold-Chain' | 'Carrier' | 'Customer';
  reason: string;
  confidence: number; // 0 - 100%
  owner: string;
  status: 'Pending Approval' | 'Approved' | 'Executed' | 'Rejected';
  targetEntityId: string;
  details: string;
}
