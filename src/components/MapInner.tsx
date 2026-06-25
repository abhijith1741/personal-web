"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { ShieldCheck, ShieldAlert, Navigation, Edit, RefreshCw } from "lucide-react";

// Ray-casting algorithm for checking if a coordinate point lies inside a polygon
function isPointInPolygon(point: [number, number], polygon: [number, number][]): boolean {
  const x = point[0], y = point[1];
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    
    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Generate stylized glowing custom icons
const createGlowingIcon = (colorBg: string, colorPulse: string) => {
  return L.divIcon({
    html: `<div class="relative flex items-center justify-center w-6 h-6">
      <span class="animate-ping absolute inline-flex h-5 w-5 rounded-full opacity-60 ${colorPulse}"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 ${colorBg} border border-white/40"></span>
    </div>`,
    className: "custom-div-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Career coordinates
const MILESTONES = [
  {
    name: "Fieldiva Synergy Pvt Ltd",
    role: "Senior Frontend Developer",
    location: "Kochi, Kerala",
    coords: [9.988, 76.322] as [number, number],
    details: "Architected SaaS modules, custom map layers & dynamic form engines.",
    status: "active"
  },
  {
    name: "Jobin and Jismi",
    role: "Senior Frontend Developer",
    location: "Thrissur, Kerala",
    coords: [10.527, 76.214] as [number, number],
    details: "Developed e-commerce Next.js platform with Redux and Firebase integration.",
    status: "past"
  },
  {
    name: "Caxita Tech Solutions",
    role: "React JS Developer",
    location: "Kochi, Kerala",
    coords: [9.970, 76.315] as [number, number],
    details: "Built flight/hotel modules, filter logic & client dashboard portals.",
    status: "past"
  },
  {
    name: "Createnlrn Pvt Ltd",
    role: "Software Engineer",
    location: "Kochi, Kerala",
    coords: [10.005, 76.305] as [number, number],
    details: "Managed web applications & led Android project deployment.",
    status: "past"
  }
];

// Pre-defined Geofence boundary (Tech Zone)
const DEFAULT_GEOFENCE: [number, number][] = [
  [9.983, 76.316],
  [9.995, 76.318],
  [9.996, 76.329],
  [9.984, 76.331],
  [9.979, 76.323]
];

// Custom map click handler for drawing geofences
function MapClickHandler({ onMapClick }: { onMapClick: (latlng: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function MapInner() {
  const [assetPos, setAssetPos] = useState<[number, number]>([9.987, 76.324]);
  const [geofence, setGeofence] = useState<[number, number][]>(DEFAULT_GEOFENCE);
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const [tempPoints, setTempPoints] = useState<[number, number][]>([]);
  const markerRef = useRef<L.Marker>(null);

  // Icons cache
  const activeIcon = useMemo(() => createGlowingIcon("bg-emerald-500", "bg-emerald-400"), []);
  const pastIcon = useMemo(() => createGlowingIcon("bg-indigo-500", "bg-indigo-400"), []);
  const assetIcon = useMemo(() => createGlowingIcon("bg-cyan-500", "bg-cyan-400"), []);
  const tempDrawIcon = useMemo(() => createGlowingIcon("bg-purple-500", "bg-purple-400"), []);

  // Check if asset is currently in the geofence
  const isInside = useMemo(() => {
    return isPointInPolygon(assetPos, geofence);
  }, [assetPos, geofence]);

  // Handle asset drag
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const latLng = marker.getLatLng();
        setAssetPos([latLng.lat, latLng.lng]);
      }
    },
  }), []);

  // Handle map click in drawing mode
  const handleMapClick = (latlng: L.LatLng) => {
    if (!drawingMode) return;
    const newPoint: [number, number] = [latlng.lat, latlng.lng];
    setTempPoints(prev => [...prev, newPoint]);
  };

  const startDrawing = () => {
    setDrawingMode(true);
    setTempPoints([]);
  };

  const saveDrawing = () => {
    if (tempPoints.length >= 3) {
      setGeofence(tempPoints);
      setDrawingMode(false);
      // Move asset to first coordinate to ensure they can see containment
      setAssetPos(tempPoints[0]);
    } else {
      alert("Please plot at least 3 points to build a closed boundary zone.");
    }
  };

  const resetGeofence = () => {
    setGeofence(DEFAULT_GEOFENCE);
    setAssetPos([9.987, 76.324]);
    setDrawingMode(false);
    setTempPoints([]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[600px] w-full">
      {/* Control Panel */}
      <div className="w-full lg:w-80 flex flex-col gap-4 bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shrink-0">
        <div>
          <h3 className="text-lg font-semibold font-outfit text-white flex items-center gap-2">
            <Navigation className="w-4 h-4 text-cyan-400 animate-pulse" />
            Geospatial Architect
          </h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Abhijith optimizes map renders via GPU Vector Tiles, marker clustering, and custom spatial logic. Drag the tracker or draw a custom geofence below.
          </p>
        </div>

        <hr className="border-zinc-800" />

        {/* Real-time Status Card */}
        <div className={`p-4 rounded-xl border flex flex-col gap-2.5 transition-all ${
          isInside 
            ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-400" 
            : "bg-rose-950/20 border-rose-500/20 text-rose-400"
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            {isInside ? (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-400 animate-pulse" />
                STATUS: SECURE (INSIDE)
              </>
            ) : (
              <>
                <ShieldAlert className="w-5 h-5 text-rose-400 animate-bounce" />
                STATUS: BREACHED (OUTSIDE)
              </>
            )}
          </div>
          <div className="text-xs text-zinc-400 leading-normal">
            Asset Coordinates:
            <code className="block font-mono bg-black/40 px-2 py-1 rounded mt-1 text-[11px]">
              Lat: {assetPos[0].toFixed(5)}, Lng: {assetPos[1].toFixed(5)}
            </code>
          </div>
        </div>

        <hr className="border-zinc-800" />

        {/* Action Controls */}
        <div className="flex flex-col gap-2">
          {!drawingMode ? (
            <button
              onClick={startDrawing}
              className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              Draw Custom Geofence
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={saveDrawing}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                Apply Zone
              </button>
              <button
                onClick={() => setDrawingMode(false)}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-lg border border-zinc-800 hover:bg-zinc-800 text-zinc-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          <button
            onClick={resetGeofence}
            className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset to Default Zone
          </button>
        </div>

        {drawingMode && (
          <div className="mt-2 text-xs text-purple-400 bg-purple-950/20 border border-purple-500/10 p-3 rounded-lg leading-normal">
            <strong>Drawing Instructions:</strong> Click anywhere on the map to place boundary vertices. Plot at least 3 points, then click "Apply Zone".
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-inner relative z-0">
        <MapContainer
          center={[9.985, 76.29]}
          zoom={11}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Dark Mode Basemap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          <MapClickHandler onMapClick={handleMapClick} />

          {/* Active Geofence Polygon */}
          {!drawingMode && geofence.length > 0 && (
            <Polygon
              positions={geofence}
              pathOptions={{
                color: isInside ? "#10b981" : "#f43f5e",
                fillColor: isInside ? "#10b981" : "#f43f5e",
                fillOpacity: 0.1,
                weight: 2,
                dashArray: isInside ? "none" : "5, 5"
              }}
            />
          )}

          {/* Temporary Drawing Polyline */}
          {drawingMode && tempPoints.length > 0 && (
            <>
              {tempPoints.map((pt, index) => (
                <Marker
                  key={`temp-pt-${index}`}
                  position={pt}
                  icon={tempDrawIcon}
                />
              ))}
              <Polygon
                positions={tempPoints}
                pathOptions={{
                  color: "#a855f7",
                  fillColor: "#a855f7",
                  fillOpacity: 0.15,
                  weight: 2,
                }}
              />
            </>
          )}

          {/* Draggable Asset Marker */}
          {!drawingMode && (
            <Marker
              position={assetPos}
              draggable={true}
              eventHandlers={eventHandlers}
              ref={markerRef}
              icon={assetIcon}
            >
              <Popup>
                <div className="text-xs p-1 font-sans">
                  <span className="font-bold text-cyan-400 block mb-1">Interactive Asset Tracker</span>
                  Drag me outside the geofence area to trigger real-time containment updates!
                </div>
              </Popup>
            </Marker>
          )}

          {/* Career Milestones Markers */}
          {MILESTONES.map((milestone) => (
            <Marker
              key={milestone.name}
              position={milestone.coords}
              icon={milestone.status === "active" ? activeIcon : pastIcon}
            >
              <Popup>
                <div className="text-xs p-1 font-sans max-w-[200px]">
                  <span className="font-bold text-white block">{milestone.name}</span>
                  <span className="text-[10px] text-zinc-400 font-medium block">{milestone.role}</span>
                  <span className="text-[10px] text-zinc-500 block mb-1.5">{milestone.location}</span>
                  <p className="text-zinc-300 text-[11px] leading-normal">{milestone.details}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
