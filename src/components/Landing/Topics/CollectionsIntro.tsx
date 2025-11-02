"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ShaderText from "@/components/ShaderText";
import { useJostAlignment } from "@/hooks/useAlignedFontSize";

interface CollectionsIntroProps {
  onHeightChange?: (height: number) => void;
}

export function CollectionsIntro({ onHeightChange }: CollectionsIntroProps) {
  const jostTitleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const alignedFontSize = useJostAlignment(jostTitleRef);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newHeight = rect.height;
        setHeight(newHeight);
        onHeightChange?.(newHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    // Timeout per assicurarsi che il layout sia completato
    const timer = setTimeout(updateHeight, 100);

    return () => {
      window.removeEventListener("resize", updateHeight);
      clearTimeout(timer);
    };
  }, [alignedFontSize, onHeightChange]);

  return (
    <motion.div
      ref={containerRef}
      className="text-center py-xl md:py-2xl space-y-md px-md md:px-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Small eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-block"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-light-subtle/50 bg-dark-elevated/50 text-light-tertiary text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
          Le Collezioni
        </span>
      </motion.div>

      {/* Title */}
      <div className="flex flex-wrap items-start justify-center gap-2 lg:gap-3">
        <h3
          ref={jostTitleRef}
          className="text-2xl md:text-3xl lg:text-5xl font-black text-light leading-none tracking-tight font-jost"
        >
          Streetwear
        </h3>
        <div className="">
          <ShaderText
            fontSize={alignedFontSize || "48px"}
            fontWeight="900"
            className="leading-none"
          >
            Essentials
          </ShaderText>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm md:text-base text-light-secondary max-w-prose mx-auto leading-relaxed">
        Tre mood, infinite possibilità. Scopri le nostre collezioni.
      </p>
    </motion.div>
  );
}
