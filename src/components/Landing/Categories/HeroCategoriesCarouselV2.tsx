"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryCarouselCardV2 } from "./CategoryCarouselCardV2";
import { useCarouselStore } from "@/store/useCarouselStore";
import { CATEGORY_CARDS, CAROUSEL_TIMINGS } from "./categories.constants";

type CardPosition = 'prev' | 'active' | 'next' | 'hidden';

interface SlotCoordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * HeroCategoriesCarouselV2 - Layout fisso + card mobili
 */
export function HeroCategoriesCarouselV2() {
  const {
    currentPhase,
    activeIndex,
    cardPositions,
    initializePositions,
    startTransition,
    endTransition
  } = useCarouselStore();

  const isTransitioning = currentPhase === "transitioning";
  const layoutRef = useRef<HTMLDivElement>(null);
  const previousPositionsRef = useRef<Map<number, CardPosition>>(new Map());
  const [slotCoordinates, setSlotCoordinates] = useState<Record<CardPosition, SlotCoordinates | null>>({
    prev: null,
    active: null,
    next: null,
    hidden: null,
  });

  // Initialize
  useEffect(() => {
    initializePositions(CATEGORY_CARDS.length, 0);
  }, [initializePositions]);

  // Track position changes
  useEffect(() => {
    // Save current positions as previous for next transition
    if (currentPhase === 'idle') {
      cardPositions.forEach((position, cardIndex) => {
        previousPositionsRef.current.set(cardIndex, position);
      });
    }
  }, [cardPositions, currentPhase]);

  // Calculate slot positions
  useEffect(() => {
    const calculatePositions = () => {
      if (!layoutRef.current) return;

      const layoutContainer = layoutRef.current;
      const layoutRect = layoutContainer.getBoundingClientRect();

      const prevSlot = document.getElementById('prev-slot');
      const activeSlot = document.getElementById('active-slot');
      const nextSlot = document.getElementById('next-slot');

      const getRelativeCoords = (element: HTMLElement | null) => {
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left - layoutRect.left,
          y: rect.top - layoutRect.top,
          width: rect.width,
          height: rect.height,
        };
      };

      setSlotCoordinates({
        prev: getRelativeCoords(prevSlot),
        active: getRelativeCoords(activeSlot),
        next: getRelativeCoords(nextSlot),
        hidden: { x: -500, y: 0, width: 0, height: 0 }, // Hidden fuori schermo a sinistra
      });
    };

    // Calcola dopo un breve delay per assicurarsi che il DOM sia renderizzato
    const timer = setTimeout(calculatePositions, 100);

    window.addEventListener('resize', calculatePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePositions);
    };
  }, []);

  // Navigation
  const goToPrev = () => {
    if (isTransitioning) return;
    const newIndex = activeIndex === 0 ? CATEGORY_CARDS.length - 1 : activeIndex - 1;
    startTransition(newIndex);
    setTimeout(() => endTransition(), CAROUSEL_TIMINGS.TRANSITION_DURATION);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    const newIndex = activeIndex === CATEGORY_CARDS.length - 1 ? 0 : activeIndex + 1;
    startTransition(newIndex);
    setTimeout(() => endTransition(), CAROUSEL_TIMINGS.TRANSITION_DURATION);
  };

  return (
    <div className="relative w-full bg-black text-white py-16">

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        disabled={isTransitioning}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-4 backdrop-blur-sm transition-all"
        aria-label="Previous"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        disabled={isTransitioning}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-4 backdrop-blur-sm transition-all"
        aria-label="Next"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Main container */}
      <div ref={layoutRef} className="relative mx-auto max-w-[1400px] px-8">

        {/* Layout FISSO con flex - definisce le posizioni */}
        <div
          className="relative flex items-center justify-center gap-8 min-h-[500px]"
          style={{ perspective: "2000px" }}
        >

          {/* PREV slot - placeholder card FISSO (largo e basso) */}
          <div
            id="prev-slot"
            className="flex-shrink-0 w-[320px] h-[200px] rounded-xl bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-500 font-bold"
            style={{ minWidth: "320px", minHeight: "200px", maxWidth: "320px", maxHeight: "200px" }}
          >
            PREV
          </div>

          {/* BLOCCO CENTRALE: Card + Descrizione */}
          <div className="flex items-center gap-8 flex-shrink-0 bg-yellow-500/30 border-4 border-yellow-500 rounded-xl">

            {/* ACTIVE slot - placeholder card FISSO (alto e stretto) */}
            <div
              id="active-slot"
              className="flex-shrink-0 w-[300px] h-[400px] rounded-xl bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-green-500 font-bold"
              style={{ minWidth: "300px", minHeight: "400px", maxWidth: "300px", maxHeight: "400px" }}
            >
              ACTIVE
            </div>

            {/* Descrizione - accanto alla card */}
            <div className="w-[400px] flex-shrink-0 bg-purple-500/30 border-2 border-purple-500 p-4 rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-4xl font-bold mb-4">
                    {CATEGORY_CARDS[activeIndex].label}
                  </h2>
                  <p className="text-gray-400 text-lg mb-6">
                    {CATEGORY_CARDS[activeIndex].description || `Discover our collection of ${CATEGORY_CARDS[activeIndex].label.toLowerCase()}`}
                  </p>
                  <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Explore
                  </button>

                  {/* Debug */}
                  <div className="mt-6 text-xs text-gray-500">
                    Phase: <span className="text-yellow-400">{currentPhase}</span> |
                    Active: <span className="text-green-400">{activeIndex}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* NEXT slot - placeholder card FISSO (largo e basso) */}
          <div
            id="next-slot"
            className="flex-shrink-0 w-[320px] h-[200px] rounded-xl bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-500 font-bold"
            style={{ minWidth: "320px", minHeight: "200px", maxWidth: "320px", maxHeight: "200px" }}
          >
            NEXT
          </div>

        </div>

        {/* Card MOBILI - absolute positioning */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {CATEGORY_CARDS.map((card, index) => {
            const position = cardPositions.get(index) || 'hidden';
            const previousPosition = previousPositionsRef.current.get(index);

            return (
              <CategoryCarouselCardV2
                key={index}
                cardIndex={index}
                position={position}
                previousPosition={previousPosition}
                label={card.label}
                image={card.image}
                slotCoordinates={slotCoordinates}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}
