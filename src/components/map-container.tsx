"use client"

import { Search, ZoomIn, ZoomOut, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Fossil } from "@/lib/fossil-data"

interface MapContainerProps {
  fossils: Fossil[]
  onSelectFossil: (id: string) => void
  selectedFossil: string | null
}

export function MapContainer({ fossils, onSelectFossil, selectedFossil }: MapContainerProps) {
  return (
    <div className="relative w-full h-full bg-muted/30">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search locations..." className="pl-9 w-64 bg-card border-border" />
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button size="icon" variant="secondary" className="bg-card border-border">
          <Layers className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="bg-card border-border">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="bg-card border-border">
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Simplified Map Visualization */}
      <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-blue-100 to-blue-50">
        {/* Map Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Fossil Markers */}
        <div className="absolute inset-0">
          {fossils.map((fossil) => (
            <button
              key={fossil.id}
              onClick={() => onSelectFossil(fossil.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                selectedFossil === fossil.id ? "scale-125 z-20" : "z-10"
              }`}
              style={{
                left: `${fossil.coordinates.x}%`,
                top: `${fossil.coordinates.y}%`,
              }}
            >
              <div className={`relative ${selectedFossil === fossil.id ? "animate-pulse" : ""}`}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 transition-colors ${
                    selectedFossil === fossil.id
                      ? "bg-accent border-accent-foreground"
                      : "bg-primary border-primary-foreground hover:bg-accent hover:border-accent-foreground"
                  }`}
                >
                  <span className="text-xs font-bold text-primary-foreground">{fossil.count}</span>
                </div>
                {selectedFossil === fossil.id && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card px-2 py-1 rounded text-xs font-medium border border-border shadow-lg">
                    {fossil.location}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-4 shadow-lg">
        <h3 className="text-sm font-semibold mb-2 text-foreground">Legend</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-6 h-6 rounded-full bg-primary border-2 border-primary-foreground" />
          <span>Fossil Discovery Site</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <div className="w-6 h-6 rounded-full bg-accent border-2 border-accent-foreground" />
          <span>Selected Site</span>
        </div>
      </div>
    </div>
  )
}
