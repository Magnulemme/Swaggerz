"use client";

import React, { useRef } from "react";
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
  isFirstCard,
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

  // Scale della card basata sul global scroll
  const scale = useTransform(globalScrollProgress, range, [1, targetScale]);

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
        />
      </div>
      {/* Spacer compensato per margine uniforme */}
      {!isLast && <div style={{ height: `${compensatedSpacer}px` }} />}
    </React.Fragment>
  );
}
