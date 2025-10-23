"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Collection } from "./types";
import { Check } from "lucide-react";

interface LeftSectionProps {
  collection: Collection;
}

const colorMap = {
  emerald: {
    shadow: "rgba(16, 185, 129, 0.6)",
  },
  cyan: {
    shadow: "rgba(6, 182, 212, 0.6)",
  },
  orange: {
    shadow: "rgba(249, 115, 22, 0.6)",
  },
  purple: {
    shadow: "rgba(168, 85, 247, 0.6)",
  },
};

export default function LeftSection({ collection }: LeftSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const colors = colorMap[collection.badgeColor];

  return (
    <div className="relative w-full h-full">
      {/* Floating Badge - Top Left */}
      <div className="absolute top-0 left-0 z-[100]">
        <motion.div
          className="relative"
          initial={{ x: -50, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Background esteso per coprire bordo */}
          <div className="absolute -inset-[1px] bg-zinc-950 rounded-br-3xl"></div>
        </motion.div>
      </div>

      <div className="relative flex flex-col h-full px-6 lg:px-10 py-8 lg:py-10 gap-6 lg:gap-8 z-50">
        {/* Badge "Nuova Collezione" con bordo luminoso animato */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-50 flex-shrink-0"
        >
          <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
            {/* Animated rotating gradient border */}
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,#111111_50%,#f59e0b_100%)]" />

            {/* Badge content */}
            <span className="relative inline-flex h-full w-full items-center gap-2.5 px-5 py-2.5 bg-zinc-900/95 rounded-full backdrop-blur-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-lg shadow-amber-500/50"></span>
              <span className="text-sm lg:text-base font-black text-amber-400 uppercase tracking-widest">
                Nuova Collezione
              </span>
            </span>
          </div>
        </motion.div>

        {/* Title - More prominent */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-50 flex-shrink-0"
        >
          <h2 className="relative z-50 flex flex-wrap items-baseline gap-2.5 text-3xl lg:text-5xl xl:text-6xl font-black leading-[0.95] tracking-tighter font-jost">
            {(() => {
              const words = collection.title.split(" ");
              const lastWord = words[words.length - 1];
              const firstWords = words.slice(0, -1).join(" ");

              return (
                <>
                  {firstWords && (
                    <span className="text-white drop-shadow-2xl">
                      {firstWords}
                    </span>
                  )}
                  <span
                    className="bg-clip-text text-transparent drop-shadow-2xl"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #fbbf24, #fb923c, #f59e0b, #ea580c, #dc2626, #ea580c, #f59e0b, #fb923c, #fbbf24)",
                      backgroundSize: "200% 100%",
                      animation: "gradient 4s ease-in-out infinite",
                    }}
                  >
                    {lastWord}
                  </span>
                </>
              );
            })()}
          </h2>
        </motion.div>

        {/* Description - More readable */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-50 flex-shrink-0 text-base lg:text-lg text-zinc-200 leading-relaxed max-w-md"
        >
          {collection.description}
        </motion.p>

        {/* Featured Card - Video or Image */}
        <motion.div
          className="relative z-50 flex-shrink-0 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 rounded-xl lg:rounded-2xl overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow effect esterno */}
          <motion.div
            className="absolute -inset-1 rounded-2xl blur-xl"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${colors.shadow}, transparent 65%)`,
            }}
            animate={{
              opacity: isHovered ? 0.7 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Featured Video or Image */}
          <div className="relative w-full h-64 lg:h-72 xl:h-80 overflow-hidden group cursor-pointer">
            {collection.video ? (
              <video
                ref={videoRef}
                src={collection.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={collection.images[0]}
                alt={`${collection.title} featured`}
                fill
                className="object-cover"
              />
            )}

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Overlay scuro on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </motion.div>

        {/* Brand Info - Collab */}
        <div className="relative z-50 flex-shrink-0 bg-zinc-900/50 border border-zinc-800 rounded-lg lg:rounded-xl p-4 lg:p-5">
          <div className="relative z-50 flex items-center justify-between">
            {/* Avatars con overlap */}
            <div className="flex items-center -space-x-3">
              <div className="relative z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white border-2 border-zinc-900 flex items-center justify-center font-black text-black text-lg lg:text-xl">
                S
              </div>
              <div className="relative z-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-zinc-900 flex items-center justify-center font-black text-white text-lg lg:text-xl">
                R
              </div>
            </div>

            {/* Collab Info */}
            <div className="relative z-50 flex-1 ml-4">
              <p className="relative z-50 text-sm lg:text-base text-white font-bold flex items-center gap-2">
                Swaggerz
                <span className="text-amber-500 font-black">✕</span>
                Rebkon
                <span className="relative z-50 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" />
                </span>
              </p>
              <p className="relative z-50 text-xs text-zinc-500">
                Limited Collaboration
              </p>
            </div>
          </div>
        </div>

        {/* Button con effetto MovingBorder */}
        <div className="relative z-50 flex-shrink-0 flex justify-center w-full">
          <motion.button
            className="group relative overflow-hidden bg-transparent p-[2px] w-fit rounded-full"
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute -inset-10 rounded-full z-0">
              <MovingBorder duration={3000}>
                <div className="h-32 w-32 bg-[radial-gradient(#f97316_50%,transparent_70%)] opacity-[0.6] -z-10" />
              </MovingBorder>
            </div>

            <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full px-20 py-5 text-white text-base uppercase tracking-[0.2em] font-bold backdrop-blur-sm bg-transparent border border-orange-500/40 transition-all duration-300">
              Esplora la Collezione
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// MovingBorder component
const MovingBorder = ({
  children,
  duration = 3000,
}: {
  children: React.ReactNode;
  duration?: number;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue<number>(0);
  const [borderRadius, setBorderRadius] = React.useState({
    rx: "50%",
    ry: "50%",
  });

  React.useEffect(() => {
    const updateBorderRadius = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Per rounded-full, il border-radius CSS è min(width, height) / 2
        const radiusPx = Math.min(width, height) / 2;
        const rxPercent = (radiusPx / width) * 100;
        const ryPercent = (radiusPx / height) * 100;

        setBorderRadius({
          rx: `${rxPercent}%`,
          ry: `${ryPercent}%`,
        });
      }
    };

    updateBorderRadius();
    window.addEventListener("resize", updateBorderRadius);
    return () => window.removeEventListener("resize", updateBorderRadius);
  }, []);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <div ref={containerRef} className="absolute inset-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={borderRadius.rx}
          ry={borderRadius.ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
