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
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

type Dino = { 
  occurrence_no: string; 
  name: string; 
  position: [number, number];
  period?: string;
  yearDiscovered?: number;
  description?: string;
  length?: string;
  era?: string;
  count?: number;
  // Campos de la API real
  class?: string;
  diet?: string;
  family?: string;
  lat?: number;
  lng?: number;
  length_m?: number;
  max_ma?: number;
  min_ma?: number;
  region?: string;
  type?: string;
};

const DinoPopupContent = ({ dino, language }: { dino: Dino; language: string }) => {
  // Calcular rango de tiempo (MYA - millones de años atrás)
  const getTimeRange = () => {
    if (dino.max_ma && dino.min_ma) {
      return `${dino.max_ma}-${dino.min_ma} MYA`;
    }
    return null;
  };

  // Convertir metros a metros con formato
  const getLength = () => {
    if (dino.length_m) {
      return `${dino.length_m} m`;
    }
    return dino.length;
  };

  // Obtener emoji y nombre de dieta traducido
  const getDietInfo = () => {
    if (!dino.diet) return null;
    
    const dietLower = dino.diet.toLowerCase();
    
    if (dietLower.includes('carnivorous') || dietLower === 'carnívoro') {
      return {
        emoji: '🦖',
        name: language === 'es' ? 'Carnívoro' : 'Carnivorous'
      };
    } else if (dietLower.includes('herbivorous') || dietLower === 'herbívoro') {
      return {
        emoji: '🌿',
        name: language === 'es' ? 'Herbívoro' : 'Herbivorous'
      };
    } else if (dietLower.includes('omnivorous') || dietLower === 'omnívoro') {
      return {
        emoji: '🍖🌱',
        name: language === 'es' ? 'Omnívoro' : 'Omnivorous'
      };
    }
    return null;
  };

  const dietInfo = getDietInfo();

  return (
    <div className="w-80 p-3 max-h-96 overflow-y-auto">
      {/* Encabezado */}
      <div className="mb-3 pb-3 border-b-2 border-primary/30">
        <h3 className="text-lg font-bold text-primary mb-1 flex items-center gap-2">
          <span>🦖</span>
          {dino.name}
        </h3>
      </div>

      {/* Información general - 2 columnas */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Clase */}
        {dino.class && (
          <div className="bg-secondary/20 p-2 rounded">
            <p className="font-semibold text-foreground/70 text-xs">
              {language === 'es' ? 'Clase' : 'Class'}
            </p>
            <p className="text-foreground text-sm">{dino.class}</p>
          </div>
        )}

        {/* Tipo */}
        {dino.type && (
          <div className="bg-secondary/20 p-2 rounded">
            <p className="font-semibold text-foreground/70 text-xs">
              {language === 'es' ? 'Tipo' : 'Type'}
            </p>
            <p className="text-foreground text-sm">{dino.type}</p>
          </div>
        )}

        {/* Familia */}
        {dino.family && (
          <div className="bg-secondary/20 p-2 rounded">
            <p className="font-semibold text-foreground/70 text-xs">
              {language === 'es' ? 'Familia' : 'Family'}
            </p>
            <p className="text-foreground text-sm">{dino.family}</p>
          </div>
        )}

        {/* Dieta con emoji */}
        {dietInfo && (
          <div className="bg-accent/20 p-2 rounded border border-accent/30">
            <p className="font-semibold text-foreground/70 text-xs">
              {language === 'es' ? 'Dieta' : 'Diet'}
            </p>
            <p className="text-foreground text-sm font-medium flex items-center gap-2">
              <span className="text-lg">{dietInfo.emoji}</span>
              {dietInfo.name}
            </p>
          </div>
        )}

        {/* Región */}
        {dino.region && (
          <div className="bg-secondary/20 p-2 rounded">
            <p className="font-semibold text-foreground/70 text-xs">
              {language === 'es' ? 'Región' : 'Region'}
            </p>
            <p className="text-foreground text-sm">{dino.region}</p>
          </div>
        )}

        {/* Longitud */}
        {getLength() && (
          <div className="bg-secondary/20 p-2 rounded">
            <p className="font-semibold text-foreground/70 text-xs">
              {language === 'es' ? 'Longitud' : 'Length'}
            </p>
            <p className="text-foreground text-sm">{getLength()}</p>
          </div>
        )}

        {/* Rango de tiempo */}
        {getTimeRange() && (
          <div className="bg-secondary/20 p-2 rounded col-span-2">
            <p className="font-semibold text-foreground/70 text-xs">
              {language === 'es' ? 'Período (millones de años atrás)' : 'Period (Million Years Ago)'}
            </p>
            <p className="text-foreground text-sm font-medium">{getTimeRange()}</p>
          </div>
        )}
      </div>

      {/* Coordenadas */}
      {(dino.lat || dino.lng) && (
        <div className="mb-3 p-2 bg-accent/10 rounded border border-accent/30">
          <p className="font-semibold text-foreground/70 text-xs mb-1">
            {language === 'es' ? 'Ubicación Geográfica' : 'Geographic Location'}
          </p>
          <p className="text-foreground text-xs">
            {dino.lat?.toFixed(4)}, {dino.lng?.toFixed(4)}
          </p>
        </div>
      )}

      {/* Descripción */}
      {dino.description && (
        <div className="mt-3 pt-3 border-t border-primary/30">
          <p className="font-semibold text-foreground/70 mb-1 text-xs">
            {language === 'es' ? 'Descripción' : 'Description'}
          </p>
          <p className="text-xs text-foreground leading-relaxed">{dino.description}</p>
        </div>
      )}
    </div>
  );
};

const boundsToKey = (bounds: L.LatLngBounds) => {
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  return `${sw.lat.toFixed(2)},${sw.lng.toFixed(2)},${ne.lat.toFixed(
    2
  )},${ne.lng.toFixed(2)}`;
};

const DinoBoundsLoader = ({
  onBoundsChange,
}: {
  onBoundsChange: (bounds: L.LatLngBounds) => void;
}) => {
  useMapEvents({
    moveend: (e) => {
      onBoundsChange(e.target.getBounds());
    },
    zoomend: (e) => {
      onBoundsChange(e.target.getBounds());
    },
  });
  return null;
};

const DinoMap: React.FC = () => {
  const [dinos, setDinos] = useState<Dino[]>([]);
  const boundsRef = useRef<L.LatLngBounds | null>(null);
  const { language } = useLanguage();

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
            <Popup>
              <DinoPopupContent dino={dino} language={language} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default DinoMap;
