"use client";

import ShaderText from "@/components/ShaderText";
import { useEffect, useRef, useState } from "react";
import LiquidVideoShader from "./LiquidVideoShader";
import { useLoadingStore } from "@/store/useLoadingStore";

export default function HeroVideoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldUseShader, setShouldUseShader] = useState(false);
  const [buttonOffset, setButtonOffset] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const setComponentReady = useLoadingStore((state) => state.setComponentReady);

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
    const calculateButtonOffset = () => {
      if (buttonRef.current) {
        const height = buttonRef.current.getBoundingClientRect().height;
        setButtonOffset(height / 2);
        setIsCalculated(true);
        // Mostra lo scroll indicator dopo che il layout è pronto
        setShowScrollIndicator(true);
      }
    };

    // Usa requestAnimationFrame per calcolare dopo il primo paint
    const rafId = requestAnimationFrame(() => {
      calculateButtonOffset();
    });

    window.addEventListener("resize", calculateButtonOffset);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", calculateButtonOffset);
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
      className="w-full min-h-screen h-full relative overflow-hidden"
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

      {/* Content Overlay - Nascondi fino al calcolo completato */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-200"
        style={{ opacity: isCalculated ? 1 : 0 }}
      >
        <div
          className="h-full w-full pointer-events-auto grid"
          style={{
            gridTemplateRows: `1fr auto 1fr`,
            rowGap: 0,
          }}
        >
          <div style={{ paddingBottom: `${buttonOffset}px` }}></div>

          <div
            className="text-center self-center w-full"
            style={{ marginTop: `-${buttonOffset}px` }}
          >
            <ShaderText className="w-full" fontSize="clamp(78px, 12vw, 180px)">
              SwaggerZ
            </ShaderText>
            <div className="">
              <p className="text-base md:text-lg  text-zinc-200 tracking-wide pt-2">
                Streetwear and Digital art since 2025
              </p>
            </div>
          </div>

          <div
            className="flex items-center justify-center max-lg:items-start max-lg:mt-16"
            style={{ paddingTop: `${buttonOffset}px` }}
          >
            <a
              ref={buttonRef}
              href="#collection"
              className="group inline-flex items-center gap-2 md:gap-3
                  text-white text-sm md:text-base lg:text-lg
                  uppercase tracking-[0.3em]
                  px-10 py-5 md:px-12 md:py-6
                  rounded-full
                  border-2 border-white/50
                  hover:border-white
                  hover:bg-white/10
                  hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]
                  hover:scale-105
                  backdrop-blur-sm
                  transition-all duration-300
                  font-semibold"
              style={{
                transform: `translateY(${-buttonOffset}px)`,
              }}
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
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Tutte le dimensioni */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-50
          transition-opacity duration-500 pointer-events-none ${
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
  );
}
