"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollingGradientBlobs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Blob 1 - Viola/Blu - Si muove da sinistra verso il centro
  const blob1X = useTransform(scrollYProgress, [0, 1], ["-30%", "20%"]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["10%", "70%"]);
  const blob1Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.25, 0.15]);

  // Blob 2 - Rosa/Arancione - Si muove da destra verso il centro
  const blob2X = useTransform(scrollYProgress, [0, 1], ["60%", "10%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["20%", "60%"]);
  const blob2Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.2, 0.1]);

  // Blob 3 - Verde/Cyan - Movimento verticale al centro
  const blob3Y = useTransform(scrollYProgress, [0, 1], ["40%", "80%"]);
  const blob3Opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.18, 0.18, 0.08]);

  // Blob 4 - Giallo/Arancione - Piccolo, movimento circolare
  const blob4X = useTransform(scrollYProgress, [0, 0.5, 1], ["70%", "30%", "80%"]);
  const blob4Y = useTransform(scrollYProgress, [0, 0.5, 1], ["60%", "30%", "50%"]);
  const blob4Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.3, 0.15]);

  return (
    <>
      {/* Container per tracciare lo scroll della sezione - invisibile */}
      <div ref={sectionRef} className="absolute inset-0 pointer-events-none" />

      {/* Sticky container - altezza zero per non creare spazio, max-width per evitare overflow */}
      <div className="sticky top-0 left-0 w-full max-w-full h-0 pointer-events-none z-0 overflow-clip">
        {/* Blob 1 - Viola/Blu */}
        <motion.div
          style={{
            x: blob1X,
            y: blob1Y,
            opacity: blob1Opacity,
          }}
          className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] blur-[60px] md:blur-[100px]"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 via-violet-600 to-blue-500 animate-blob" />
        </motion.div>

        {/* Blob 2 - Rosa/Arancione */}
        <motion.div
          style={{
            x: blob2X,
            y: blob2Y,
            opacity: blob2Opacity,
          }}
          className="absolute top-0 right-0 w-[350px] h-[350px] md:w-[700px] md:h-[700px] blur-[70px] md:blur-[120px]"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 animate-blob animation-delay-2000" />
        </motion.div>

        {/* Blob 3 - Verde/Cyan */}
        <motion.div
          style={{
            y: blob3Y,
            opacity: blob3Opacity,
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] blur-[75px] md:blur-[130px]"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 animate-blob animation-delay-4000" />
        </motion.div>

        {/* Blob 4 - Giallo/Arancione - Piccolo e veloce */}
        <motion.div
          style={{
            x: blob4X,
            y: blob4Y,
            opacity: blob4Opacity,
          }}
          className="absolute top-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] blur-[60px] md:blur-[100px]"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 animate-blob-fast" />
        </motion.div>
      </div>
    </>
  );
}
