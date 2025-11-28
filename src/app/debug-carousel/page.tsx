"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useCarouselStore } from "@/store/useCarouselStore";
import { getCardSlotConfig } from "@/components/Landing/Categories/carouselPositions";
import { CATEGORY_CARDS } from "@/components/Landing/Categories/categories.constants";

/**
 * Simplified Debug Carousel - Isolated Testing
 * Only essential features to debug card transitions
 */
export default function DebugCarouselPage() {
  const { initializePositions, startTransition, endTransition, currentPhase } = useCarouselStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const isTransitioning = currentPhase === "transitioning";
  const previousTransformRefs = useRef<Map<number, any>>(new Map());

  // Initialize
  useEffect(() => {
    initializePositions(CATEGORY_CARDS.length, 0);
  }, [initializePositions]);

  const goToNext = () => {
    if (isTransitioning) return;

    const newIndex = activeIndex === CATEGORY_CARDS.length - 1 ? 0 : activeIndex + 1;
    console.log(`\n${"=".repeat(80)}`);
    console.log(`🎯 TRANSITION: ${activeIndex} → ${newIndex}`);
    console.log(`${"=".repeat(80)}\n`);

    setActiveIndex(newIndex);
    startTransition(newIndex);

    setTimeout(() => {
      endTransition();
    }, 1400);
  };

  const goToPrev = () => {
    if (isTransitioning) return;

    const newIndex = activeIndex === 0 ? CATEGORY_CARDS.length - 1 : activeIndex - 1;
    console.log(`\n${"=".repeat(80)}`);
    console.log(`🎯 TRANSITION: ${activeIndex} → ${newIndex}`);
    console.log(`${"=".repeat(80)}\n`);

    setActiveIndex(newIndex);
    startTransition(newIndex);

    setTimeout(() => {
      endTransition();
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Carousel Debug Page</h1>

        {/* Controls */}
        <div className="mb-8 flex gap-4 items-center">
          <button
            onClick={goToPrev}
            disabled={isTransitioning}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-semibold"
          >
            ← Previous
          </button>
          <div className="text-xl">
            Active: <span className="font-mono font-bold text-green-400">{activeIndex}</span>
            {" "}/{" "}{CATEGORY_CARDS.length - 1}
          </div>
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-semibold"
          >
            Next →
          </button>
          <div className={`px-4 py-2 rounded ${isTransitioning ? 'bg-yellow-600' : 'bg-green-600'}`}>
            {isTransitioning ? 'Transitioning...' : 'Idle'}
          </div>
        </div>

        {/* Debug Info */}
        <div className="mb-8 p-4 bg-gray-800 rounded-lg font-mono text-sm">
          <div className="mb-2 font-bold text-green-400">Card Positions:</div>
          {CATEGORY_CARDS.map((card, idx) => {
            const config = getCardSlotConfig(idx, activeIndex, CATEGORY_CARDS.length);
            return (
              <div key={idx} className={`py-1 ${config.isActive ? 'text-yellow-300 font-bold' : ''}`}>
                Card {idx} ({card.label}): {config.slotType} - rotateY: {config.rotateY}, x: {config.translateX}
              </div>
            );
          })}
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full h-[500px] bg-gray-800 rounded-lg overflow-hidden"
          style={{
            perspective: "2000px",
            transformStyle: "preserve-3d",
          }}
        >
          {CATEGORY_CARDS.map((card, index) => {
            const config = getCardSlotConfig(index, activeIndex, CATEGORY_CARDS.length);
            const { slotClasses, zIndex, rotateY, translateX, translateY, scale, isActive } = config;

            // Get previous transform or use current as initial
            const prevTransform = previousTransformRefs.current.get(index);
            const currentTransform = { x: translateX, y: translateY, rotateY, scale };

            // Use previous as initial if available
            const initialTransform = prevTransform || currentTransform;

            return (
              <DebugCard
                key={index}
                cardIndex={index}
                label={card.label}
                image={card.image}
                slotClasses={slotClasses}
                zIndex={zIndex}
                isActive={isActive}
                currentTransform={currentTransform}
                initialTransform={initialTransform}
                onAnimationComplete={() => {
                  // Update ref after animation completes
                  previousTransformRefs.current.set(index, currentTransform);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface DebugCardProps {
  cardIndex: number;
  label: string;
  image: string;
  slotClasses: string;
  zIndex: number;
  isActive: boolean;
  currentTransform: { x: string; y: string; rotateY: number; scale: number };
  initialTransform: { x: string; y: string; rotateY: number; scale: number };
  onAnimationComplete: () => void;
}

function DebugCard({
  cardIndex,
  label,
  image,
  slotClasses,
  zIndex,
  isActive,
  currentTransform,
  initialTransform,
  onAnimationComplete,
}: DebugCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && cardRef.current) {
      const style = window.getComputedStyle(cardRef.current);
      console.log(`\n📍 Card ${cardIndex} (${label}) - Active Card:`);
      console.log(`   Current Transform:`, currentTransform);
      console.log(`   Initial Transform:`, initialTransform);
      console.log(`   DOM Transform:`, style.transform);
    }
  }, [cardIndex, label, isActive, currentTransform, initialTransform]);

  return (
    <motion.div
      ref={cardRef}
      className={`absolute ${slotClasses}`}
      initial={initialTransform}
      animate={currentTransform}
      transition={{
        duration: 1.4,
        ease: [0.65, 0, 0.35, 1],
      }}
      onAnimationStart={() => {
        if (isActive) {
          console.log(`🎬 Card ${cardIndex} ANIMATION START`);
          console.log(`   From:`, initialTransform);
          console.log(`   To:`, currentTransform);
        }
      }}
      onUpdate={(latest) => {
        if (isActive && latest.x !== currentTransform.x) {
          console.log(`⚡ Card ${cardIndex} animating:`, latest.x, latest.rotateY);
        }
      }}
      onAnimationComplete={() => {
        if (isActive) {
          console.log(`✅ Card ${cardIndex} ANIMATION COMPLETE`);
          if (cardRef.current) {
            const style = window.getComputedStyle(cardRef.current);
            console.log(`   Final DOM transform:`, style.transform);
          }
        }
        onAnimationComplete();
      }}
      style={{
        zIndex,
        transformStyle: "preserve-3d",
        left: "50%",
        top: "50%",
        width: "300px",
        height: "400px",
        willChange: "transform",
      }}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover"
        />
        <div className={`absolute bottom-0 left-0 right-0 p-4 ${isActive ? 'bg-yellow-600' : 'bg-gray-800'}`}>
          <div className="text-white font-bold text-lg">
            Card {cardIndex}: {label}
          </div>
          {isActive && <div className="text-xs text-yellow-200">ACTIVE</div>}
        </div>
      </div>
    </motion.div>
  );
}
