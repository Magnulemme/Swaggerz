"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollingGradientBlobs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ============================================
  // BLOB SINISTRO 1 - Attraversa da SX a DX (ARANCIONE brillante)
  // ============================================
  const leftBlob1Top = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.85, 1], ["15%", "35%", "65%", "50%", "85%"]);
  const leftBlob1Left = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["-10%", "20%", "55%", "80%", "105%"]);
  const leftBlob1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.7, 1], [0.13, 0.20, 0.18, 0.15, 0.08]);
  const leftBlob1Scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [1.0, 1.4, 1.2, 1.0]);
  const leftBlob1Filter = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["hue-rotate(0deg)", "hue-rotate(20deg)", "hue-rotate(-5deg)", "hue-rotate(15deg)"]
  );

  // ============================================
  // BLOB SINISTRO 2 - Movimento ondulatorio centrale (GIALLO brillante)
  // ============================================
  const leftBlob2Top = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8, 1], ["45%", "25%", "60%", "40%", "80%"]);
  const leftBlob2Left = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.85, 1], ["-8%", "30%", "48%", "25%", "-5%"]);
  const leftBlob2Opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.75, 1], [0.12, 0.19, 0.21, 0.17, 0.09]);
  const leftBlob2Scale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [1.1, 1.35, 1.25, 1.15]);
  const leftBlob2Filter = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    ["hue-rotate(0deg)", "hue-rotate(-20deg)", "hue-rotate(10deg)", "hue-rotate(-12deg)"]
  );

  // ============================================
  // BLOB DESTRO 1 - Attraversa da DX a SX (ROSSO intenso)
  // ============================================
  const rightBlob1Top = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.85, 1], ["20%", "50%", "30%", "70%", "92%"]);
  const rightBlob1Left = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.85, 1], ["85%", "65%", "30%", "5%", "-15%"]);
  const rightBlob1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.75, 1], [0.14, 0.20, 0.21, 0.16, 0.08]);
  const rightBlob1Scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [1.0, 1.45, 1.15, 1.05]);
  const rightBlob1Filter = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    ["hue-rotate(0deg)", "hue-rotate(-22deg)", "hue-rotate(12deg)", "hue-rotate(-15deg)"]
  );

  // ============================================
  // BLOB DESTRO 2 - Spirale attraverso il centro (ARANCIONE/ROSSO)
  // ============================================
  const rightBlob2Top = useTransform(scrollYProgress, [0, 0.35, 0.65, 0.9, 1], ["32%", "18%", "65%", "48%", "85%"]);
  const rightBlob2Left = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8, 1], ["90%", "60%", "20%", "50%", "88%"]);
  const rightBlob2Opacity = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8, 1], [0.15, 0.21, 0.19, 0.20, 0.11]);
  const rightBlob2Scale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [1.05, 1.35, 1.4, 1.15]);
  const rightBlob2Filter = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    ["hue-rotate(0deg)", "hue-rotate(18deg)", "hue-rotate(-10deg)", "hue-rotate(15deg)"]
  );

  return (
    <>
      {/* Container per tracciare lo scroll della sezione - invisibile */}
      <div ref={sectionRef} className="absolute inset-0 pointer-events-none" />

      {/* Sticky container - altezza zero per non creare spazio, max-width per evitare overflow */}
      <div className="sticky top-0 left-0 w-full max-w-full h-0 pointer-events-none overflow-x-clip z-0">

        {/* ============================================
            LATO SINISTRO - Arancione e Giallo
            ============================================ */}

        {/* BLOB SINISTRO 1 - Arancione/Giallo (VELOCE - inizia alto) */}
        <motion.div
          className="absolute"
          style={{
            top: leftBlob1Top,
            left: leftBlob1Left,
          }}
        >
          <motion.div
            style={{
              opacity: leftBlob1Opacity,
              scale: leftBlob1Scale,
            }}
            className="w-[200px] h-[200px] md:w-[380px] md:h-[380px] blur-[80px] md:blur-[120px]"
          >
            <motion.div
              style={{ filter: leftBlob1Filter }}
              className="w-full h-full rounded-full bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 animate-blob animation-delay-1000"
            />
          </motion.div>
        </motion.div>

        {/* BLOB SINISTRO 2 - Giallo/Arancione (LENTO - inizia più basso) */}
        <motion.div
          className="absolute"
          style={{
            top: leftBlob2Top,
            left: leftBlob2Left,
          }}
        >
          <motion.div
            style={{
              opacity: leftBlob2Opacity,
              scale: leftBlob2Scale,
            }}
            className="w-[180px] h-[180px] md:w-[350px] md:h-[350px] blur-[75px] md:blur-[110px]"
          >
            <motion.div
              style={{ filter: leftBlob2Filter }}
              className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 animate-blob-fast animation-delay-3000 animate-spin-slow"
            />
          </motion.div>
        </motion.div>

        {/* ============================================
            LATO DESTRO - Arancione e Rosso
            ============================================ */}

        {/* BLOB DESTRO 1 - Arancione/Rosso (VELOCE - inizia molto alto) */}
        <motion.div
          className="absolute"
          style={{
            top: rightBlob1Top,
            left: rightBlob1Left,
          }}
        >
          <motion.div
            style={{
              opacity: rightBlob1Opacity,
              scale: rightBlob1Scale,
            }}
            className="w-[220px] h-[220px] md:w-[400px] md:h-[400px] blur-[85px] md:blur-[125px]"
          >
            <motion.div
              style={{ filter: rightBlob1Filter }}
              className="w-full h-full rounded-full bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 animate-blob animation-delay-2000 animate-pulse-slow"
            />
          </motion.div>
        </motion.div>

        {/* BLOB DESTRO 2 - Rosso/Arancione (MEDIO - inizia medio-alto) */}
        <motion.div
          className="absolute"
          style={{
            top: rightBlob2Top,
            left: rightBlob2Left,
          }}
        >
          <motion.div
            style={{
              opacity: rightBlob2Opacity,
              scale: rightBlob2Scale,
            }}
            className="w-[190px] h-[190px] md:w-[360px] md:h-[360px] blur-[80px] md:blur-[115px]"
          >
            <motion.div
              style={{ filter: rightBlob2Filter }}
              className="w-full h-full rounded-full bg-gradient-to-br from-red-500 via-red-600 to-orange-600 animate-blob-fast animation-delay-4000 animate-spin-reverse-slow"
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
