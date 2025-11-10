"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

interface CollectionCardMobileProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  index: number;
  progress: any;
  range: [number, number];
  targetScale: number;
  stickyHeight: number;
}

export function CollectionCardMobile({
  title,
  subtitle,
  imageUrl,
  index,
  progress,
  range,
  targetScale,
  stickyHeight,
}: CollectionCardMobileProps) {
  const container = useRef(null);

  // Scroll progress specifico per questa card
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Scale dell'immagine durante lo scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  // Scale della card basato sul progress globale
  const scale = useTransform(progress, range, [1, targetScale]);

  // Offset per posizione sticky
  const MOBILE_OFFSET = 25;
  const MOBILE_TOP_BASE = 100;
  const topPosition = MOBILE_TOP_BASE + index * MOBILE_OFFSET;

  return (
    <div
      ref={container}
      className="flex items-start justify-center sticky"
      style={{
        top: `${topPosition}px`,
        height: `${stickyHeight}px`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="relative flex flex-col w-[90%] max-w-[400px] h-[calc(100dvh-200px)] max-h-[600px] rounded-3xl overflow-hidden origin-top bg-black border border-light-subtle will-change-transform"
      >
        {/* Image Section - Max 350px */}
        <div className="relative flex-1 min-h-0 w-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ scale: imageScale }}
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover object-top"
              sizes="90vw"
            />
          </motion.div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        </div>

        {/* Content Section - Testo sotto */}
        <div className="flex flex-col justify-center px-6 py-6 flex-shrink-0">
          {/* Badge per il mood */}
          {subtitle && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                {subtitle}
              </span>
            </div>
          )}

          <h2 className="text-4xl font-black text-white tracking-tight leading-tight font-jost mb-4">
            {title}
          </h2>

          <p className="text-zinc-400 text-sm mb-5 leading-relaxed line-clamp-3">
            Una collezione esclusiva che unisce street culture e design
            contemporaneo. Pezzi limitati per chi vive la città con stile
            autentico.
          </p>

          {/* Animated CTA Button - Più visibile su mobile */}
          <div className="relative">
            {/* Background glow per più presenza */}
            <div className="absolute inset-0 bg-brand/20 blur-xl rounded-full" />
            <AnimatedButton
              as="button"
              size="md"
              borderColor="#f97316"
              className="relative shadow-lg shadow-brand/30"
              style={{
                background: "rgba(0, 0, 0, 0.4)", // Background più solido
              }}
            >
              Scopri Ora
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
