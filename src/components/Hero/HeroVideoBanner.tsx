"use client";

import ShaderText from "@/components/ShaderText";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiquidVideoShader from "./LiquidVideoShader";
import { useLoadingStore } from "@/store/useLoadingStore";
import { HeroVideoButton } from "./HeroVideoButton";

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
  // - scale: rimpicciolisce da 1 a 0.85 (effetto zoom out)
  // - rotateX: rotazione 3D lungo l'asse X da 0 a 15deg (testa indietro, piedi avanti)
  // - opacity: fade out progressivo per transizione fluida verso la sezione successiva
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.6, 0.85], [1, 0.5, 0]);

  // Fade out separato per il contenuto (testo e button) - inizia prima per effetto elegante
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.7], [1, 0.5, 0]);

  // Transform CSS completa con perspective per evitare stacking context issues
  const transform = useTransform(
    [scale, rotateX],
    ([scaleVal, rotateXVal]) =>
      `perspective(1000px) scale(${scaleVal}) rotateX(${rotateXVal}deg)`
  );

  // Preload video con massima priorità
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = '/videos/hero-video-hq.mp4';
    link.type = 'video/mp4';
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
        const scrollHeight = scrollIndicatorRef.current.getBoundingClientRect().height;
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
        rootMargin: "50px" // Inizia a renderizzare 50px prima che entri nel viewport
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
      className="w-full h-screen relative overflow-hidden"
    >
      {/* Video container con effetto parallax 2.5D - solo desktop */}
      <motion.div
        className="absolute inset-0 w-full h-full origin-center"
        style={{
          transform: shouldUseShader ? transform : undefined,
          opacity: shouldUseShader ? opacity : 1,
        }}
      >
        {shouldUseShader && (
          <LiquidVideoShader
            videoSrc="/videos/hero-video-hq.mp4"
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
            <source src="/videos/hero-video-hq.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Content Overlay - Nascondi fino al calcolo completato + Parallax + Fade out */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-200 origin-center"
        style={{
          opacity: isCalculated ? contentOpacity : 0,
          transform: shouldUseShader ? transform : undefined,
        }}
      >
        <div
          className="h-full w-full pointer-events-auto grid"
          style={{
            gridTemplateRows: `1fr auto 1fr`,
            rowGap: 0,
          }}
        >
          <div style={{ paddingBottom: `${buttonOffset + scrollOffset}px` }}></div>

          <div
            ref={shaderTextRef}
            className="text-center self-center w-full"
            style={{ marginTop: `-${buttonOffset + scrollOffset}px` }}
          >
            <ShaderText
              className="w-full"
              fontSize="clamp(78px, 12vw, 180px)"
              shouldRender={isShaderTextVisible}
              shouldAnimate={isShaderTextVisible}
            >
              SwaggerZ
            </ShaderText>
            <div className="">
              <p className="text-base md:text-lg  text-zinc-200 tracking-wide pt-2">
                Streetwear and Digital art since 2025
              </p>
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-8 max-lg:items-center max-lg:mt-16"
            style={{ paddingTop: `${buttonOffset + scrollOffset}px` }}
          >
            <HeroVideoButton
              href="#collection"
              buttonRef={buttonRef}
              className="transition-transform"
            >
              <span className="hidden md:flex">Scopri la Collezione</span>
              <span className="flex md:hidden flex-col text-center leading-tight gap-1">
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
            </HeroVideoButton>

            {/* Scroll Indicator - Integrato nel layout */}
            <div
              ref={scrollIndicatorRef}
              className={`transition-opacity duration-500 ${
                showScrollIndicator && isCalculated ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex flex-col items-center gap-2 animate-bounce">
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
