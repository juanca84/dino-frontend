"use client";

import { useState } from "react";
import { MapContainer } from "@/components/map-container";
import { FossilSidebar } from "@/components/fossil-sidebar";
import { fossilData } from "@/lib/fossil-data";

export function FossilMap() {
  const [selectedFossil, setSelectedFossil] = useState<string | null>(null);

  return (
    <div className="relative h-[calc(100vh-280px)] min-h-[500px]">
      <MapContainer
        fossils={fossilData}
        onSelectFossil={setSelectedFossil}
        selectedFossil={selectedFossil}
      />
      <FossilSidebar
        fossil={fossilData.find((f) => f.id === selectedFossil) || null}
        onClose={() => setSelectedFossil(null)}
      />
    </div>
  );
}
