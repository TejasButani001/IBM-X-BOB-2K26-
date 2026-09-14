'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Layers, MapPin, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

export interface MapNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'strike' | 'bypass' | 'idle' | 'origin' | 'destination' | 'normal';
  description?: string;
  badge?: string;
  eta?: string;
  delay?: string;
}

export interface MapRoute {
  id: string;
  name: string;
  points: [number, number][];
  color: string;
  dashArray?: string;
  animated?: boolean;
}

interface GoogleWorldMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  selectedNodeId?: string;
  onNodeSelect?: (nodeName: string) => void;
  nodes?: MapNode[];
  routes?: MapRoute[];
  showControls?: boolean;
  activeTileLayer?: 'google_roadmap' | 'google_satellite' | 'google_hybrid' | 'dark_logistics';
}

const DEFAULT_NODES: MapNode[] = [
  {
    id: 'jnpt',
    name: 'JNPT Mumbai',
    lat: 18.95,
    lng: 72.95,
    status: 'strike',
    badge: 'STRIKE D001',
    description: 'Dockworkers strike active. Berth dwell +77h.',
    delay: '+77h'
  },
  {
    id: 'mundra',
    name: 'Mundra Port',
    lat: 22.84,
    lng: 69.70,
    status: 'bypass',
    badge: 'BYPASS RECOMMENDED',
    description: 'Deepwater Terminal 3 operational. Zero berth queue.',
    delay: '0h'
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad Fleet Hub',
    lat: 23.02,
    lng: 72.57,
    status: 'idle',
    badge: 'TRUCK T04 IDLE',
    description: '18T Cryogenic Reefer ready for dispatch.',
    eta: 'Immediate'
  },
  {
    id: 'shanghai',
    name: 'Shanghai Terminal',
    lat: 31.23,
    lng: 121.47,
    status: 'origin',
    badge: 'ORIGIN S101',
    description: 'Cargo departed via Evergreen Star vessel.',
    eta: 'Departed'
  },
  {
    id: 'dubai',
    name: 'Dubai Jebel Ali',
    lat: 24.98,
    lng: 55.06,
    status: 'normal',
    badge: 'HUB CHOKEPOINT',
    description: 'Middle East primary transshipment node.',
    eta: 'On Schedule'
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam Port',
    lat: 51.95,
    lng: 4.14,
    status: 'destination',
    badge: 'DESTINATION',
    description: 'Final European discharge port.',
    eta: 'Oct 24'
  },
  {
    id: 'singapore',
    name: 'Singapore Port',
    lat: 1.29,
    lng: 103.85,
    status: 'normal',
    badge: 'FEEDER HUB',
    description: 'Southeast Asia relay station.',
    eta: 'Active'
  }
];

const DEFAULT_ROUTES: MapRoute[] = [
  {
    id: 'shanghai-jnpt',
    name: 'Shanghai → JNPT (Blocked Corridor)',
    points: [[31.23, 121.47], [12.0, 105.0], [6.0, 80.0], [18.95, 72.95]],
    color: '#EF4444',
    dashArray: '6, 6'
  },
  {
    id: 'shanghai-mundra',
    name: 'Shanghai → Mundra (Active Bypass)',
    points: [[31.23, 121.47], [12.0, 105.0], [6.0, 80.0], [22.84, 69.70]],
    color: '#10B981',
    animated: true
  },
  {
    id: 'mundra-mumbai-land',
    name: 'Mundra → Ahmedabad → Mumbai Express Highway',
    points: [[22.84, 69.70], [23.02, 72.57], [18.95, 72.95]],
    color: '#F59E0B',
    dashArray: '4, 4'
  },
  {
    id: 'mumbai-dubai',
    name: 'JNPT/Mundra → Dubai Corridor',
    points: [[22.84, 69.70], [24.98, 55.06]],
    color: '#3B82F6'
  },
  {
    id: 'dubai-rotterdam',
    name: 'Dubai → Suez → Rotterdam',
    points: [[24.98, 55.06], [27.5, 34.0], [31.2, 32.3], [36.0, 14.0], [43.0, 9.0], [51.95, 4.14]],
    color: '#8B5CF6'
  }
];

const TILE_LAYERS = {
  google_roadmap: {
    name: 'Google Map Standard',
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    maxZoom: 20,
    attribution: '&copy; Google Maps'
  },
  google_satellite: {
    name: 'Google Satellite',
    url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    maxZoom: 20,
    attribution: '&copy; Google Maps Satellite'
  },
  google_hybrid: {
    name: 'Google Hybrid',
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    maxZoom: 20,
    attribution: '&copy; Google Maps Hybrid'
  },
  dark_logistics: {
    name: 'Dark Logistics NOC',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    maxZoom: 19,
    attribution: '&copy; CARTO &copy; OpenStreetMap'
  }
};

function MapInner({
  center = [23, 70],
  zoom = 3,
  height = '380px',
  className = '',
  selectedNodeId,
  onNodeSelect,
  nodes = DEFAULT_NODES,
  routes = DEFAULT_ROUTES,
  showControls = true,
  activeTileLayer = 'google_roadmap'
}: GoogleWorldMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const polylinesRef = useRef<any[]>([]);

  const [currentLayerKey, setCurrentLayerKey] = useState<keyof typeof TILE_LAYERS>(activeTileLayer);
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isSubscribed = true;

    async function initMap() {
      const L = (await import('leaflet')).default;

      if (!mapContainerRef.current || !isSubscribed) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const layerConfig = TILE_LAYERS[currentLayerKey];

      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false,
        attributionControl: false
      });

      const tileLayer = L.tileLayer(layerConfig.url, {
        maxZoom: layerConfig.maxZoom,
        attribution: layerConfig.attribution
      }).addTo(map);

      tileLayerRef.current = tileLayer;
      mapInstanceRef.current = map;

      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 250);

      const handleResize = () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      };
      window.addEventListener('resize', handleResize);


      // Add Routes (Polylines)
      routes.forEach((route) => {
        const polyline = L.polyline(route.points, {
          color: route.color,
          weight: 3,
          opacity: 0.85,
          dashArray: route.dashArray || undefined
        }).addTo(map);

        polyline.bindTooltip(route.name, {
          sticky: true,
          className: 'bg-slate-900/90 text-white text-[11px] font-semibold border border-slate-700 rounded px-2 py-1 shadow-lg'
        });

        polylinesRef.current.push(polyline);
      });

      // Add Nodes (Custom Icon Markers)
      nodes.forEach((node) => {
        let iconBg = 'bg-blue-600';
        let badgeBg = 'border-blue-500 text-blue-300';
        let pinPulse = false;

        if (node.status === 'strike') {
          iconBg = 'bg-rose-600';
          badgeBg = 'border-rose-500 text-rose-300';
          pinPulse = true;
        } else if (node.status === 'bypass') {
          iconBg = 'bg-emerald-500';
          badgeBg = 'border-emerald-500 text-emerald-300';
        } else if (node.status === 'idle') {
          iconBg = 'bg-amber-500';
          badgeBg = 'border-amber-500 text-amber-300';
        } else if (node.status === 'origin') {
          iconBg = 'bg-indigo-600';
          badgeBg = 'border-indigo-400 text-indigo-200';
        } else if (node.status === 'destination') {
          iconBg = 'bg-cyan-500';
          badgeBg = 'border-cyan-400 text-cyan-200';
        }

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div class="relative group cursor-pointer flex flex-col items-center">
              ${pinPulse ? '<span class="absolute -inset-1 rounded-full bg-rose-500/40 animate-ping"></span>' : ''}
              <div class="w-5 h-5 rounded-full ${iconBg} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-lg">
                ${node.status === 'strike' ? '!' : '•'}
              </div>
              <div class="mt-1 whitespace-nowrap bg-slate-950/90 text-white text-[10px] px-2 py-0.5 rounded border ${badgeBg} font-mono font-semibold shadow-xl">
                ${node.name}
              </div>
            </div>
          `,
          iconSize: [120, 40],
          iconAnchor: [60, 10]
        });

        const marker = L.marker([node.lat, node.lng], { icon: customIcon }).addTo(map);

        const popupContent = `
          <div class="p-2 text-xs space-y-1.5 min-w-[180px]">
            <div class="flex items-center justify-between border-b border-slate-700/60 pb-1">
              <span class="font-bold text-white text-xs">${node.name}</span>
              ${node.badge ? `<span class="px-1.5 py-0.5 text-[9px] rounded font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-700/50">${node.badge}</span>` : ''}
            </div>
            ${node.description ? `<p class="text-slate-300 text-[11px] leading-snug">${node.description}</p>` : ''}
            <div class="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
              <span>LAT: ${node.lat.toFixed(2)}°</span>
              <span>LNG: ${node.lng.toFixed(2)}°</span>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on('click', () => {
          if (onNodeSelect) {
            onNodeSelect(node.name);
          }
        });

        markersRef.current[node.id] = marker;
      });
    }

    initMap();

    return () => {
      isSubscribed = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Layer Swap
  const handleLayerChange = async (key: keyof typeof TILE_LAYERS) => {
    setCurrentLayerKey(key);
    setIsLayerMenuOpen(false);

    if (mapInstanceRef.current && tileLayerRef.current) {
      const L = (await import('leaflet')).default;
      const layerConfig = TILE_LAYERS[key];
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
      const newTileLayer = L.tileLayer(layerConfig.url, {
        maxZoom: layerConfig.maxZoom,
        attribution: layerConfig.attribution
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = newTileLayer;
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  };

  return (
    <div className={`relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-950 ${className}`} style={{ height }}>
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Left Header Badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs text-slate-200 shadow-lg">
        <MapPin className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
        <span className="font-semibold text-[11px] tracking-wide font-mono">
          GOOGLE GIS MAP • {TILE_LAYERS[currentLayerKey].name.toUpperCase()}
        </span>
      </div>

      {/* Controls Overlay */}
      {showControls && (
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          {/* Layer Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
              className="p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 shadow-md backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Map Layer Mode"
            >
              <Layers className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Layers</span>
            </button>

            {isLayerMenuOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-slate-900/95 border border-slate-700 rounded-lg shadow-2xl p-1.5 space-y-1 backdrop-blur-lg z-20 text-xs">
                {(Object.keys(TILE_LAYERS) as (keyof typeof TILE_LAYERS)[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleLayerChange(key)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                      currentLayerKey === key
                        ? 'bg-indigo-600/90 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{TILE_LAYERS[key].name}</span>
                    {currentLayerKey === key && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Zoom In */}
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 shadow-md backdrop-blur-md transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 shadow-md backdrop-blur-md transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Reset View */}
          <button
            onClick={handleResetView}
            className="p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 shadow-md backdrop-blur-md transition-all"
            title="Reset Global View"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Map Footer Bar Legend */}
      <div className="absolute bottom-2 left-2 right-2 z-10 px-3 py-1.5 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-800/90 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-300 shadow-md">
        <div className="flex items-center gap-3 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Strike / Bottleneck
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Bypass Port
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Fleet Hub
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Origin / Hub
          </span>
        </div>

        <div className="font-mono text-[10px] text-slate-400 flex items-center gap-1">
          <span>Live Telemetry Layer</span>
        </div>
      </div>
    </div>
  );
}

// Export dynamic client wrapper to disable SSR for Leaflet
export default function GoogleWorldMap(props: GoogleWorldMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        className={`w-full rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 text-xs font-mono animate-pulse ${props.className || ''}`}
        style={{ height: props.height || '380px' }}
      >
        Initializing Google GIS Map...
      </div>
    );
  }

  return <MapInner {...props} />;
}
