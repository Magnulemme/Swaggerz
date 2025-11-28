/**
 * Carousel position calculation utilities
 * Separates STATIC slot positions from DYNAMIC card-to-slot assignments
 */

// STATIC: Slot configuration (never changes unless screen size changes)
export interface SlotConfig {
  slotClasses: string;
  zIndex: number;
  rotateY: number;
  translateX: string; // e.g., "calc(-50% - 60vw)"
  translateY: string; // e.g., "-50%"
  scale: number; // e.g., 0.75
  isHorizontal: boolean;
  isClickable: boolean;
}

// Slot types (positions in the carousel)
export type SlotType = 'active' | 'prev' | 'next' | 'prevPrev' | 'nextNext' | 'hidden' | 'hiddenLeft' | 'hiddenRight';

/**
 * STATIC SLOT POSITIONS
 * These never change - they define the physical layout of the carousel
 * Calculate once on mount/resize, reuse forever
 */
export const SLOT_CONFIGS: Record<SlotType, SlotConfig> = {
  // Active card (center) - positioned by grid
  active: {
    slotClasses: "opacity-100",
    zIndex: 20,
    rotateY: 0,
    translateX: "-50%",
    translateY: "-50%",
    scale: 1,
    isHorizontal: false,
    isClickable: false,
  },

  // Previous card (left visible)
  prev: {
    slotClasses: "left-1/2 top-1/2",
    zIndex: 10,
    rotateY: 50,
    translateX: "calc(-50% - 60vw)", // Responsive handled in component
    translateY: "-50%",
    scale: 0.75, // Responsive handled in component
    isHorizontal: true,
    isClickable: true,
  },

  // Next card (right visible)
  next: {
    slotClasses: "left-1/2 top-1/2",
    zIndex: 10,
    rotateY: -50,
    translateX: "calc(-50% + 60vw)", // Responsive handled in component
    translateY: "-50%",
    scale: 0.75, // Responsive handled in component
    isHorizontal: true,
    isClickable: true,
  },

  // PrevPrev (hidden left)
  prevPrev: {
    slotClasses: "left-1/2 top-1/2 opacity-0",
    zIndex: 5,
    rotateY: 50,
    translateX: "calc(-50% - 60vw)",
    translateY: "-50%",
    scale: 0.55,
    isHorizontal: true,
    isClickable: false,
  },

  // NextNext (hidden right)
  nextNext: {
    slotClasses: "left-1/2 top-1/2 opacity-0",
    zIndex: 5,
    rotateY: -50,
    translateX: "calc(-50% + 60vw)",
    translateY: "-50%",
    scale: 0.55,
    isHorizontal: true,
    isClickable: false,
  },

  // Hidden cards (generic, should not be used directly)
  hidden: {
    slotClasses: "opacity-0 invisible",
    zIndex: 0,
    rotateY: 0,
    translateX: "-50%",
    translateY: "-50%",
    scale: 1,
    isHorizontal: false,
    isClickable: false,
  },

  // Hidden cards on the left (ready to enter from left)
  hiddenLeft: {
    slotClasses: "left-1/2 top-1/2 opacity-0 invisible",
    zIndex: 0,
    rotateY: 50,
    translateX: "calc(-50% - 60vw)",
    translateY: "-50%",
    scale: 0.55,
    isHorizontal: true,
    isClickable: false,
  },

  // Hidden cards on the right (ready to enter from right)
  hiddenRight: {
    slotClasses: "left-1/2 top-1/2 opacity-0 invisible",
    zIndex: 0,
    rotateY: -50,
    translateX: "calc(-50% + 60vw)",
    translateY: "-50%",
    scale: 0.55,
    isHorizontal: true,
    isClickable: false,
  },
};

/**
 * DYNAMIC: Determine which slot a card should occupy
 * This is the ONLY thing that changes when activeIndex changes
 */
export function getSlotTypeForCard(
  cardIndex: number,
  activeIndex: number,
  totalCards: number
): SlotType {
  // Calculate circular difference
  const diff = (cardIndex - activeIndex + totalCards) % totalCards;

  // Map difference to slot type
  if (diff === 0) return 'active';
  if (diff === totalCards - 1 || diff === -1) return 'prev';
  if (diff === 1) return 'next';
  if (diff === totalCards - 2 || diff === -2) return 'prevPrev';
  if (diff === 2) return 'nextNext';

  // Hidden cards: determine if they're on the left or right side
  // Cards before active (negative relative position) are on the left
  const isLeftSide = diff > totalCards / 2;
  return isLeftSide ? 'hiddenLeft' : 'hiddenRight';
}

/**
 * Get slot configuration for a specific card
 * Combines static slot config with dynamic assignment
 */
export function getCardSlotConfig(
  cardIndex: number,
  activeIndex: number,
  totalCards: number
): SlotConfig & { slotType: SlotType; isActive: boolean } {
  const slotType = getSlotTypeForCard(cardIndex, activeIndex, totalCards);
  const config = SLOT_CONFIGS[slotType];

  return {
    ...config,
    slotType,
    isActive: slotType === 'active',
  };
}
