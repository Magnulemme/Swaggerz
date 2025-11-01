"use client";

import ShaderText from "@/components/ShaderText";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiquidVideoShader from "./LiquidVideoShader";
import { useLoadingStore } from "@/store/useLoadingStore";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export default function HeroVideoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldUseShader, setShouldUseShader] = useState(false);
  const [buttonOffset, setButtonOffset] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [isShaderTextVisible, setIsShaderTextVisible] = useState(false);
  const shaderTextRef = useRef<HTMLDivElement>(null);
  const setComponentReady = useLoadingStore((state) => state.setComponentReady);

  // Parallax scroll tracking - solo su desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Trasformazioni 2.5D per vero effetto parallax:
  // Desktop: effetto pieno per esperienza immersiva
  // - scale: rimpicciolisce da 1 a 0.85 (effetto zoom out)
  // - rotateX: rotazione 3D lungo l'asse X da 0 a 15deg (testa indietro, piedi avanti)
  const scaleDesktop = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const rotateXDesktop = useTransform(scrollYProgress, [0, 1], [0, 15]);

  // Mobile: effetto ridotto per performance e UX
  // - scale: rimpicciolisce da 1 a 0.92 (più conservativo)
  // - rotateX: rotazione 3D da 0 a 8deg (più delicato)
  const scaleMobile = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const rotateXMobile = useTransform(scrollYProgress, [0, 1], [0, 8]);

  // Opacity: fade out progressivo uguale per tutti i dispositivi
  const opacity = useTransform(scrollYProgress, [0.2, 0.6, 0.85], [1, 0.5, 0]);

  // Fade out separato per il contenuto (testo e button) - inizia prima per effetto elegante
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.4, 0.7],
    [1, 0.5, 0]
  );

  // Transform CSS completa con perspective per evitare stacking context issues
  const transformDesktop = useTransform(
    [scaleDesktop, rotateXDesktop],
    ([scaleVal, rotateXVal]) =>
      `perspective(1000px) scale(${scaleVal}) rotateX(${rotateXVal}deg)`
  );

  const transformMobile = useTransform(
    [scaleMobile, rotateXMobile],
    ([scaleVal, rotateXVal]) =>
      `perspective(1000px) scale(${scaleVal}) rotateX(${rotateXVal}deg)`
  );

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
    <div ref={containerRef} className="w-full h-screen relative">
      {/* Video container con effetto parallax 2.5D - Desktop: pieno, Mobile: ridotto */}
      <motion.div
        className="absolute inset-0 w-full h-full origin-center"
        style={{
          transform: shouldUseShader ? transformDesktop : transformMobile,
          opacity: opacity,
        }}
      >
        {shouldUseShader && (
          <LiquidVideoShader
            videoSrc="/videos/hero-video.webm"
            className=""
            containerRef={containerRef}
          />
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

      {/* Content Overlay - Nascondi fino al calcolo completato + Parallax + Fade out */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-200 origin-center"
        style={{
          opacity: isCalculated ? contentOpacity : 0,
          transform: shouldUseShader ? transformDesktop : transformMobile,
        }}
      >
        <div className="h-full w-full pointer-events-auto flex flex-col">
          {/* Spacer superiore - si espande per riempire lo spazio */}
          <div className="flex-1 " />

          {/* Contenuto centrale - altezza automatica */}
          <div
            ref={shaderTextRef}
            className="text-center flex-shrink-0 w-full "
          >
            <ShaderText
              className="w-full"
              fontSize="clamp(78px, 12vw, 180px)"
              shouldRender={isShaderTextVisible}
              shouldAnimate={isShaderTextVisible}
            >
              SwaggerZ
            </ShaderText>
            <div>
              <p className="text-base md:text-lg text-light-secondary tracking-wide pt-xs">
                Streetwear and Digital art since 2025
              </p>
            </div>
          </div>

          {/* Spacer inferiore - si espande + padding bilanciato */}
          <div
            className="flex-1 flex flex-col justify-center items-center relative "
            style={{
              paddingTop: `${(buttonOffset + scrollOffset + 32) / 2}px`,
              paddingBottom: `${(buttonOffset + scrollOffset + 32) / 2}px`,
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

            {/* Scroll Indicator */}
            <div
              ref={scrollIndicatorRef}
              className={`transition-opacity duration-500 absolute bottom-sm ${
                showScrollIndicator && isCalculated
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              <div className="flex flex-col items-center gap-xs animate-bounce">
                <span className="text-white/80 text-xs uppercase tracking-wider font-normal">
                  Scroll
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
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
