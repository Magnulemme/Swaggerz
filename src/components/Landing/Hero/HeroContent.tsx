"use client";

import ShaderText from "@/components/ShaderText";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useLoadingStore } from "@/store/useLoadingStore";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function HeroContent() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const isLoading = useLoadingStore((state) => state.isLoading);

  // Nascondi scroll indicator dopo il primo scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else if (window.scrollY === 0) {
        // Rimostra se torni in cima alla pagina
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <div className="h-full w-full pointer-events-auto flex flex-col items-center justify-center gap-12 md:gap-16">
        {/* Contenuto centrale - altezza automatica con animazioni entrata dopo loader */}
        <motion.div
          className="text-center flex-shrink-0 w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 40 : 0 }}
          transition={{
            duration: 0.8,
            delay: isLoading ? 0 : 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <ShaderText
            className="w-full"
            fontSize="clamp(78px, 12vw, 180px)"
            shouldRender={true}
            shouldAnimate={true}
          >
            SwaggerZ
          </ShaderText>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.6, delay: isLoading ? 0 : 0.6 }}
          >
            <p className="text-base md:text-lg text-light-secondary tracking-wide pt-xs">
              Streetwear and Digital art since 2025
            </p>
          </motion.div>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
          transition={{
            duration: 0.7,
            delay: isLoading ? 0 : 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <AnimatedButton
            href="#collection"
            buttonRef={buttonRef}
            className="transition-transform"
            size="md"
          >
            <span className="hidden md:flex">Scopri la Collezione</span>
            <span className="flex md:hidden flex-col text-center leading-tight gap-2xs">
              <span>Scopri</span>
              <span>la Collezione</span>
            </span>
            <svg
              className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
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

      {/* Scroll Indicator - Posizione assoluta in basso */}
      <motion.div
        ref={scrollIndicatorRef}
        className={`absolute bottom-sm left-1/2 -translate-x-1/2 transition-opacity duration-150 ${
          showScrollIndicator ? "opacity-100" : "opacity-0"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isLoading ? 0 : showScrollIndicator ? 1 : 0,
          y: isLoading ? -20 : 0,
        }}
        transition={{ duration: 0.2, delay: isLoading ? 0 : 0.2 }}
      >
        <div className="flex flex-col items-center gap-xs animate-bounce">
          <span className="text-white/80 text-xs uppercase tracking-wider font-normal">
            SCROLL
          </span>
          <svg
            className="w-6 h-6 text-white/70"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
