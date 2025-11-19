import { create } from "zustand";

// Carousel transition phases - simplified for center content only
type TransitionPhase = 'idle' | 'transitioning';

// Card positions: prev (left side), active (center), next (right side), hidden
type CardPosition = 'prev' | 'active' | 'next' | 'hidden';

interface CarouselState {
  currentPhase: TransitionPhase;
  activeIndex: number;
  // Track each card's current position (key = card index)
  cardPositions: Map<number, CardPosition>;
  initializePositions: (totalCards: number, activeIndex: number) => void;
  startTransition: (newActiveIndex: number) => void;
  endTransition: () => void;
  setActiveIndex: (index: number) => void;
  getCardPosition: (cardIndex: number, activeIndex: number, totalCards: number) => CardPosition;
}

export const useCarouselStore = create<CarouselState>((set, get) => ({
  currentPhase: 'idle',
  activeIndex: 0,
  cardPositions: new Map(),

  // Helper to calculate card position based on active index
  getCardPosition: (cardIndex: number, activeIndex: number, totalCards: number): CardPosition => {
    const diff = (cardIndex - activeIndex + totalCards) % totalCards;

    if (diff === 0) return 'active';
    if (diff === totalCards - 1 || diff === -1) return 'prev';
    if (diff === 1) return 'next';
    return 'hidden';
  },

  // Initialize positions on mount
  initializePositions: (totalCards: number, activeIndex: number) => {
    const getCardPosition = get().getCardPosition;
    const positions = new Map<number, CardPosition>();
    for (let i = 0; i < totalCards; i++) {
      positions.set(i, getCardPosition(i, activeIndex, totalCards));
    }
    set({ cardPositions: positions });
  },

  // Start transition - Framer Motion handles animations
  startTransition: (newActiveIndex: number) => {
    const getCardPosition = get().getCardPosition;
    const totalCards = get().cardPositions.size;

    // Recalculate card positions for new active index
    const newPositions = new Map<number, CardPosition>();
    for (let i = 0; i < totalCards; i++) {
      newPositions.set(i, getCardPosition(i, newActiveIndex, totalCards));
    }

    set({
      currentPhase: 'transitioning',
      activeIndex: newActiveIndex,
      cardPositions: newPositions,
    });
  },

  // End transition - back to idle
  endTransition: () => {
    set({ currentPhase: 'idle' });
  },

  setActiveIndex: (index) => set({ activeIndex: index }),
}));
