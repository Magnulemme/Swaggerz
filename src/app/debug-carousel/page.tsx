"use client";

import { useEffect, useState, useRef } from "react";
import { useCarouselStore } from "@/store/useCarouselStore";
import { getCardSlotConfig } from "@/components/Landing/Categories/carouselPositions";
import { CATEGORY_CARDS } from "@/components/Landing/Categories/categories.constants";
import { HeroCategoriesCarouselV2 } from "@/components/Landing/Categories/HeroCategoriesCarouselV2";

interface CardPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  transform: string;
}

interface FramerMotionValues {
  initialX: string;
  initialY: string;
  initialRotateY: number;
  initialScale: number;
  targetX: string;
  targetY: string;
  targetRotateY: number;
  targetScale: number;
}

/**
 * Debug Carousel Page - Real Component with Debug Info
 * Shows the actual HeroCategoriesCarousel component with debug information above
 */
export default function DebugCarouselPage() {
  const { currentPhase, activeIndex, initializePositions, startTransition, endTransition } = useCarouselStore();
  const isTransitioning = currentPhase === "transitioning";
  const [cardPositions, setCardPositions] = useState<Map<number, CardPosition>>(new Map());
  const [framerMotionValues, setFramerMotionValues] = useState<Map<number, FramerMotionValues>>(new Map());
  const [previousFramerValues, setPreviousFramerValues] = useState<Map<number, FramerMotionValues>>(new Map());
  const animationFrameRef = useRef<number>();
  const prevPhaseRef = useRef<string>("idle");

  // Initialize
  useEffect(() => {
    initializePositions(CATEGORY_CARDS.length, 0);
  }, [initializePositions]);

  // Detect phase transitions and capture Framer Motion values
  useEffect(() => {
    // Transitioning -> Idle: save current Framer values as previous
    if (prevPhaseRef.current === "transitioning" && currentPhase === "idle") {
      console.log("🔄 Transition ended, saving Framer Motion values as previous");
      setPreviousFramerValues(new Map(framerMotionValues));
    }

    prevPhaseRef.current = currentPhase;
  }, [currentPhase, framerMotionValues]);

  // Track card positions and Framer Motion values from DOM in real-time
  useEffect(() => {
    const updatePositions = () => {
      const positions = new Map<number, CardPosition>();
      const framerValues = new Map<number, FramerMotionValues>();

      // Find all carousel cards in the DOM
      CATEGORY_CARDS.forEach((_, idx) => {
        const card = document.querySelector(`[data-card-index="${idx}"]`) as HTMLElement;
        if (card) {
          const rect = card.getBoundingClientRect();
          const style = window.getComputedStyle(card);

          positions.set(idx, {
            x: Math.round(rect.left),
            y: Math.round(rect.top),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            transform: style.transform,
          });

          // Read Framer Motion data attributes
          const initialX = card.getAttribute('data-initial-x') || '0px';
          const initialY = card.getAttribute('data-initial-y') || '0px';
          const initialRotateY = parseFloat(card.getAttribute('data-initial-rotatey') || '0');
          const initialScale = parseFloat(card.getAttribute('data-initial-scale') || '1');
          const targetX = card.getAttribute('data-target-x') || '0px';
          const targetY = card.getAttribute('data-target-y') || '0px';
          const targetRotateY = parseFloat(card.getAttribute('data-target-rotatey') || '0');
          const targetScale = parseFloat(card.getAttribute('data-target-scale') || '1');

          framerValues.set(idx, {
            initialX,
            initialY,
            initialRotateY,
            initialScale,
            targetX,
            targetY,
            targetRotateY,
            targetScale,
          });
        }
      });

      setCardPositions(positions);
      setFramerMotionValues(framerValues);
      animationFrameRef.current = requestAnimationFrame(updatePositions);
    };

    animationFrameRef.current = requestAnimationFrame(updatePositions);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const goToNext = () => {
    if (isTransitioning) return;
    const newIndex = activeIndex === CATEGORY_CARDS.length - 1 ? 0 : activeIndex + 1;
    startTransition(newIndex);
    setTimeout(() => endTransition(), 1400);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    const newIndex = activeIndex === 0 ? CATEGORY_CARDS.length - 1 : activeIndex - 1;
    startTransition(newIndex);
    setTimeout(() => endTransition(), 1400);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* V2 Carousel Component */}
      <HeroCategoriesCarouselV2 />
    </div>
  );
}
