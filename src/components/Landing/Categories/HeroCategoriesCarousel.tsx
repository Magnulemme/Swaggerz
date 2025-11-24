"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CategoryCarouselCard } from "./CategoryCarouselCard";
import { CarouselBackground } from "./CarouselBackground";
import { CarouselTitleAndInfo } from "./CarouselTitleAndInfo";
import { SectionTitle } from "../SectionTitle";
import { useCarouselStore } from "@/store/useCarouselStore";
import {
  CATEGORY_CARDS,
  CAROUSEL_TIMINGS,
  type ImageConfig,
} from "./categories.constants";

interface HeroCategoriesCarouselProps {
  images?: ImageConfig[];
  className?: string;
}

export function HeroCategoriesCarousel({ className = "" }: HeroCategoriesCarouselProps) {
  const {
    currentPhase,
    startTransition,
    endTransition,
    initializePositions,
  } = useCarouselStore();
  const [activeIndex, setActiveIndex] = useState(0);
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
    setActiveIndex(newIndex);

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
    setActiveIndex(newIndex);

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

  // Autoplay - stop durante hover
  useEffect(() => {
    if (!autoplayEnabled || isMainCardHovered || isSideCardHovered || isTransitioning) {
      return;
    }

    const interval = setInterval(() => {
      if (!document.hidden) {
        setPreviousIndex(activeIndex);
        const newIndex =
          activeIndex === CATEGORY_CARDS.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);

        // Start transition - Framer Motion handles animations automatically
        startTransition(newIndex);

        // End transition
        setTimeout(() => {
          endTransition();
          setAutoplayKey((prev) => prev + 1);
        }, CAROUSEL_TIMINGS.TRANSITION_DURATION);
      }
    }, CAROUSEL_TIMINGS.AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    autoplayEnabled,
    isTransitioning,
    activeIndex,
    isMainCardHovered,
    isSideCardHovered,
    // Note: autoplayKey is intentionally NOT in deps - it's used to force re-mount when needed
    // Note: Zustand store functions (startTransition, etc.) are stable and don't need to be in deps
  ]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Title */}
      <div className="px-md md:px-lg lg:px-xl xl:px-2xl">
        <SectionTitle
          title="Esplora le"
          shaderText="Categorie"
          description="Trova il tuo stile perfetto tra le nostre categorie curate"
          size="md"
        />
      </div>

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
            // Calculate relative position to activeIndex
            const diff =
              (index - activeIndex + CATEGORY_CARDS.length) %
              CATEGORY_CARDS.length;

            // Determine which slot this card belongs to
            let slotClasses = "";
            let zIndex = 0;
            let rotateY = 0; // 3D rotation on Y axis
            let isHorizontal = false; // Controls width/height swap

            if (diff === 0) {
              // This is the active card (center) - positioned at grid location
              slotClasses = "scale-100 opacity-100";
              zIndex = 20;
              rotateY = 0;
              isHorizontal = false;
            } else if (diff === CATEGORY_CARDS.length - 1 || diff === -1) {
              // This is prev (left visible) - rotated + horizontal dimensions + più piccola e spostata
              slotClasses =
                "top-1/2 -translate-y-1/2 left-[-10%] md:left-[8%] lg:left-[12%] -translate-x-1/2 scale-[0.75] md:scale-[0.6] lg:scale-[0.6]";
              zIndex = 10;
              rotateY = 50; // Angolo più pronunciato
              isHorizontal = true;
            } else if (diff === 1) {
              // This is next (right visible) - rotated + horizontal dimensions + più piccola e spostata
              slotClasses =
                "top-1/2 -translate-y-1/2 left-[110%] md:left-[92%] lg:left-[88%] -translate-x-1/2 scale-[0.75] md:scale-[0.6] lg:scale-[0.6]";
              zIndex = 10;
              rotateY = -50; // Angolo più pronunciato (direzione opposta)
              isHorizontal = true;
            } else if (diff === CATEGORY_CARDS.length - 2 || diff === -2) {
              // This is prevPrev (hidden left) - allineata con prev
              slotClasses =
                "top-1/2 -translate-y-1/2 left-[-10%] md:left-[8%] lg:left-[12%] -translate-x-1/2 scale-[0.55] md:scale-[0.6] lg:scale-[0.6] opacity-0";
              zIndex = 5;
              rotateY = 50;
              isHorizontal = true;
            } else if (diff === 2) {
              // This is nextNext (hidden right) - allineata con next
              slotClasses =
                "top-1/2 -translate-y-1/2 left-[110%] md:left-[92%] lg:left-[88%] -translate-x-1/2 scale-[0.55] md:scale-[0.6] lg:scale-[0.6] opacity-0";
              zIndex = 5;
              rotateY = -50;
              isHorizontal = true;
            } else {
              // Hidden cards (should not show)
              slotClasses = "left-1/2 -translate-x-1/2 opacity-0 invisible";
              zIndex = 0;
              rotateY = 0;
              isHorizontal = false;
            }

            // Determine if this card is clickable (prev or next)
            const isClickable =
              diff === CATEGORY_CARDS.length - 1 || diff === 1;
            const handleCardClick = () => {
              if (!isClickable || isTransitioning) return;
              if (diff === CATEGORY_CARDS.length - 1) {
                goToPrev();
              } else if (diff === 1) {
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
                isHorizontal={isHorizontal}
                isClickable={isClickable}
                isActive={diff === 0}
                onClick={handleCardClick}
                gridPosition={diff === 0 ? gridCardPosition : null}
                centerY={diff !== 0 && gridCardPosition ? gridCardPosition.top : null}
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
