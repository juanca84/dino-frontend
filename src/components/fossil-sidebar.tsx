"use client";

import { X, Calendar, MapPin, Ruler, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Fossil } from "@/lib/fossil-data";

interface FossilSidebarProps {
  fossil: Fossil | null;
  onClose: () => void;
}

export function FossilSidebar({ fossil, onClose }: FossilSidebarProps) {
  if (!fossil) return null;

  return (
    <div className="absolute top-0 right-0 w-full md:w-96 h-full bg-card border-l border-border shadow-2xl z-30 overflow-y-auto">
      <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Fossil Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Image */}
        <div className="aspect-video rounded-lg overflow-hidden bg-muted border border-border">
          <img
            src={`/.jpg?height=300&width=400&query=${fossil.species}+dinosaur+fossil`}
            alt={fossil.species}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Species Name */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {fossil.species}
          </h3>
          <Badge variant="secondary" className="mb-3">
            {fossil.period}
          </Badge>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {fossil.description}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary/30 rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Location
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {fossil.location}
            </p>
          </div>

          <div className="bg-secondary/30 rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Discovered
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {fossil.yearDiscovered}
            </p>
          </div>

          <div className="bg-secondary/30 rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Length
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {fossil.length}
            </p>
          </div>

          <div className="bg-secondary/30 rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Era
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {fossil.era}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <h4 className="text-sm font-semibold mb-2 text-foreground">
            Excavation Notes
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This specimen was discovered during a systematic paleontological
            survey. The fossil remains include {fossil.count} significant bone
            fragments, providing valuable insights into {fossil.species}{" "}
            morphology and behavior.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            View Full Report
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Share Discovery
          </Button>
        </div>
      </div>
    </div>
  );
}
