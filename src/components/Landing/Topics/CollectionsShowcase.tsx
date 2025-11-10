"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { CollectionCard } from "./CollectionCard";
import { CollectionCardMobile } from "./CollectionCardMobile";
import { SectionTitle } from "../SectionTitle";
import { useAdaptiveLayout } from "@/hooks/useAdaptiveLayout";

interface Collection {
  title: string;
  subtitle?: string;
  imageUrl: string;
}

const defaultCollections: Collection[] = [
  {
    title: "Essentials",
    subtitle: "Timeless Basics",
    imageUrl: "/mockups/essentials.png",
  },
  {
    title: "Digital Art",
    subtitle: "Digital Collection",
    imageUrl: "/mockups/generative.png",
  },
  {
    title: "Retrò",
    subtitle: "Vintage Collection",
    imageUrl: "/mockups/retro.png",
  },
];

export function CollectionsShowcase({
  collections = defaultCollections,
}: {
  collections?: Collection[];
}) {
  const container = useRef(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleHeight, setTitleHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Positioning constants
  const CARD_OFFSET = 50;
  const CARD_MIN_HEIGHT = 400;

  // Measure title height
  useEffect(() => {
    if (titleRef.current) {
      const updateHeight = () => {
        const height = titleRef.current?.offsetHeight || 0;
        setTitleHeight(height);
      };

      updateHeight();

      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(titleRef.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  // Check if we have enough space to make title sticky
  const { isTitleSticky } = useAdaptiveLayout({
    titleHeight,
    cardMinHeight: CARD_MIN_HEIGHT,
    navbarHeight: 70,
    safetyMargin: 100,
  });

  // Dynamic top offset based on title sticky state
  const dynamicTopOffset = isTitleSticky ? 50 : 150;

  // Render mobile version
  if (isMobile) {
    return (
      <div
        ref={container}
        className="relative w-full flex flex-col items-center justify-center py-12"
      >
        {/* Mobile Title - Always at the top */}
        <div className="w-full flex items-center justify-center pointer-events-none px-8 mb-12">
          <SectionTitle
            title="Esplora le"
            shaderText="Collezioni"
            description="Raccolte di stile, scelte esclusivamente per te"
            size="md"
          />
        </div>

        <div className="flex flex-col space-y-24">
          {collections.map((collection, i) => {
            const isLast = i === collections.length - 1;
            const cardsToScale = collections.length - 1;
            const targetScale = isLast ? 1 : 1 - (cardsToScale - i) * 0.05;

            const start = i * (1 / collections.length);
            const end = Math.min(start + 1 / collections.length, 1);

            return (
              <CollectionCardMobile
                key={`collection_mobile_${i}`}
                index={i}
                {...collection}
                progress={scrollYProgress}
                range={[start, end]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Render desktop version
  return (
    <div
      ref={container}
      className="relative w-full h-full flex flex-col items-center justify-center"
    >
      {/* Title - Rendered outside sticky wrapper if not enough space */}
      {!isTitleSticky && (
        <div
          ref={titleRef}
          className="w-full flex items-center justify-center pointer-events-none px-8 md:px-12 lg:px-16"
        >
          <SectionTitle
            title="Esplora le"
            shaderText="Collezioni"
            description="Raccolte di stile, scelte esclusivamente per te"
          />
        </div>
      )}

      {collections.map((collection, i) => {
        const isLast = i === collections.length - 1;
        const cardsToScale = collections.length - 1;
        const targetScale = isLast ? 1 : 1 - (cardsToScale - i) * 0.05;
        const totalCards = collections.length;

        // Ogni card scala solo nel suo range specifico, non oltre
        const start = i * (1 / collections.length);
        const end = Math.min(start + 1 / collections.length, 1); // Scala solo per il suo segmento

        const isFirstCard = i === 0;

        // If title is sticky, include it in first card's height and positioning
        // Otherwise, cards start from the top
        const stickyHeight =
          isTitleSticky && isFirstCard
            ? `${
                titleHeight +
                CARD_MIN_HEIGHT +
                (totalCards - 1 - i) * CARD_OFFSET
              }px`
            : `${CARD_MIN_HEIGHT + (totalCards - 1 - i) * CARD_OFFSET}px`;

        // Top position: if title is sticky, first card at dynamicTopOffset, others skip title height
        // If title is not sticky, all cards start with more spacing (100px)
        const topPosition = isTitleSticky
          ? isFirstCard
            ? `${dynamicTopOffset}px`
            : `${dynamicTopOffset + titleHeight + i * CARD_OFFSET}px`
          : `${dynamicTopOffset + i * CARD_OFFSET}px`;

        return (
          <div
            key={`sticky_wrapper_${i}`}
            className="flex flex-col items-center justify-start sticky px-8 md:px-12 lg:px-16 z-10"
            style={{
              top: topPosition,
              height: stickyHeight,
            }}
          >
            {/* Section Title - Only on first card if title is sticky */}
            {isTitleSticky && isFirstCard && (
              <div
                ref={titleRef}
                className="w-full flex items-center justify-center pointer-events-none"
              >
                <SectionTitle
                  title="Esplora le"
                  shaderText="Collezioni"
                  description="Raccolte di stile, scelte esclusivamente per te"
                />
              </div>
            )}

            <CollectionCard
              index={i}
              totalCards={totalCards}
              {...collection}
              progress={scrollYProgress}
              range={[start, end]}
              targetScale={targetScale}
            />
          </div>
        );
      })}
      {/* Compensazione per il margin negativo dell'ultima card */}
      <div style={{ height: "100px" }} />
    </div>
  );
}
