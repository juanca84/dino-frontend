import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../api/axios";
import { useDinoStore } from "../stores/dinoStore";

type Dino = { occurrence_no: string; name: string; position: [number, number] };

function boundsToKey(bounds: L.LatLngBounds) {
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  return `${sw.lat.toFixed(2)},${sw.lng.toFixed(2)},${ne.lat.toFixed(
    2
  )},${ne.lng.toFixed(2)}`;
}

function DinoBoundsLoader({
  onBoundsChange,
}: {
  onBoundsChange: (bounds: L.LatLngBounds) => void;
}) {
  useMapEvents({
    moveend: (e) => {
      onBoundsChange(e.target.getBounds());
    },
    zoomend: (e) => {
      onBoundsChange(e.target.getBounds());
    },
  });
  return null;
}

export default function DinoMap() {
  const [dinos, setDinos] = useState<Dino[]>([]);
  const boundsRef = useRef<L.LatLngBounds | null>(null);

  const setCache = useDinoStore((state) => state.setCache);
  const getDinos = useDinoStore((state) => state.getDinos);

  const fetchDinos = (bounds: L.LatLngBounds) => {
    const key = boundsToKey(bounds);
    const cached = getDinos(key);
    if (cached) {
      setDinos(cached);
      return;
    }
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    api
      .get(
        `/dinosaurs?swLat=${sw.lat}&swLng=${sw.lng}&neLat=${ne.lat}&neLng=${ne.lng}`
      )
      .then((res) => {
        const dinos = res.data.map((d: any) => ({
          ...d,
          position: [d.lat, d.lng] as [number, number],
        }));
        setCache(key, dinos);
        setDinos(dinos);
      });
  };

  useEffect(() => {
    // Bounds that roughly cover the continental United States
    const initialBounds = L.latLngBounds([
      [24.396308, -124.848974], // SW corner (southern CA/HI line approx)
      [49.384358, -66.885444], // NE corner (northern ME)
    ]);
    fetchDinos(initialBounds);
    boundsRef.current = initialBounds;
    // eslint-disable-next-line
  }, []);

  const handleBoundsChange = (bounds: L.LatLngBounds) => {
    if (!boundsRef.current || !boundsRef.current.equals(bounds)) {
      fetchDinos(bounds);
      boundsRef.current = bounds;
    }
  };

  return (
    <MapContainer
      // Centered on the geographic center of the contiguous United States
      center={[39.8283, -98.5795]}
      zoom={5}
      className="h-screen w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DinoBoundsLoader onBoundsChange={handleBoundsChange} />
      <MarkerClusterGroup>
        {dinos.map((dino) => (
          <Marker key={dino.occurrence_no} position={dino.position}>
            <Popup>🦖 {dino.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
