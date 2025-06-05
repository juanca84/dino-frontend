import { create } from "zustand";

export type Dino = {
  id: string;
  name: string;
  era: string;
  lat: number;
  lng: number;
};

type DinoState = {
  dinos: Dino[];
  setDinos: (dinos: Dino[]) => void;
};

export const useDinoStore = create<DinoState>((set) => ({
  dinos: [],
  setDinos: (dinos) => set({ dinos }),
}));
