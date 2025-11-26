"use client";

import { motion, MotionValue, useTransform, useInView, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface CollectionCardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  stats: {
    pieces: number;
    swagLevel: number;
  };
  index: number;
  scale: MotionValue<number>;
  layout: "desktop" | "mobile";
  imageScale?: MotionValue<number>; // Solo per mobile parallax
  cardWidth?: MotionValue<string>; // Solo per mobile width expansion
  cardBorderRadius?: MotionValue<number>; // Solo per mobile border-radius animation
  cardBorderOpacity?: MotionValue<number>; // Solo per mobile border opacity (via box-shadow)
}

export function CollectionCard({
  title,
  subtitle,
  imageUrl,
  stats,
  index,
  scale,
  layout,
  imageScale,
  cardWidth,
  cardBorderRadius,
  cardBorderOpacity,
}: CollectionCardProps) {
  // Alterna layout: indici pari = immagine a destra (solo desktop)
  const isImageRight = index % 2 === 0;

  // Ref per trigger animazione counter
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.3 });

  // Crea un box-shadow dinamico che simula il bordo con opacity controllabile (solo mobile)
  // Hook deve essere chiamato sempre, non condizionalmente - usa un fallback se undefined
  const dummyOpacity = useMotionValue(0);
  const boxShadow = useTransform(
    cardBorderOpacity || dummyOpacity,
    (opacity) => `inset 0 0 0 1px rgba(255, 255, 255, ${opacity})`
  );

  // Mobile layout - Hero Card
  if (layout === "mobile") {

    return (
      <motion.div
        style={{
          scale,
          width: cardWidth,
          borderRadius: cardBorderRadius,
          boxShadow: boxShadow,
        }}
        className="relative h-[calc(100dvh-200px)] max-h-[600px] overflow-hidden origin-top bg-black will-change-transform"
      >
          {/* Image Section - Full background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ scale: imageScale }}
            >
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover object-center"
                sizes="90vw"
              />
            </motion.div>
            {/* Overlay gradient più deciso per contrasto */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
          </div>

          {/* Content Section - Centrato */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8 text-center">
            {/* Title - Hero size with character wave effect */}
            <h2 className="text-6xl md:text-7xl font-black text-white tracking-tight leading-none font-jost">
              <AnimatedText
                text={title}
                variant="normal"
                delay={0.1}
                charDelay={0.03}
              />
            </h2>

            {/* Stats - Animated counters */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-8"
            >
              {/* Numero di pezzi */}
              <div className="flex flex-col items-center gap-1">
                <div className="text-3xl font-black text-brand">
                  {isInView && <AnimatedCounter value={stats.pieces} duration={1.5} />}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Pezzi
                </span>
              </div>

              {/* Divider */}
              <div className="h-12 w-px bg-white/20" />

              {/* Livello Swag */}
              <div className="flex flex-col items-center gap-1">
                <div className="text-3xl font-black text-brand">
                  {isInView && <AnimatedCounter value={stats.swagLevel} suffix="%" duration={1.5} />}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Swag Level
                </span>
              </div>
            </motion.div>

            {/* CTA Button con brand color */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AnimatedButton
                as="button"
                size="lg"
                borderColor="#f97316"
              >
                Esplora
                <svg
                  className="w-5 h-5"
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
            </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              {subtitle}
            </span>
          </motion.div>
        )}

        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-none font-jost mb-6">
          <AnimatedText
            text={title}
            variant="normal"
            delay={0.2}
            charDelay={0.03}
          />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-zinc-400 text-sm lg:text-base mb-6 leading-relaxed"
        >
          Una collezione esclusiva che unisce street culture e design
          contemporaneo. Pezzi limitati per chi vive la città con stile
          autentico.
        </motion.p>

        {/* Stats - Desktop */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-6 mb-8"
        >
          {/* Numero di pezzi */}
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black text-brand">
              {isInView && <AnimatedCounter value={stats.pieces} duration={1.5} />}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Pezzi
            </span>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-white/20" />

          {/* Livello Swag */}
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black text-brand">
              {isInView && <AnimatedCounter value={stats.swagLevel} suffix="%" duration={1.5} />}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Swag Level
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
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
        </motion.div>
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
