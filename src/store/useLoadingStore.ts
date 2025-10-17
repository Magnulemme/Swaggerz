import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  componentsReady: {
    video: boolean;
    shaderText: boolean;
    models3d: boolean;
  };
  setComponentReady: (component: keyof LoadingState['componentsReady']) => void;
  resetLoading: () => void;
  isAllReady: () => boolean;
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  isLoading: true,
  componentsReady: {
    video: false,
    shaderText: false,
    models3d: false,
  },
  setComponentReady: (component) => {
    set((state) => ({
      componentsReady: {
        ...state.componentsReady,
        [component]: true,
      },
    }));

    // Controlla se tutti i componenti sono pronti
    const state = get();
    const allReady = Object.values(state.componentsReady).every((ready) => ready);
    if (allReady) {
      set({ isLoading: false });
    }
  },
  resetLoading: () => set({
    isLoading: true,
    componentsReady: {
      video: false,
      shaderText: false,
      models3d: false,
    },
  }),
  isAllReady: () => {
    const state = get();
    return Object.values(state.componentsReady).every((ready) => ready);
  },
}));
