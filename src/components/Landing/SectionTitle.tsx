"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ShaderText from "@/components/ShaderText";
import { useJostAlignment } from "@/hooks/useAlignedFontSize";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  shaderText: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  onHeightChange?: (height: number) => void;
}

const sizeClasses = {
  sm: {
    title: "text-2xl md:text-3xl lg:text-4xl",
    defaultFontSize: "36px",
  },
  md: {
    title: "text-4xl md:text-5xl lg:text-7xl",
    defaultFontSize: "48px",
  },
  lg: {
    title: "text-5xl md:text-6xl lg:text-8xl",
    defaultFontSize: "72px",
  },
};

export function SectionTitle({
  eyebrow,
  title,
  shaderText,
  description,
  size = "md",
  onHeightChange,
}: SectionTitleProps) {
  const jostTitleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowTextRef = useRef<HTMLDivElement>(null);
  const alignedFontSize = useJostAlignment(jostTitleRef);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current && onHeightChange) {
        const rect = containerRef.current.getBoundingClientRect();
        onHeightChange(rect.height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    const timer = setTimeout(updateHeight, 100);

    return () => {
      window.removeEventListener("resize", updateHeight);
      clearTimeout(timer);
    };
  }, [alignedFontSize, onHeightChange]);

  return (
    <motion.div
      ref={containerRef}
      className="relative text-center py-md md:py-2xl md:pt-3xl space-y-md px-md md:px-lg z-50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="inline-block"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-light-subtle/50 bg-dark-elevated/50 text-light-tertiary text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
            {eyebrow}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <div className="flex flex-wrap items-baseline justify-center gap-2 lg:gap-3">
        <h3
          ref={jostTitleRef}
          className={`${sizeClasses[size].title} font-black text-light leading-none tracking-tight font-jost`}
        >
          {title}
        </h3>
        {/* Container con shadow text (per baseline) e ShaderText sovrapposto */}
        <div ref={shadowTextRef} className="relative">
          {/* Shadow text: invisibile ma con baseline corretto */}
          <div
            style={{
              fontSize: alignedFontSize || sizeClasses[size].defaultFontSize,
              fontFamily: "PastorOfMuppets, cursive",
              fontWeight: 900,
              lineHeight: 1,
              visibility: "hidden",
            }}
            aria-hidden="true"
          >
            {shaderText}
          </div>

          {/* ShaderText posizionato esattamente sopra lo shadow text */}
          <div
            className="absolute inset-0"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShaderText
              fontSize={alignedFontSize || sizeClasses[size].defaultFontSize}
            >
              {shaderText}
            </ShaderText>
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm md:text-base text-light-secondary max-w-prose mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
