"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ShaderText from "@/components/ShaderText";

/**
 * Brand Identity Window - A modern blog-style window into the brand's soul
 * Features organic blob gradients and editorial typography
 */
export default function BrandIdentityWindow() {
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const [titleFontSize, setTitleFontSize] = useState("32px");
  const [shaderFontSize, setShaderFontSize] = useState("35px");

  // Calcola dinamicamente la dimensione del titolo (h3)
  useEffect(() => {
    console.log("BrandIdentityWindow useEffect triggered");

    const calculateFontSize = () => {
      console.log("calculateFontSize called");

      if (!titleContainerRef.current) {
        console.log("❌ titleContainerRef.current is null");
        return;
      }

      const container = titleContainerRef.current;
      const availableWidth = container.clientWidth;

      console.log("📏 Container measurements:", {
        clientWidth: availableWidth,
        offsetWidth: container.offsetWidth,
        scrollWidth: container.scrollWidth,
        boundingRect: container.getBoundingClientRect(),
      });

      if (availableWidth === 0) {
        console.log("⚠️ availableWidth is 0, skipping calculation");
        return;
      }

      // "Community" è la parola più lunga (9 caratteri)
      // Stima: larghezza carattere ≈ 0.6 × fontSize per font bold
      const charCount = 9;
      const charWidthRatio = 0.6;

      // Calcola fontSize ideale con margine del 10%
      const idealFontSize =
        (availableWidth * 0.9) / (charCount * charWidthRatio);

      // Limiti min/max in px per h3 (più piccolo di h1)
      const minSize = 30;
      const maxSize = 48;
      const fontSize = Math.max(minSize, Math.min(maxSize, idealFontSize));
      const shaderFontSize = fontSize * 1.1;

      console.log("✅ BrandIdentityWindow font calc:", {
        availableWidth,
        charCount,
        charWidthRatio,
        idealFontSize,
        fontSize,
        shaderFontSize,
        willSetTo: `${fontSize}px / ${shaderFontSize}px`,
      });

      setTitleFontSize(`${fontSize}px`);
      setShaderFontSize(`${shaderFontSize}px`);

      console.log("✅ Font sizes updated");
    };

    // Delay initial calculation to ensure DOM is ready
    console.log("⏱️ Setting timeout for initial calculation");
    const timer = setTimeout(() => {
      console.log("⏱️ Timeout fired, calling calculateFontSize");
      calculateFontSize();
    }, 100);

    const resizeObserver = new ResizeObserver(() => {
      console.log("👁️ ResizeObserver triggered");
      calculateFontSize();
    });

    if (titleContainerRef.current) {
      console.log("✅ Observing titleContainerRef");
      resizeObserver.observe(titleContainerRef.current);
    } else {
      console.log("❌ Cannot observe - titleContainerRef.current is null");
    }

    return () => {
      console.log("🧹 Cleanup - clearing timeout and disconnecting observer");
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, []);

  console.log("🎨 BrandIdentityWindow render:", {
    titleFontSize,
    shaderFontSize,
  });

  return (
    <div className="relative w-full h-full rounded-3xl border border-zinc-700/50 bg-black overflow-hidden group">
      {/* Animated gradient blob - single color like hero */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-transparent to-black/40" />

      {/* Content - Editorial style */}
      <div className="relative h-full flex flex-col justify-between px-8 lg:px-12 pt-12">
        {/* Main content - Blog post style */}
        <div className="">
          {/* Headline with editorial typography */}
          <motion.div
            ref={titleContainerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-full flex flex-col items-start space-y-3">
              <h3
                className="text-white leading-[1.1] tracking-tight"
                style={{ fontSize: titleFontSize, fontWeight: 900 }}
              >
                Non un brand, una
              </h3>
              <div className="w-fit">
                <ShaderText
                  className="block leading-none"
                  fontSize={shaderFontSize}
                  fontWeight="900"
                >
                  Community
                </ShaderText>
              </div>
            </div>
          </motion.div>

          {/* Body copy - Magazine style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-zinc-200 text-sm lg:text-base leading-relaxed max-w-lg">
              Swaggerz nasce per chi vive la strada come una tela da
              reinventare. Non seguiamo le tendenze:{" "}
              <span className="text-white font-medium italic">le creiamo</span>.
              <br />
              Con ogni drop, celebriamo l&apos;arte, la libertà e la voglia di
              cambiare le regole — insieme.
            </p>
          </motion.div>

          {/* Quote/Callout */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className=""
          >
            <p className="text-white text-lg lg:text-xl font-semibold italic leading-snug pt-6">
              Non avere paura, entra nel movimento.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className="group/btn inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors mt-6"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span>Scopri la nostra storia</span>
              <svg
                className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
