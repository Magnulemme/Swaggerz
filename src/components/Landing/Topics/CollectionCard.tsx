"use client";

import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

interface CollectionCardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  index: number;
  totalCards: number;
  progress: any;
  range: [number, number];
  targetScale: number;
}

export function CollectionCard({
  title,
  subtitle,
  imageUrl,
  index,
  totalCards,
  progress,
  range,
  targetScale,
}: CollectionCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  // Alterna layout: indici pari = immagine a destra
  const isImageRight = index % 2 === 0;

  return (
    <motion.div
      style={{ scale }}
      className="relative flex h-[400px] w-full max-w-[1400px] rounded-3xl overflow-hidden origin-top bg-black border border-light-subtle will-change-transform"
      whileHover={{
        borderColor: "rgb(251 146 60 / 0.3)",
        boxShadow: "0 25px 50px -12px rgb(249 115 22 / 0.2)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Content - 50% - Ordine dinamico */}
      <div
        className={`w-1/2 flex flex-col justify-center px-12 lg:px-16 bg-black ${
          isImageRight ? "order-1" : "order-2"
        }`}
      >
        {/* Badge per il mood */}
        {subtitle && (
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              {subtitle}
            </span>
          </div>
        )}

        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-none font-jost mb-6">
          {title}
        </h2>

        <p className="text-zinc-400 text-sm lg:text-base mb-8 leading-relaxed">
          Una collezione esclusiva che unisce street culture e design
          contemporaneo. Pezzi limitati per chi vive la città con stile
          autentico.
        </p>

        {/* Animated CTA Button */}
        <AnimatedButton as="button" size="sm" borderColor="#f97316">
          Scopri Ora
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </AnimatedButton>
      </div>

      {/* Image - 50% - Ordine dinamico */}
      <div
        className={`w-1/2 relative overflow-hidden ${
          isImageRight ? "order-2" : "order-1"
        }`}
      >
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
        {/* Overlay Gradient - Direzione adattiva */}
        <div
          className={`absolute inset-0 ${
            isImageRight ? "bg-gradient-to-l" : "bg-gradient-to-r"
          } from-transparent to-black/20`}
        />
      </div>
    </motion.div>
  );
}
