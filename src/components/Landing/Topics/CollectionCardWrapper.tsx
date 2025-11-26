"use client";

import React, { useRef, useEffect } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { CollectionCard } from "./CollectionCard";

interface CollectionCardWrapperProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  stats: {
    pieces: number;
    swagLevel: number;
  };
  index: number;
  isLast: boolean;
  isFirstCard: boolean;
  layout: "desktop" | "mobile";
  globalScrollProgress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  stickyHeight: number;
  topPosition: number;
  compensatedSpacer: number;
  titleElement?: React.ReactNode;
}

export function CollectionCardWrapper({
  title,
  subtitle,
  imageUrl,
  stats,
  index,
  isLast,
  layout,
  globalScrollProgress,
  range,
  targetScale,
  stickyHeight,
  topPosition,
  compensatedSpacer,
  titleElement,
}: CollectionCardWrapperProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Debug: log del range per ogni card (solo al mount)
  useEffect(() => {
    console.log(`Card ${index} (${title}) - range:`, range, `targetScale: ${targetScale}`);
  }, [index, title, range, targetScale]); // Dipendenze per evitare warning

  // Scale della card basata sul global scroll (disabilitato su mobile)
  const scale = useTransform(
    globalScrollProgress,
    range,
    layout === "mobile" ? [1, 1] : [1, targetScale]
  );

  // Parallax image scale (solo mobile)
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: layout === "mobile" ? cardRef : undefined,
    offset: ["start end", "start start"],
  });
  const imageScale = useTransform(cardScrollProgress, [0, 1], [2, 1]);

  return (
    <React.Fragment>
      <div
        ref={layout === "mobile" ? cardRef : undefined}
        className={`flex ${
          layout === "mobile"
            ? "w-full items-start justify-center"
            : "flex-col items-center justify-start"
        } sticky ${layout === "mobile" ? "" : "px-8 md:px-12 lg:px-16 z-10"}`}
        style={{
          top: `${topPosition}px`,
          height: `${stickyHeight}px`,
        }}
      >
        {/* Title element if provided (desktop first card with sticky title) */}
        {titleElement}

        <CollectionCard
          index={index}
          title={title}
          subtitle={subtitle}
          imageUrl={imageUrl}
          stats={stats}
          scale={scale}
          layout={layout}
          imageScale={layout === "mobile" ? imageScale : undefined}
        />
      </div>
      {/* Spacer compensato per margine uniforme */}
      {!isLast && <div style={{ height: `${compensatedSpacer}px` }} />}
    </React.Fragment>
  );
}
