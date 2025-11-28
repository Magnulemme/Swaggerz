import React, { RefObject } from "react";
import { calculateCardPosition, type CardPosition } from "./categories.ui-constants";

interface UseCardPositionCalculationProps {
  mobileCardRef: RefObject<HTMLDivElement | null>;
  desktopCardRef: RefObject<HTMLDivElement | null>;
  cardsContainerRef: RefObject<HTMLDivElement | null>;
  onCardPositionCalculated?: (position: CardPosition) => void;
  isXL: boolean;
}

/**
 * Custom hook for calculating fake card position
 * Handles both mobile and desktop refs
 */
export function useCardPositionCalculation({
  mobileCardRef,
  desktopCardRef,
  cardsContainerRef,
  onCardPositionCalculated,
  isXL,
}: UseCardPositionCalculationProps) {
  React.useLayoutEffect(() => {
    if (!cardsContainerRef.current || !onCardPositionCalculated) return;

    const updatePosition = () => {
      // Determine which ref to use based on viewport
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const activeRef = isDesktop ? desktopCardRef : mobileCardRef;

      if (!activeRef.current || !cardsContainerRef.current) return;

      const fakeCardRect = activeRef.current.getBoundingClientRect();
      const containerRect = cardsContainerRef.current.getBoundingClientRect();

      const position = calculateCardPosition(fakeCardRect, containerRect);

      console.log("📍 Position calculated:", {
        isDesktop,
        fakeCardCenterX: fakeCardRect.left + fakeCardRect.width / 2,
        fakeCardCenterY: fakeCardRect.top + fakeCardRect.height / 2,
        containerLeft: containerRect.left,
        containerTop: containerRect.top,
        position,
        fakeCardRect,
        containerRect,
      });

      onCardPositionCalculated(position);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [onCardPositionCalculated, cardsContainerRef, mobileCardRef, desktopCardRef, isXL]);
}
