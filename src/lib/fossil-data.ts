export interface Fossil {
  id: string
  species: string
  location: string
  coordinates: { x: number; y: number }
  yearDiscovered: number
  period: string
  era: string
  length: string
  count: number
  description: string
  // NUEVOS CAMPOS QUE PUEDES AGREGAR:
  diet?: string // herbívoro, carnívoro, omnívoro
  type?: string // theropod, sauropod, ceratopsian, etc.
  weight?: string // peso estimado
  speed?: string // velocidad estimada
  discoveredBy?: string // quién descubrió el fósil
  museum?: string // museo donde se aloja
  preservationState?: string // estado de preservación (excelente, bueno, regular)
  region?: string // región geográfica
  formations?: string // formación geológica
  notes?: string // notas adicionales
}

export const fossilData: Fossil[] = [
  {
    id: "1",
    species: "Tyrannosaurus Rex",
    location: "Montana, USA",
    coordinates: { x: 25, y: 35 },
    yearDiscovered: 1990,
    period: "Late Cretaceous",
    era: "68-66 MYA",
    length: "12.3 meters",
    count: 47,
    description:
      "One of the most complete T-Rex specimens ever discovered, featuring an exceptionally well-preserved skull and nearly complete skeletal structure.",
  },
  {
    id: "2",
    species: "Velociraptor",
    location: "Gobi Desert, Mongolia",
    coordinates: { x: 70, y: 38 },
    yearDiscovered: 1971,
    period: "Late Cretaceous",
    era: "75-71 MYA",
    length: "2.1 meters",
    count: 23,
    description:
      'Famous "Fighting Dinosaurs" specimen showing Velociraptor locked in combat with Protoceratops, preserved in sandstone.',
  },
  {
    id: "3",
    species: "Brachiosaurus",
    location: "Tendaguru, Tanzania",
    coordinates: { x: 55, y: 65 },
    yearDiscovered: 1909,
    period: "Late Jurassic",
    era: "154-153 MYA",
    length: "25 meters",
    count: 156,
    description:
      "Massive sauropod remains including vertebrae, limb bones, and partial skull, representing one of the largest land animals ever.",
  },
  {
    id: "4",
    species: "Triceratops",
    location: "Wyoming, USA",
    coordinates: { x: 28, y: 32 },
    yearDiscovered: 2014,
    period: "Late Cretaceous",
    era: "68-66 MYA",
    length: "9 meters",
    count: 89,
    description:
      "Remarkably complete specimen with intact frill and all three horns, providing insights into ceratopsian evolution.",
  },
  {
    id: "5",
    species: "Spinosaurus",
    location: "Kem Kem Beds, Morocco",
    coordinates: { x: 48, y: 48 },
    yearDiscovered: 2008,
    period: "Mid Cretaceous",
    era: "112-97 MYA",
    length: "15 meters",
    count: 34,
    description:
      "Semi-aquatic theropod with distinctive sail-like structure, representing a unique adaptation among large predatory dinosaurs.",
  },
  {
    id: "6",
    species: "Stegosaurus",
    location: "Colorado, USA",
    coordinates: { x: 26, y: 36 },
    yearDiscovered: 1992,
    period: "Late Jurassic",
    era: "155-150 MYA",
    length: "9 meters",
    count: 67,
    description:
      "Well-preserved specimen featuring complete plate arrangement along the back and tail spikes, crucial for understanding defensive adaptations.",
  },
  {
    id: "7",
    species: "Archaeopteryx",
    location: "Solnhofen, Germany",
    coordinates: { x: 52, y: 28 },
    yearDiscovered: 1861,
    period: "Late Jurassic",
    era: "150 MYA",
    length: "0.5 meters",
    count: 12,
    description:
      "Transitional fossil showing both reptilian and avian features, with beautifully preserved feather impressions in limestone.",
  },
  {
    id: "8",
    species: "Diplodocus",
    location: "Utah, USA",
    coordinates: { x: 27, y: 34 },
    yearDiscovered: 1899,
    period: "Late Jurassic",
    era: "154-152 MYA",
    length: "27 meters",
    count: 142,
    description:
      "One of the longest dinosaurs known, with an extremely long neck and whip-like tail, found in the Morrison Formation.",
  },
  {
    id: "9",
    species: "Allosaurus",
    location: "Utah, USA",
    coordinates: { x: 27, y: 35 },
    yearDiscovered: 2001,
    period: "Late Jurassic",
    era: "155-145 MYA",
    length: "9.7 meters",
    count: 78,
    description:
      "Apex predator of the Jurassic period with powerful jaws and sharp teeth, showing evidence of healed injuries from combat.",
  },
  {
    id: "10",
    species: "Parasaurolophus",
    location: "Alberta, Canada",
    coordinates: { x: 22, y: 28 },
    yearDiscovered: 1922,
    period: "Late Cretaceous",
    era: "76-74 MYA",
    length: "10 meters",
    count: 45,
    description:
      "Distinctive duck-billed dinosaur with elaborate cranial crest, likely used for communication and species recognition.",
  },
]
