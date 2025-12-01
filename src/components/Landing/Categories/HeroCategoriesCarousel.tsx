"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CategoryCarouselCard } from "./CategoryCarouselCard";
import { CarouselBackground } from "./CarouselBackground";
import { CarouselTitleAndInfo } from "./CarouselTitleAndInfo";
import { useCarouselStore } from "@/store/useCarouselStore";
import {
  CATEGORY_CARDS,
  CAROUSEL_TIMINGS,
  type ImageConfig,
} from "./categories.constants";
import { getCardSlotConfig } from "./carouselPositions";

interface HeroCategoriesCarouselProps {
  images?: ImageConfig[];
  className?: string;
}

export function HeroCategoriesCarousel({ className = "" }: HeroCategoriesCarouselProps) {
  const {
    currentPhase,
    activeIndex,
    startTransition,
    endTransition,
    initializePositions,
  } = useCarouselStore();
  const [previousIndex, setPreviousIndex] = useState(0);
  const isTransitioning = currentPhase === "transitioning";
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [_autoplayKey, setAutoplayKey] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [gridCardPosition, setGridCardPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isMainCardHovered, setIsMainCardHovered] = useState(false);
  const [isSideCardHovered, setIsSideCardHovered] = useState(false);

  // Wrap setGridCardPosition in useCallback to prevent unnecessary re-renders
  const handleCardPositionCalculated = useCallback((position: { left: number; top: number }) => {
    setGridCardPosition(position);
  }, []);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isXL, setIsXL] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Initialize card positions on mount
  useEffect(() => {
    initializePositions(CATEGORY_CARDS.length, 0);
  }, [initializePositions]);

  const goToPrev = () => {
    if (isTransitioning) return;

    setAutoplayEnabled(false);
    setPreviousIndex(activeIndex);
    const newIndex =
      activeIndex === 0 ? CATEGORY_CARDS.length - 1 : activeIndex - 1;

    // Start transition - Framer Motion handles animations automatically
    startTransition(newIndex);

    // End transition and re-enable autoplay
    setTimeout(() => {
      endTransition();
      setAutoplayEnabled(true);
      setAutoplayKey((prev) => prev + 1);
    }, CAROUSEL_TIMINGS.TRANSITION_DURATION);
  };

  const goToNext = () => {
    if (isTransitioning) return;

    setAutoplayEnabled(false);
    setPreviousIndex(activeIndex);
    const newIndex =
      activeIndex === CATEGORY_CARDS.length - 1 ? 0 : activeIndex + 1;

    // Start transition - Framer Motion handles animations automatically
    startTransition(newIndex);

    // End transition and re-enable autoplay
    setTimeout(() => {
      endTransition();
      setAutoplayEnabled(true);
      setAutoplayKey((prev) => prev + 1);
    }, CAROUSEL_TIMINGS.TRANSITION_DURATION);
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || isTransitioning || !isDragging) return;
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) return;

    const diff = touchEnd - touchStart;

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);

    // Swipe right (positive diff) = go prev
    // Swipe left (negative diff) = go next
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTransitioning) return;
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!touchStart || isTransitioning || !isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd || isTransitioning) return;

    const diff = touchStart - touchEnd;

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);

    // Mouse: left drag (positive diff) = go next
    // Mouse: right drag (negative diff) = go prev
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Detect touch device capability
  useEffect(() => {
    const pointerMediaQuery = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(pointerMediaQuery.matches); // Set initial value on mount

    const handlePointerChange = (e: MediaQueryListEvent) =>
      setIsTouchDevice(e.matches);

    pointerMediaQuery.addEventListener("change", handlePointerChange);
    return () =>
      pointerMediaQuery.removeEventListener("change", handlePointerChange);
  }, []);

  // Track Desktop (LG) breakpoint
  useEffect(() => {
    const lgMediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(lgMediaQuery.matches); // Set initial value on mount

    const handleLgChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);

    lgMediaQuery.addEventListener("change", handleLgChange);
    return () => lgMediaQuery.removeEventListener("change", handleLgChange);
  }, []);

  // Track XL breakpoint
  useEffect(() => {
    const xlMediaQuery = window.matchMedia("(min-width: 1280px)");
    setIsXL(xlMediaQuery.matches); // Set initial value on mount

    const handleXlChange = (e: MediaQueryListEvent) => setIsXL(e.matches);

    xlMediaQuery.addEventListener("change", handleXlChange);
    return () => xlMediaQuery.removeEventListener("change", handleXlChange);
  }, []);

  // Disable first render flag after mount
  useEffect(() => {
    // Enable transitions after first render
    const timer = setTimeout(() => {
      setIsFirstRender(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Autoplay - DISABLED FOR DEBUG
  // useEffect(() => {
  //   if (!autoplayEnabled || isMainCardHovered || isSideCardHovered || isTransitioning) {
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     if (!document.hidden) {
  //       setPreviousIndex(activeIndex);
  //       const newIndex =
  //         activeIndex === CATEGORY_CARDS.length - 1 ? 0 : activeIndex + 1;
  //       setActiveIndex(newIndex);

  //       // Start transition - Framer Motion handles animations automatically
  //       startTransition(newIndex);

  //       // End transition
  //       setTimeout(() => {
  //         endTransition();
  //         setAutoplayKey((prev) => prev + 1);
  //       }, CAROUSEL_TIMINGS.TRANSITION_DURATION);
  //     }
  //   }, CAROUSEL_TIMINGS.AUTOPLAY_INTERVAL);

  //   return () => clearInterval(interval);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   autoplayEnabled,
  //   isTransitioning,
  //   activeIndex,
  //   isMainCardHovered,
  //   isSideCardHovered,
  //   // Note: autoplayKey is intentionally NOT in deps - it's used to force re-mount when needed
  //   // Note: Zustand store functions (startTransition, etc.) are stable and don't need to be in deps
  // ]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Custom Carousel - Universale per tutti i dispositivi */}
      <div
        className={`relative w-full py-4 pb-16 lg:pb-4 overflow-hidden ${
          !isTouchDevice ? "cursor-grab active:cursor-grabbing" : ""
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...(!isTouchDevice && {
          onMouseDown: handleMouseDown,
          onMouseMove: handleMouseMove,
          onMouseUp: handleMouseUp,
        })}
      >
        {/* Background parallax blur - solo desktop */}
        <CarouselBackground imageUrl={CATEGORY_CARDS[activeIndex].image} />

        {/* Cards container with 3D context */}
        <div
          ref={cardsContainerRef}
          className="relative flex items-center justify-center gap-8 lg:py-8 mx-auto max-w-[1600px] lg:h-[80vh] lg:max-h-[600px]"
          style={{
            perspective: "2000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Render only side cards (prev/next), active card is in grid */}
          {CATEGORY_CARDS.map((card, index) => {
            // Get slot configuration - this is just a simple lookup + assignment
            // No heavy calculations, SLOT_CONFIGS is static
            const slotConfig = getCardSlotConfig(
              index,
              activeIndex,
              CATEGORY_CARDS.length
            );

            const { slotClasses, zIndex, rotateY, translateX, translateY, scale, isHorizontal, isClickable, isActive } = slotConfig;

            // Determine click handler for side cards
            const handleCardClick = () => {
              if (!isClickable || isTransitioning) return;

              // Determine direction based on slot type
              const slotType = slotConfig.slotType;
              if (slotType === 'prev') {
                goToPrev();
              } else if (slotType === 'next') {
                goToNext();
              }
            };

            return (
              <CategoryCarouselCard
                key={index}
                cardIndex={index}
                image={card.image}
                label={card.label}
                badge={card.badge}
                slotClasses={slotClasses}
                zIndex={zIndex}
                rotateY={rotateY}
                translateX={translateX}
                translateY={translateY}
                scale={scale}
                isHorizontal={isHorizontal}
                isClickable={isClickable}
                isActive={isActive}
                onClick={handleCardClick}
                gridPosition={isActive ? gridCardPosition : null}
                centerY={!isActive && gridCardPosition ? gridCardPosition.top : null}
                isFirstRender={isFirstRender}
                isDesktop={isDesktop}
                isXL={isXL}
                onMainCardHoverChange={setIsMainCardHovered}
                onSideCardHoverChange={setIsSideCardHovered}
              />
            );
          })}
        </div>

        {/* Title and Info Grid Layout */}
        <CarouselTitleAndInfo
          currentLabel={CATEGORY_CARDS[activeIndex].label}
          previousLabel={
            isTransitioning && previousIndex !== activeIndex
              ? CATEGORY_CARDS[previousIndex].label
              : undefined
          }
          isTransitioning={isTransitioning}
          collection={CATEGORY_CARDS[activeIndex]}
          previousCollection={
            isTransitioning && previousIndex !== activeIndex
              ? CATEGORY_CARDS[previousIndex]
              : undefined
          }
          onCardPositionCalculated={handleCardPositionCalculated}
          cardsContainerRef={cardsContainerRef}
          isFirstRender={isFirstRender}
          isXL={isXL}
        />
      </div>
    </div>
  );
}
