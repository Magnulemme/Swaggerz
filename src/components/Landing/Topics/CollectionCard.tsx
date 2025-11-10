"use client";

import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

interface CollectionCardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  index: number;
  scale: MotionValue<number>;
  layout: "desktop" | "mobile";
  imageScale?: MotionValue<number>; // Solo per mobile parallax
}

export function CollectionCard({
  title,
  subtitle,
  imageUrl,
  index,
  scale,
  layout,
  imageScale,
}: CollectionCardProps) {
  // Alterna layout: indici pari = immagine a destra (solo desktop)
  const isImageRight = index % 2 === 0;

  // Mobile layout
  if (layout === "mobile") {
    return (
      <motion.div
        style={{ scale }}
        className="relative flex flex-col w-[90%] max-w-[400px] h-[calc(100dvh-200px)] max-h-[600px] rounded-3xl overflow-hidden origin-top bg-black border border-light-subtle will-change-transform"
      >
        {/* Image Section */}
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

        {/* Content Section */}
        <div className="flex flex-col justify-center px-6 py-6 flex-shrink-0">
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

          <div className="relative">
            <div className="absolute inset-0 bg-brand/20 blur-xl rounded-full" />
            <AnimatedButton
              as="button"
              size="md"
              borderColor="#f97316"
              className="relative shadow-lg shadow-brand/30"
              style={{
                background: "rgba(0, 0, 0, 0.4)",
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
    );
  }

  // Desktop layout
  return (
    <motion.div
      style={{ scale }}
      className="relative flex h-[500px] w-full max-w-[1400px] rounded-3xl overflow-hidden origin-top bg-black border border-light-subtle will-change-transform"
      whileHover={{
        borderColor: "rgb(251 146 60 / 0.3)",
        boxShadow: "0 25px 50px -12px rgb(249 115 22 / 0.2)",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Content - 50% */}
      <div
        className={`w-1/2 flex flex-col justify-center px-12 lg:px-16 ${
          isImageRight ? "order-1" : "order-2"
        }`}
      >
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

      {/* Image - 50% */}
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
        <div
          className={`absolute inset-0 ${
            isImageRight ? "bg-gradient-to-l" : "bg-gradient-to-r"
          } from-transparent to-black/20`}
        />
      </div>
    </motion.div>
  );
}
