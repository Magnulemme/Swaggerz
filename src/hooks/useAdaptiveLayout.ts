import { useState, useEffect } from "react";

interface UseAdaptiveLayoutOptions {
  /** Height of the title section in pixels */
  titleHeight: number;
  /** Minimum height required for cards in pixels */
  cardMinHeight?: number;
  /** Height of the navbar in pixels */
  navbarHeight?: number;
  /** Additional safety margin in pixels */
  safetyMargin?: number;
}

interface UseAdaptiveLayoutReturn {
  /** Whether the title should be sticky */
  isTitleSticky: boolean;
  /** Available viewport height */
  viewportHeight: number;
  /** Whether there's enough space for the current layout */
  hasEnoughSpace: boolean;
}

/**
 * Hook that calculates if there's enough viewport space to make the title sticky.
 * If viewport is too small, title remains visible at the start but not sticky,
 * allowing cards to have full space.
 *
 * @example
 * const { isTitleSticky } = useAdaptiveLayout({
 *   titleHeight: 200,
 *   cardMinHeight: 400,
 * });
 */
export function useAdaptiveLayout({
  titleHeight,
  cardMinHeight = 400,
  navbarHeight = 70,
  safetyMargin = 100,
}: UseAdaptiveLayoutOptions): UseAdaptiveLayoutReturn {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    // Initial measurement
    updateViewportHeight();

    // Update on resize
    window.addEventListener("resize", updateViewportHeight);
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  // Calculate required space: navbar + top offset + title + minimum card height + safety margin
  // Use the larger top offset (150px) for conservative calculation
  const topOffset = 150;
  const requiredSpace = navbarHeight + topOffset + titleHeight + cardMinHeight + safetyMargin;

  // Title is sticky only if there's enough space
  const hasEnoughSpace = viewportHeight >= requiredSpace;
  const isTitleSticky = hasEnoughSpace;

  return {
    isTitleSticky,
    viewportHeight,
    hasEnoughSpace,
  };
}
