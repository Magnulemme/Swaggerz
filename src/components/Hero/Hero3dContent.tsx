"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import RectangularButton from "./RectangularButton";
import ShaderText from "@/components/ShaderText";
import AvatarCanvas from "@/components/Avatar/AvatarCanvas";

const Hero3dContent: React.FC = () => {
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleFontSize, setTitleFontSize] = useState("2rem");
  const [shaderFontSize, setShaderFontSize] = useState("2.5rem");

  // Detect when the section enters the viewport - trigger più veloce
  const isInView = useInView(containerRef, {
    once: true, // Animate only once
    amount: 0.05, // Trigger quando solo 5% è visibile (più veloce!)
    margin: "0px 0px -100px 0px" // Inizia animazione 100px prima che entri nel viewport
  });

  // Calcola dinamicamente la dimensione del titolo
  useEffect(() => {
    const calculateFontSize = () => {
      if (!titleContainerRef.current) return;

      const container = titleContainerRef.current;
      const availableWidth = container.clientWidth;

      // "Colleziona." è la parola più lunga (11 caratteri + punto)
      // Stima: larghezza carattere ≈ 0.6 × fontSize per font bold
      const charCount = 12;
      const charWidthRatio = 0.6;

      // Calcola fontSize ideale con margine del 10%
      const idealFontSize =
        (availableWidth * 0.9) / (charCount * charWidthRatio);

      // Limiti min/max in px
      const minSize = 40;
      const maxSize = 50;
      const fontSize = Math.max(minSize, Math.min(maxSize, idealFontSize));
      const shaderFontSize = fontSize * 1.25;

      setTitleFontSize(`${fontSize}px`);
      setShaderFontSize(`${shaderFontSize}px`);
    };

    calculateFontSize();

    const resizeObserver = new ResizeObserver(calculateFontSize);
    if (titleContainerRef.current) {
      resizeObserver.observe(titleContainerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="group relative h-full bg-zinc-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Layout responsive: colonna singola su mobile, due colonne su desktop */}
      <div className="relative h-full flex flex-col lg:flex-row container mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        {/* Left Column - Text Content */}
        <div className="flex-1 flex flex-col justify-center z-10">
          {/* Title with ShaderText preserved */}
          <div
            ref={titleContainerRef}
            className="flex flex-col justify-center items-center lg:items-start"
          >
            {/* Main Title - "Colleziona. Stampa." normale, "Indossa." con ShaderText */}
            <div className="w-full flex flex-col items-center lg:items-start lg:text-left font-jost ">
              <motion.div
                className="text-zinc-100 leading-none"
                style={{ fontSize: titleFontSize, fontWeight: 900 }}
                initial={{ opacity: 0, x: -30, rotateX: -10 }}
                animate={isInView ? { opacity: 1, x: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                Colleziona.
              </motion.div>
              <motion.div
                className="text-zinc-100 leading-none"
                style={{ fontSize: titleFontSize, fontWeight: 900 }}
                initial={{ opacity: 0, x: -30, rotateX: -10 }}
                animate={isInView ? { opacity: 1, x: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {" "}
                Stampa.
              </motion.div>
              <motion.div
                style={{ fontSize: titleFontSize, lineHeight: 1 }}
                className="w-fit mt-2"
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <ShaderText
                  className="block leading-none"
                  fontSize={shaderFontSize}
                  fontWeight="900"
                  shouldRender={isInView}
                  shouldAnimate={isInView}
                >
                  IndossA.
                </ShaderText>
              </motion.div>
            </div>

            {/* Brand Description */}
            <motion.p
              className="text-zinc-300 text-base md:text-lg text-center lg:text-left max-w-md px-4 lg:px-0 leading-relaxed mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              Personalizza i tuoi capi NFT certificati dei migliori artisti
              digitali, o acquista i capi esclusivi delle nostre collezioni.
            </motion.p>
          </div>

          {/* Rectangular Button */}
          <motion.div
            className="flex justify-center lg:justify-start mt-6 lg:mt-8"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <RectangularButton />
          </motion.div>
        </div>

        {/* Right Column - Avatars */}
        <div className="relative h-full lg:w-[600px] lg:flex-shrink-0">
          {/* Background gradient - posizionato relativamente al container degli avatar */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[400px] bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-full blur-3xl animate-pulse" />
          </div>
          {/* Avatar Preview - mobile (solo uno per spazio limitato) */}
          <motion.div
            className="w-full h-full flex justify-center lg:hidden"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <div className="h-full max-w-[600px] w-full">
              <AvatarCanvas
                avatarType="man"
                animation="idle"
                enableZoom={false}
                minAzimuthAngle={-Math.PI / 2}
                maxAzimuthAngle={Math.PI / 2}
              />
            </div>
          </motion.div>

          {/* Due avatar - desktop (lg+) */}
          <div className="h-full w-full hidden lg:flex justify-center gap-4 max-h-[450px]">
            {/* Avatar Man */}
            <motion.div
              className="aspect-[9/16] h-full flex-shrink-0"
              initial={{ opacity: 0, x: 50, rotateY: -15, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0, scale: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <AvatarCanvas
                avatarType="man"
                animation="idle"
                enableZoom={false}
                minAzimuthAngle={-Math.PI / 2}
                maxAzimuthAngle={Math.PI / 2}
              />
            </motion.div>

            {/* Avatar Girl */}
            <motion.div
              className="aspect-[9/16] h-full flex-shrink-0"
              initial={{ opacity: 0, x: 50, rotateY: -15, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0, scale: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <AvatarCanvas
                avatarType="girl"
                animation="idle"
                enableZoom={false}
                minAzimuthAngle={-Math.PI / 2}
                maxAzimuthAngle={Math.PI / 2}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero3dContent;
