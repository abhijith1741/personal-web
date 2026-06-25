"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

// Dynamically import MapInner with SSR disabled to prevent Leaflet SSR errors
const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      <span className="text-sm font-medium text-zinc-500 font-mono">
        Initializing Spatial Assets...
      </span>
    </div>
  ),
});

export default function InteractiveMap() {
  return (
    <section id="geomap" className="py-24 px-6 border-t border-zinc-900 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-cyan-500/10 mb-4">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase font-mono">
              Geospatial Demo
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            High-Performance Spatial Engineering
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            A demonstration of spatial tracking and geofence verification logic. Abhijith optimizes real-time mapping systems to process thousands of active markers at 60fps.
          </p>
        </div>

        <MapInner />
      </div>
    </section>
  );
}
