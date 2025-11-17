import { create } from "zustand";

// Carousel transition phases:
// 1. exitPhase: Cards moving + exit animations (1400ms)
// 2. centerContentPhase: Show center card content - title, description (happens during phase 1, starts at ~600ms)
// 3. sideLabelsPhase: Show side card labels with wave animation (starts after phase 1 ends)

type TransitionPhase = 'idle' | 'exitPhase' | 'centerContentPhase' | 'sideLabelsPhase';

// Card positions: prev (left side), active (center), next (right side), hidden
type CardPosition = 'prev' | 'active' | 'next' | 'hidden';

interface CarouselState {
  currentPhase: TransitionPhase;
  activeIndex: number;
  // Track each card's current position (key = card index)
  cardPositions: Map<number, CardPosition>;
  // Track previous positions for exit animations
  previousCardPositions: Map<number, CardPosition>;
  initializePositions: (totalCards: number, activeIndex: number) => void;
  startTransition: (totalCards: number, newActiveIndex: number) => void;
  enterCenterContentPhase: () => void;
  enterSideLabelsPhase: () => void;
  endTransition: () => void;
  setActiveIndex: (index: number) => void;
  getCardPosition: (cardIndex: number, activeIndex: number, totalCards: number) => CardPosition;
}

export const useCarouselStore = create<CarouselState>((set, get) => ({
  currentPhase: 'idle',
  activeIndex: 0,
  cardPositions: new Map(),
  previousCardPositions: new Map(),

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
    set({
      cardPositions: positions,
      previousCardPositions: new Map(positions),
    });
  },

  // Phase 1: Start transition - exit animations + card movement
  startTransition: (totalCards: number, newActiveIndex: number) => {
    const currentPositions = get().cardPositions;
    const getCardPosition = get().getCardPosition;

    // Calculate new positions based on new active index
    const newPositions = new Map<number, CardPosition>();
    for (let i = 0; i < totalCards; i++) {
      newPositions.set(i, getCardPosition(i, newActiveIndex, totalCards));
    }

    // Save current positions as previous, update to new positions, start phase
    set({
      previousCardPositions: new Map(currentPositions),
      cardPositions: newPositions,
      currentPhase: 'exitPhase',
    });
  },

  // Phase 2: Center content appears (called from HeroCategories after delay)
  enterCenterContentPhase: () => set({ currentPhase: 'centerContentPhase' }),

  // Phase 3: Side labels appear (called after cards finish moving)
  enterSideLabelsPhase: () => set({ currentPhase: 'sideLabelsPhase' }),

  // End transition - back to idle
  endTransition: () => set({ currentPhase: 'idle' }),

  setActiveIndex: (index) => set({ activeIndex: index }),
}));
