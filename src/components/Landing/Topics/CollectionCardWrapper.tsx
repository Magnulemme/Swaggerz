"use client";

import React, { useRef, useEffect } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { CollectionCard } from "./CollectionCard";

interface CollectionCardWrapperProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
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
  index,
  isLast,
  isFirstCard: _isFirstCard,
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
  }, []); // Array vuoto = esegui solo al mount

  // Scale della card basata sul global scroll (disabilitato su mobile per width expansion)
  const scale = useTransform(
    globalScrollProgress,
    range,
    layout === "mobile" ? [1, 1] : [1, targetScale]
  );

  // Width expansion effect (solo mobile) - ogni card usa il proprio range
  // Card 0: [0, 0.33], Card 1: [0.33, 0.66], Card 2: [0.66, 1]
  // clamp: true blocca il valore a 100vw evitando l'interpolazione inversa
  const cardWidth = useTransform(
    globalScrollProgress,
    range, // Usa il range specifico della card (1/3 dello scroll totale)
    layout === "mobile" ? ["90%", "100vw"] : ["100%", "100%"],
    { clamp: true }
  );

  // Border radius animation (solo mobile) - sincronizzato con width
  const cardBorderRadius = useTransform(
    globalScrollProgress,
    range,
    layout === "mobile" ? [24, 0] : [24, 24],
    { clamp: true }
  );

  // Border opacity animation via box-shadow (solo mobile) - fade out graduale
  // Usiamo box-shadow invece di border per avere controllo sull'opacity
  const cardBorderOpacity = useTransform(
    globalScrollProgress,
    range,
    layout === "mobile" ? [0.2, 0] : [0.2, 0.2],
    { clamp: true }
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
          scale={scale}
          layout={layout}
          imageScale={layout === "mobile" ? imageScale : undefined}
          cardWidth={layout === "mobile" ? cardWidth : undefined}
          cardBorderRadius={layout === "mobile" ? cardBorderRadius : undefined}
          cardBorderOpacity={layout === "mobile" ? cardBorderOpacity : undefined}
        />
      </div>
      {/* Spacer compensato per margine uniforme */}
      {!isLast && <div style={{ height: `${compensatedSpacer}px` }} />}
    </React.Fragment>
  );
}
