export type Language = 'es' | 'en'

export const translations = {
  es: {
    header: {
      title: 'Mapa de Fósiles de Dinosaurios',
      subtitle: 'Base de Datos Global de Paleontología',
      map: 'Mapa',
      discoveries: 'Descubrimientos',
      species: 'Especies',
      about: 'Acerca de'
    },
    search: 'Buscar ubicaciones...',
    legend: 'Leyenda',
    fossilSite: 'Sitio de Descubrimiento de Fósil',
    selectedSite: 'Sitio Seleccionado',
    loading: 'Cargando...',
    noData: 'Sin datos disponibles',
    language: 'Idioma',
    spanish: 'Español',
    english: 'English',
    stats: 'Estadísticas',
    totalDiscoveries: 'Descubrimientos Totales',
    totalSpecies: 'Especies Totales',
    totalLocations: 'Ubicaciones Totales',
    discoveries: 'Descubrimientos',
    species: 'Especies',
    locations: 'Ubicaciones',
    details: 'Detalles',
    period: 'Período',
    era: 'Era',
    length: 'Longitud',
    yearDiscovered: 'Año Descubierto',
    description: 'Descripción',
    close: 'Cerrar',
    error: 'Error al cargar datos'
  },
  en: {
    header: {
      title: 'Dinosaur Fossil Map',
      subtitle: 'Global Paleontology Database',
      map: 'Map',
      discoveries: 'Discoveries',
      species: 'Species',
      about: 'About'
    },
    search: 'Search locations...',
    legend: 'Legend',
    fossilSite: 'Fossil Discovery Site',
    selectedSite: 'Selected Site',
    loading: 'Loading...',
    noData: 'No data available',
    language: 'Language',
    spanish: 'Español',
    english: 'English',
    stats: 'Stats',
    totalDiscoveries: 'Total Discoveries',
    totalSpecies: 'Total Species',
    totalLocations: 'Total Locations',
    discoveries: 'Discoveries',
    species: 'Species',
    locations: 'Locations',
    details: 'Details',
    period: 'Period',
    era: 'Era',
    length: 'Length',
    yearDiscovered: 'Year Discovered',
    description: 'Description',
    close: 'Close',
    error: 'Error loading data'
  }
}

export function t(key: string, language: Language): string {
  const keys = key.split('.')
  let value: any = translations[language]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
