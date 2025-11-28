// UI Constants for Categories Components
// This file contains all reusable styles, classNames, and UI configurations

import type { CategoryCard } from "./categories.constants";

// ============================================================================
// BADGE CONFIGURATIONS
// ============================================================================

export type BadgeType = "hot" | "sale" | "new" | "exclusive";

export interface BadgeConfig {
  gradient: string;
  shimmer: string;
  textColor: string;
}

export const BADGE_CONFIGS: Record<BadgeType, BadgeConfig> = {
  hot: {
    gradient: "bg-gradient-to-r from-red-900 via-red-600 to-red-900",
    shimmer:
      "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(248, 113, 113, 0.6) 50%, transparent 70%, transparent 100%)",
    textColor: "text-red-400",
  },
  new: {
    gradient: "bg-gradient-to-r from-emerald-900 via-emerald-600 to-emerald-900",
    shimmer:
      "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(52, 211, 153, 0.6) 50%, transparent 70%, transparent 100%)",
    textColor: "text-emerald-400",
  },
  exclusive: {
    gradient: "bg-gradient-to-r from-purple-900 via-purple-600 to-purple-900",
    shimmer:
      "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(192, 132, 252, 0.6) 50%, transparent 70%, transparent 100%)",
    textColor: "text-purple-400",
  },
  sale: {
    gradient: "bg-gradient-to-r from-amber-900 via-amber-600 to-amber-900",
    shimmer:
      "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(251, 191, 36, 0.6) 50%, transparent 70%, transparent 100%)",
    textColor: "text-amber-400",
  },
};

// ============================================================================
// ANIMATION CONFIGURATIONS
// ============================================================================

export const ANIMATION_CONFIGS = {
  slideUpIn: {
    name: "slideUpIn",
    duration: "0.8s",
    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
    baseDelay: 0.6, // seconds
    charDelay: 0.02, // seconds between characters
  },
  slideUpOut: {
    name: "slideUpOut",
    duration: "0.6s",
    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
    baseDelay: 0,
    charDelay: 0.02,
  },
  fadeIn: {
    name: "fadeIn",
    duration: "0.6s",
    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
    delay: 0.3,
  },
  badge: {
    duration: 0.6,
    delay: 0.3,
    easing: [0.65, 0, 0.35, 1] as [number, number, number, number],
  },
  shimmer: {
    duration: 3,
    ease: "linear",
  },
  label: {
    duration: 0.8,
    delay: 0.6,
    charDelay: 0.02,
    easing: [0.65, 0, 0.35, 1] as [number, number, number, number],
  },
  arrow: {
    duration: 0.6,
    delay: 0.08,
    easing: [0.65, 0, 0.35, 1] as [number, number, number, number],
  },
} as const;

// ============================================================================
// CARD DIMENSIONS
// ============================================================================

export const CARD_DIMENSIONS = {
  mobile: {
    width: "70vw",
    maxWidth: "350px",
    height: "50vh",
    maxHeight: "450px",
  },
  desktop: {
    width: "70vw",
    maxWidth: "300px",
    height: "70vh",
    maxHeight: "450px",
  },
  desktopXL: {
    width: "70vw",
    maxWidth: "350px",
    height: "70vh",
    maxHeight: "450px",
  },
} as const;

// ============================================================================
// RESPONSIVE HELPERS
// ============================================================================

export interface CardDimensions {
  width: string;
  maxWidth: string;
  height: string;
  maxHeight: string;
}

export function getCardDimensions(
  isDesktop: boolean,
  isXL: boolean
): CardDimensions {
  if (isDesktop && !isXL) return CARD_DIMENSIONS.desktop;
  if (isDesktop && isXL) return CARD_DIMENSIONS.desktopXL;
  return CARD_DIMENSIONS.mobile;
}

// ============================================================================
// CLASSNAMES UTILITIES
// ============================================================================

export const HOVER_CLASSES = {
  brand: "transition-colors duration-300 hover:text-brand",
  brandBorder:
    "transition-all duration-500 border border-white/10 hover:border-brand-subtle",
  arrow:
    "transition-all duration-300 hover:text-brand hover:translate-x-0.5 hover:-translate-y-0.5",
  underline:
    "absolute left-0 bottom-0 w-0 h-[2px] bg-brand transition-all duration-300 group-hover:w-full",
} as const;

export const TEXT_CLASSES = {
  categoryNumber: "text-brand/40 text-xs font-jost font-medium",
  categoryNumberLarge: "text-lg xl:text-xl font-jost font-semibold",
  title: {
    mobile: "text-3xl md:text-4xl font-black tracking-tight leading-none text-center text-white whitespace-nowrap font-jost",
    desktop: "text-6xl xl:text-7xl font-black drop-shadow-2xl tracking-tight leading-none text-center px-4 text-white whitespace-nowrap font-jost",
  },
  label: {
    side: "font-light text-2xl xl:text-3xl tracking-[0.2em] uppercase drop-shadow-lg",
  },
  description: {
    mobile: "text-light-secondary text-sm leading-relaxed font-jost break-words text-left",
    desktop: "text-light-secondary text-base xl:text-lg leading-relaxed font-jost break-words text-left",
  },
  cta: "text-sm font-semibold text-brand font-jost",
  itemCount: "text-white text-4xl xl:text-5xl font-light tabular-nums font-jost",
  itemLabel: "text-white/40 text-sm font-light uppercase tracking-wider font-jost",
} as const;

export const TRANSITION_CLASSES = {
  card: "transition-all duration-[1200ms]",
  cardEasing: "cubic-bezier(0.3, 0, 0.8, 1)",
  image: "transition-all duration-[1400ms]",
  imageEasing: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

// ============================================================================
// LAYOUT UTILITIES
// ============================================================================

export function getCategoryNumberFormatted(index: number): string {
  return `[${String(index + 1).padStart(2, "0")}]`;
}

export function shouldRenderLabel(
  currentPosition: string | null
): boolean {
  return currentPosition === "prev" || currentPosition === "next";
}

// ============================================================================
// SLOT POSITION CALCULATIONS
// ============================================================================

export interface SlotPosition {
  slotClasses: string;
  zIndex: number;
  rotateY: number;
  isHorizontal: boolean;
  isClickable: boolean;
}

export function calculateSlotPosition(
  diff: number,
  totalCards: number
): SlotPosition {
  if (diff === 0) {
    // Active card (center)
    return {
      slotClasses: "scale-100 opacity-100",
      zIndex: 20,
      rotateY: 0,
      isHorizontal: false,
      isClickable: false,
    };
  }

  if (diff === totalCards - 1 || diff === -1) {
    // Previous card (left visible)
    return {
      slotClasses:
        "top-1/2 -translate-y-1/2 -translate-x-[calc(50%+60vw)] md:-translate-x-[calc(50%+42vw)] lg:-translate-x-[calc(50%+38vw)] scale-[0.75] md:scale-[0.6] lg:scale-[0.6]",
      zIndex: 10,
      rotateY: 50,
      isHorizontal: true,
      isClickable: true,
    };
  }

  if (diff === 1) {
    // Next card (right visible)
    return {
      slotClasses:
        "top-1/2 -translate-y-1/2 translate-x-[calc(-50%+60vw)] md:translate-x-[calc(-50%+42vw)] lg:translate-x-[calc(-50%+38vw)] scale-[0.75] md:scale-[0.6] lg:scale-[0.6]",
      zIndex: 10,
      rotateY: -50,
      isHorizontal: true,
      isClickable: true,
    };
  }

  if (diff === totalCards - 2 || diff === -2) {
    // PrevPrev (hidden left)
    return {
      slotClasses:
        "top-1/2 -translate-y-1/2 -translate-x-[calc(50%+60vw)] md:-translate-x-[calc(50%+42vw)] lg:-translate-x-[calc(50%+38vw)] scale-[0.55] md:scale-[0.6] lg:scale-[0.6] opacity-0",
      zIndex: 5,
      rotateY: 50,
      isHorizontal: true,
      isClickable: false,
    };
  }

  if (diff === 2) {
    // NextNext (hidden right)
    return {
      slotClasses:
        "top-1/2 -translate-y-1/2 translate-x-[calc(-50%+60vw)] md:translate-x-[calc(-50%+42vw)] lg:translate-x-[calc(-50%+38vw)] scale-[0.55] md:scale-[0.6] lg:scale-[0.6] opacity-0",
      zIndex: 5,
      rotateY: -50,
      isHorizontal: true,
      isClickable: false,
    };
  }

  // Hidden cards
  return {
    slotClasses: "-translate-x-1/2 opacity-0 invisible",
    zIndex: 0,
    rotateY: 0,
    isHorizontal: false,
    isClickable: false,
  };
}

// ============================================================================
// WORD STYLING (for AnimatedText)
// ============================================================================

export type WordStyle = "bold" | "normal";

export function getWordStyle(word: string): WordStyle {
  const lowerWord = word.toLowerCase();
  const boldKeywords = [
    "oversize",
    "essenziali",
    "bold",
    "premium",
    "statement",
    "attitudine",
    "comfort",
    "tech",
  ];
  return boldKeywords.includes(lowerWord) ? "bold" : "normal";
}

// ============================================================================
// POSITION CALCULATION
// ============================================================================

export interface CardPosition {
  left: number;
  top: number;
}

export function calculateCardPosition(
  fakeCardRect: DOMRect,
  containerRect: DOMRect
): CardPosition {
  const fakeCardCenterX = fakeCardRect.left + fakeCardRect.width / 2;
  const fakeCardCenterY = fakeCardRect.top + fakeCardRect.height / 2;

  const fakeCardRelativeX = fakeCardCenterX - containerRect.left;
  const fakeCardRelativeY = fakeCardCenterY - containerRect.top;

  return {
    left: fakeCardRelativeX,
    top: fakeCardRelativeY,
  };
}

// ============================================================================
// TYPE GUARDS & HELPERS
// ============================================================================

export function isBadgeType(value: string | undefined): value is BadgeType {
  return value !== undefined && value in BADGE_CONFIGS;
}

export function getBadgeConfig(badge?: BadgeType): BadgeConfig | null {
  if (!badge || !isBadgeType(badge)) return null;
  return BADGE_CONFIGS[badge];
}

// ============================================================================
// ANIMATION KEY GENERATORS
// ============================================================================

export function generateAnimationKey(
  prefix: string,
  collection: CategoryCard,
  suffix?: string
): string {
  const parts = [prefix, collection.label];
  if (suffix) parts.push(suffix);
  return parts.join("-");
}

// ============================================================================
// SVG CONFIGURATIONS
// ============================================================================

export const SVG_PATHS = {
  diagonalArrow: "M4 12L12 4M12 4H6M12 4V10",
} as const;

export const SVG_DIMENSIONS = {
  arrow: {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
  },
  arrowLarge: {
    width: "24",
    height: "24",
    viewBox: "0 0 16 16",
  },
} as const;

// ============================================================================
// MEDIA QUERIES
// ============================================================================

export const BREAKPOINTS = {
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
} as const;

// ============================================================================
// CAROUSEL SPECIFIC CONSTANTS
// ============================================================================

export const CAROUSEL_TIMING = {
  transitionDuration: 1200, // ms
  imageTransitionDuration: 1400, // ms
  descriptionUpdateDelay: 400, // ms - for spacer description update
} as const;
