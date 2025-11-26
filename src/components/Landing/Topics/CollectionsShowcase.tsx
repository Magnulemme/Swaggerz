"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { CollectionCardWrapper } from "./CollectionCardWrapper";
import { SectionTitle } from "../SectionTitle";
import { useAdaptiveLayout } from "@/hooks/useAdaptiveLayout";

interface Collection {
  title: string;
  subtitle?: string;
  imageUrl: string;
  stats: {
    pieces: number;
    swagLevel: number;
  };
}

const defaultCollections: Collection[] = [
  {
    title: "Essentials",
    subtitle: "Timeless Basics",
    imageUrl: "/mockups/essentials.png",
    stats: {
      pieces: 24,
      swagLevel: 95,
    },
  },
  {
    title: "Digital Art",
    subtitle: "Digital Collection",
    imageUrl: "/mockups/generative.png",
    stats: {
      pieces: 18,
      swagLevel: 88,
    },
  },
  {
    title: "Retrò",
    subtitle: "Vintage Collection",
    imageUrl: "/mockups/retro.png",
    stats: {
      pieces: 32,
      swagLevel: 92,
    },
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

  // Global scroll progress
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

  // Constants per desktop
  const DESKTOP_OFFSET = 50;
  const DESKTOP_MIN_HEIGHT = 500;
  const DESKTOP_DESIRED_MARGIN = 200;

  // Constants per mobile
  const MOBILE_OFFSET = 25;
  const MOBILE_BASE_HEIGHT = Math.min(
    typeof window !== "undefined" ? window.innerHeight - 200 : 600,
    600
  ); // Dinamico come la card
  const MOBILE_DESIRED_MARGIN = 100;
  const MOBILE_TOP_BASE = 100;

  // Check if we have enough space to make title sticky (solo desktop)
  const { isTitleSticky } = useAdaptiveLayout({
    titleHeight,
    cardMinHeight: DESKTOP_MIN_HEIGHT,
    navbarHeight: 70,
    safetyMargin: 100,
  });

  // Dynamic top offset based on title sticky state (solo desktop)
  const dynamicTopOffset = isTitleSticky ? 50 : 150;

  // Valori responsive
  const CARD_OFFSET = isMobile ? MOBILE_OFFSET : DESKTOP_OFFSET;
  const CARD_MIN_HEIGHT = isMobile ? MOBILE_BASE_HEIGHT : DESKTOP_MIN_HEIGHT;
  const DESIRED_MARGIN = isMobile
    ? MOBILE_DESIRED_MARGIN
    : DESKTOP_DESIRED_MARGIN;
  const TOP_BASE = isMobile ? MOBILE_TOP_BASE : dynamicTopOffset;

  const totalCards = collections.length;

  return (
    <div
      ref={container}
      className="relative w-full h-full flex flex-col items-center justify-center"
    >
      {/* Title - Mobile: sempre in alto, Desktop: condizionale */}
      {isMobile ? (
        <div className="w-full flex items-center justify-center pointer-events-none px-8 mb-12">
          <SectionTitle
            title="Esplora le"
            shaderText="Collezioni"
            description="Raccolte di stile, scelte esclusivamente per te"
            size="md"
          />
        </div>
      ) : (
        !isTitleSticky && (
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
        )
      )}

      {/* Cards wrapper */}
      <div className={isMobile ? "flex flex-col" : "contents"}>
        {collections.map((collection, i) => {
          const isLast = i === collections.length - 1;
          const isFirstCard = i === 0;
          const cardsToScale = collections.length - 1;
          const targetScale =
            i === collections.length - 1 ? 1 : 1 - (cardsToScale - i) * 0.05;

          // Range per scale animation
          const start = i * (1 / collections.length);
          const end = Math.min(start + 1 / collections.length, 1);

          // Calcoli per sticky positioning
          const intrinsicMargin = (totalCards - 1 - i) * CARD_OFFSET;
          const compensatedSpacer = DESIRED_MARGIN - intrinsicMargin;

          // Sticky height
          const stickyHeight = isMobile
            ? CARD_MIN_HEIGHT + (totalCards - 1 - i) * CARD_OFFSET
            : !isMobile && isTitleSticky
            ? isFirstCard
              ? titleHeight + CARD_MIN_HEIGHT + (totalCards - 1 - i) * CARD_OFFSET // First card includes title
              : CARD_MIN_HEIGHT + (totalCards - 2 - i) * CARD_OFFSET // Subsequent cards have one less stacking layer
            : CARD_MIN_HEIGHT + (totalCards - 1 - i) * CARD_OFFSET;

          // Top position
          const topPosition = isMobile
            ? TOP_BASE + i * CARD_OFFSET
            : !isMobile && isTitleSticky
            ? isFirstCard
              ? TOP_BASE
              : TOP_BASE + titleHeight + (i + 1) * CARD_OFFSET // Add titleHeight to account for sticky title, then stack cards with offset
            : TOP_BASE + i * CARD_OFFSET;

          // Title element for desktop first card with sticky title
          const titleElement =
            !isMobile && isTitleSticky && isFirstCard ? (
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
            ) : undefined;

          return (
            <CollectionCardWrapper
              key={`card_${i}_${isMobile ? 'mobile' : 'desktop'}`}
              title={collection.title}
              subtitle={collection.subtitle}
              imageUrl={collection.imageUrl}
              stats={collection.stats}
              index={i}
              isLast={isLast}
              isFirstCard={isFirstCard}
              layout={isMobile ? "mobile" : "desktop"}
              globalScrollProgress={scrollYProgress}
              range={[start, end]}
              targetScale={targetScale}
              stickyHeight={stickyHeight}
              topPosition={topPosition}
              compensatedSpacer={compensatedSpacer}
              titleElement={titleElement}
            />
          );
        })}
      </div>
    </div>
  );
}
