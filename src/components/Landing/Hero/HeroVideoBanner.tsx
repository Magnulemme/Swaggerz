"use client";

import ShaderText from "@/components/ShaderText";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useLoadingStore } from "@/store/useLoadingStore";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import LiquidVideoShader from "./LiquidVideoShader";

export default function HeroVideoBanner() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldUseShader, setShouldUseShader] = useState(false);
  const [buttonOffset, setButtonOffset] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [isShaderTextVisible, setIsShaderTextVisible] = useState(false);
  const shaderTextRef = useRef<HTMLDivElement>(null);
  const setComponentReady = useLoadingStore((state) => state.setComponentReady);
  const isLoading = useLoadingStore((state) => state.isLoading);

  // Fade out progressivo quando il video esce dal viewport (50% scroll)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Opacity: 1 quando è visibile, fade out progressivo a partire dal 50%
  const videoOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  // Preload video con massima priorità
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = "/videos/hero-video.webm";
    link.type = "video/webm";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const checkShaderSupport = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      const hasMouseSupport = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;
      setShouldUseShader(isLargeScreen && hasMouseSupport);
    };

    checkShaderSupport();
    window.addEventListener("resize", checkShaderSupport);
    return () => window.removeEventListener("resize", checkShaderSupport);
  }, []);

  useEffect(() => {
    const calculateOffsets = () => {
      if (buttonRef.current && scrollIndicatorRef.current) {
        const buttonHeight = buttonRef.current.getBoundingClientRect().height;
        const scrollHeight =
          scrollIndicatorRef.current.getBoundingClientRect().height;
        setButtonOffset(buttonHeight / 2);
        setScrollOffset(scrollHeight / 2);
        setIsCalculated(true);
        // Mostra lo scroll indicator dopo che il layout è pronto
        setShowScrollIndicator(true);
      }
    };

    // Usa requestAnimationFrame per calcolare dopo il primo paint
    const rafId = requestAnimationFrame(() => {
      calculateOffsets();
    });

    window.addEventListener("resize", calculateOffsets);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", calculateOffsets);
    };
  }, []);

  // Nascondi scroll indicator dopo il primo scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else if (isCalculated && window.scrollY === 0) {
        // Rimostra se torni in cima alla pagina
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCalculated]);

  // Intersection Observer per ShaderText
  useEffect(() => {
    const shaderTextElement = shaderTextRef.current;
    if (!shaderTextElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsShaderTextVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Attiva quando almeno il 10% è visibile
        rootMargin: "50px", // Inizia a renderizzare 50px prima che entri nel viewport
      }
    );

    observer.observe(shaderTextElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Traccia quando il video è pronto
  useEffect(() => {
    const video = videoRef.current;

    const handleVideoReady = () => {
      console.log("✅ Video ready");
      setComponentReady("video");
    };

    if (video) {
      // Controlla se il video ha già dati caricati
      if (video.readyState >= 3) {
        handleVideoReady();
      } else {
        video.addEventListener("canplay", handleVideoReady);
      }

      return () => {
        video.removeEventListener("canplay", handleVideoReady);
      };
    } else if (shouldUseShader) {
      // Se usa shader invece del video normale, segna come pronto immediatamente
      console.log("✅ Shader video ready");
      setComponentReady("video");
    }
  }, [shouldUseShader, setComponentReady]);

  return (
    <div
      ref={containerRef}
      className="w-full h-dvh relative bg-black overflow-hidden"
    >
      {/* Video Background - Fade in dopo il loader + Fade out scroll-based */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ opacity: videoOpacity }}
      >
        {shouldUseShader && (
          <LiquidVideoShader videoSrc="/videos/hero-video.webm" className="" />
        )}

        {!shouldUseShader && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-video.webm" type="video/webm" />
          </video>
        )}
      </motion.div>

      {/* Content Overlay - Animazioni entrata */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          opacity: isCalculated ? 1 : 0,
        }}
      >
        <div className="h-full w-full pointer-events-auto flex flex-col">
          {/* Spacer superiore - si espande per riempire lo spazio */}
          <div className="flex-1 " />

          {/* Contenuto centrale - altezza automatica con animazioni entrata dopo loader */}
          <motion.div
            ref={shaderTextRef}
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
              shouldRender={isShaderTextVisible}
              shouldAnimate={isShaderTextVisible}
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

          {/* Spacer inferiore - si espande + padding bilanciato */}
          <div
            className="flex-1 flex flex-col justify-center items-center relative "
            style={{
              paddingTop: `${(buttonOffset + scrollOffset + 32) / 2}px`,
              paddingBottom: `${(buttonOffset + scrollOffset + 32) / 2}px`,
            }}
          >
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

            {/* Scroll Indicator - Animazione entrata dopo loader, scompare veloce */}
            <motion.div
              ref={scrollIndicatorRef}
              className={`transition-opacity duration-150 absolute bottom-sm ${
                showScrollIndicator && isCalculated
                  ? "opacity-100"
                  : "opacity-0"
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: isLoading
                  ? 0
                  : showScrollIndicator && isCalculated
                  ? 1
                  : 0,
                y: isLoading ? -20 : 0,
              }}
              transition={{ duration: 0.2, delay: isLoading ? 0 : 0.2 }}
            >
              <div className="flex flex-col items-center gap-xs animate-bounce">
                <span className="text-white/80 text-xs uppercase tracking-wider font-normal"></span>
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
        </div>
      </div>
    </div>
  );
}
