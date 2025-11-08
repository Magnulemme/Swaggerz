"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { blobPatterns, BlobPattern } from "@/lib/blob-patterns";

interface AnimatedBlobProps {
  pattern: BlobPattern;
  scrollYProgress: MotionValue<number>;
}

function AnimatedBlob({ pattern, scrollYProgress }: AnimatedBlobProps) {
  const top = useTransform(
    scrollYProgress,
    pattern.scrollProgress,
    pattern.topKeyframes.map((v) => `${v}%`)
  );

  const left = useTransform(
    scrollYProgress,
    pattern.scrollProgress,
    pattern.leftKeyframes.map((v) => `${v}%`)
  );

  const opacity = useTransform(
    scrollYProgress,
    pattern.opacityProgress,
    pattern.opacityKeyframes
  );

  const scale = useTransform(
    scrollYProgress,
    pattern.scaleProgress,
    pattern.scaleKeyframes
  );

  const hueRotate = useTransform(
    scrollYProgress,
    pattern.hueRotateProgress,
    pattern.hueRotateKeyframes
  );

  const isMobileHidden = pattern.size.mobile === 0;

  return (
    <motion.div
      className={`absolute ${isMobileHidden ? "hidden md:block" : ""}`}
      style={{
        top,
        left,
      }}
    >
      <motion.div
        style={{
          opacity,
          scale,
          filter: useTransform(hueRotate, (h) => `hue-rotate(${h}deg)`),
        }}
      >
        <div
          style={{
            width: pattern.size.mobile,
            height: pattern.size.mobile * 0.85,
            filter: `blur(${pattern.blur.mobile}px)`,
            borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
          }}
          className={`
            bg-gradient-to-br
            ${pattern.gradient}
            ${pattern.animationClasses}
          `}
        >
          <style jsx>{`
            @media (min-width: 768px) {
              div {
                width: ${pattern.size.desktop}px;
                height: ${pattern.size.desktop * 0.85}px;
                filter: blur(${pattern.blur.desktop}px);
              }
            }
          `}</style>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ScrollingGradientBlobs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"], // Inizia quando la sezione entra e finisce quando esce dal centro
  });

  return (
    <>
      {/* Container per tracciare lo scroll della sezione - invisibile */}
      <div ref={sectionRef} className="absolute inset-0 pointer-events-none" />

      {/* Wrapper absolute - fuori dal flow, non occupa spazio */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Sticky container - segue lo scroll con h-screen per movimento Y */}
        <div className="sticky top-0 w-full h-screen">
          {blobPatterns.map((pattern, index) => (
            <AnimatedBlob
              key={index}
              pattern={pattern}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </>
  );
}
