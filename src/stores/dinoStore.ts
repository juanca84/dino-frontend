import { create } from "zustand";

export type Dino = {
  occurrence_no: string;
  name: string;
  era: string;
  position: [number, number];
};

type DinoState = {
  cache: Record<string, Dino[]>;
  setCache: (key: string, dinos: Dino[]) => void;
  getDinos: (key: string) => Dino[] | undefined;
};

export const useDinoStore = create<DinoState>((set, get) => ({
  cache: {},
  setCache: (key, dinos) => set((state) => ({
    cache: { ...state.cache, [key]: dinos }
  })),
  getDinos: (key) => get().cache[key],
}));
