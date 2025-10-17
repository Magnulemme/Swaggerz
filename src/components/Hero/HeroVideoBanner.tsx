"use client";

import ShaderText from "@/components/ShaderText";
import { useEffect, useRef, useState } from "react";
import LiquidVideoShader from "./LiquidVideoShader";

export default function HeroVideoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [shouldUseShader, setShouldUseShader] = useState(false);
  const [buttonOffset, setButtonOffset] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

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

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[500px] md:min-h-[600px] h-full relative
      lg:border-[1px] lg:border-zinc-700/50 lg:rounded-3xl overflow-hidden"
    >
      {shouldUseShader && (
        <LiquidVideoShader
          videoSrc="/videos/hero-video-hq.mp4"
          className="lg:rounded-3xl"
          containerRef={containerRef}
        />
      )}

      {!shouldUseShader && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover lg:rounded-3xl"
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
          className="h-full w-full lg:px-6 pointer-events-auto grid"
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
            <ShaderText className="w-full" fontSize="clamp(48px, 12vw, 120px)">
              SwaggerZ
            </ShaderText>
            <div className="">
              <p className="text-base md:text-lg  text-zinc-200 tracking-wide pt-2">
                Streetwear and Digital art since 2025
              </p>
            </div>
          </div>

          <div
            className="flex items-center justify-center "
            style={{ paddingTop: `${buttonOffset}px` }}
          >
            <a
              ref={buttonRef}
              href="#collection"
              className="group inline-flex items-center gap-3
                  text-white text-sm md:text-base lg:text-lg
                  uppercase tracking-[0.3em]
                  px-10 py-5 md:px-12 md:py-6
                  rounded-full
                  border-2 border-white/50
                  hover:border-white
                  hover:bg-white/10
                  backdrop-blur-sm
                  transition-all duration-300
                  font-semibold"
              style={{
                transform: `translateY(${-buttonOffset}px)`,
              }}
            >
              <span>Scopri la Collezione</span>
              <svg
                className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1"
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
    </div>
  );
}
